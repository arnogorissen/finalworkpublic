'use strict'

let imgs = [];
let imgNames = [];
let imgIndex = -1;

let loadPercentage = 0.045; // 0 to 1.0
let closeEnoughTarget = 50;

let allParticles = [];

let mouseSizeSlider;
let particleSizeSlider;
let speedSlider;
let resSlider;
let nextImageButton;
let homePageButton;



function preload() {
  //json file inladen met de gegenereerde afbeeldingen
  $.ajax({
    url: 'http://127.0.0.1:3000/getChoices',
    method: 'GET',
    dataType: 'json',
    data: "data",
  }).done(function (data) {
    console.log(data);
    imgNames.splice(0, imgNames.length)
    if (Array.isArray(data)) {
      for (let art of data) {
        imgNames.push(art.example);
        //console.log(art.example)         
      }
    } else {
      imgNames.push(data.example);    
      console.log(imgNames)
    }

    // alle images inladen met de linken uit de choices json file en in een array steken
    for (let i = 0; i < imgNames.length; i++) {
      let newImg = loadImage(imgNames[i]);
      imgs.push(newImg);
      console.log(newImg)
    }
    console.log(imgs)
  }).fail(function (er1, er2) {
    console.log(er1);
    console.log(er2);
  });

}

function setup() {

  createCanvas(windowWidth, windowHeight);

  // De sliders(vanuit de sliders.js) en knoppen maken 

  particleSizeSlider = new SliderLayout("Particle grootte", 1, 20, 10, 1, 100, 100);
  speedSlider = new SliderLayout("Snelheid", 0, 5, 1, 0.5, 100, particleSizeSlider.slider.position().y + 70);
  resSlider = new SliderLayout("Aantal Particles", 0.1, 2, 0.5, 0.1, 100, speedSlider.slider.position().y + 70);

  nextImageButton = createButton("Volgende");
  nextImageButton.position(100, resSlider.slider.position().y + 40);
  nextImageButton.mousePressed(nextImage);

  homePageButton = createButton("Go to homepage");
  homePageButton.position(100, resSlider.slider.position().y + 80);
  homePageButton.mousePressed(goHome);


}


function draw() {
  background(0);
  // De fps counter maken
  let fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);


//de particles tekenen
  for (let i = allParticles.length - 1; i > -1; i--) {
    allParticles[i].move();
    allParticles[i].draw();

    if (allParticles[i].isKilled) {
      if (allParticles[i].isOutOfBounds()) {
        allParticles.splice(i, 1);
      }
    }
  }

  // De slider labels zichtbaar maken  
  particleSizeSlider.display();
  speedSlider.display();
  resSlider.display();


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  nextImage();
}