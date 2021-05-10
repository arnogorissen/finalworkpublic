$(function () {
    getList();
    //Retrieves list of art from json using AJAX call
    function getList() {
        $.ajax({
            url: 'http://127.0.0.1:3000/getStromingen',
            method: 'GET',
            dataType: 'json',
            data: "data",
        }).done(function (data) {
            console.log(data);
            $('#listOfArt').empty();
            for (let art of data) {
                $('#listOfArt').append(`<div id="listElement" > <label class= "containerlistelement"> ${art.name} <input type="checkbox" name="art" value="${art.name}" id="${art.id}"> <span class="checkmark"></span>  <br>
               <div class="imagecontainer" style="width: 100%; height: 200px; background-image: url('${art.example}'); background-size: cover; "></div> <br> </label></div>`);
            }
        }).fail(function (er1, er2) {
            console.log(er1);
            console.log(er2);
        });
    }

    let confirmation = {
        selection: "selection",
    }

//de date van de form doorsturen naar de node backend
    $("#submit").click(function (e) {
        e.preventDefault();
        console.log("button pressed");

        let selection = $("form").serializeArray();
        $.each(selection, function (i, art) {
            confirmation.selection = art.value;
        });
        console.log(selection);

        $.ajax({
            url: 'http://127.0.0.1:3000/sendStromingen',
            method: 'POST',
            data: selection
        }).done(function (data) {
            console.log(data)
            $('#selectionList').empty();

        //    if(Array.isArray(data)){
        //     for (let i of data) {
        //         $('#selectionList').append(`<label>${i.name}<div class="imagecontainer" style="width: 100%; height: 150px; background-image: url('${i.example}'); background-size: cover;"></div> </label><br>`);
        //     }
        //    }else{
        //     $('#selectionList').append(`<label>${data.name}<div class="imagecontainer" style="width: 100%; height: 150px; background-image: url('${data.example}'); background-size: cover;"></div> </label><br>`);
        //    }

           e.preventDefault();

        }).fail(function (er1, er2) {
            console.log(er1);
            console.log(er2);
        });
    });
});