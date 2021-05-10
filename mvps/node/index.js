const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');


//cors policy solution
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

//routes
let artjsonFile = require(path.join(__dirname + '/json/stromingen.json'));
let generatedjsonFile = require(path.join(__dirname + '/json/output.json'));
let choicesjsonFile = require(path.join(__dirname + '/json/choices.json'));

app.get('/', (req, res) => {
  res.send('test');
})

app.get('/getStromingen', (req, res) => {
  res.json(artjsonFile);
});

app.get('/getChoices', (req, res) => {
  delete require.cache[require.resolve(path.join(__dirname + '/json/choices.json'))] // Deleting loaded module
  choicesjsonFile = require(path.join(__dirname + '/json/choices.json'));
  res.json(choicesjsonFile);
});

app.post('/sendStromingen', (req, res) => {
  console.log('stromingen senden');
  let data = req.body.art

  let generatedarray = []

  if (Array.isArray(data)) {
    for (let i of data) {
      let generateddata = {
        name: "artname",
        example: "path/to/example"
      }
      generateddata.name = i;
      generateddata.example = generatedjsonFile[i];
      generatedarray.push(generateddata)
    }
    console.log(generatedarray)
    res.json(generatedarray);

    // writing to json file
    let savedata = JSON.stringify(generatedarray, null, 2);
    fs.writeFile(__dirname + '/json/choices.json', savedata, (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
    console.log('This is after the write call');
  } else {
    let generateddata = {
      name: "artname",
      example: "pat/to/example"
    }
    generateddata.name = data;
    generateddata.example = generatedjsonFile[data];
    console.log(generateddata);

    res.json(generateddata);

    // writing to json file
    let savedata = JSON.stringify(generateddata, null, 2);
    fs.writeFile(__dirname + '/json/choices.json', savedata, (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
    console.log('This is after the write call');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})