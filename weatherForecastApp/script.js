      // This is our API key. Add your own API key between the ""
      var APIKey = "947943026b6cb6065f688e6292251549";
    //   var search = 

    //create function that gets properties from api DOM tree
    //appends property values to DOM
    function searchCity(city) {
    //create variable to hold URL get get info needed to query the database
    var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" +
        APIKey;

      // We then created an AJAX call
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        // Create CODE HERE to Log the queryURL
        console.log(queryURL);
        // Create CODE HERE to log the resulting object
        console.log(response);
        // Create CODE HERE to calculate the temperature (converted from Kelvin)
        console.log(response.main.temp);
        var tempKelvin= response.main.temp;
        var tempFarenheit =(tempKelvin - 273.15) * 1.80 +32;
        console.log (tempFarenheit)
        // Create CODE HERE to transfer content to HTML
        var temp = $("<p>").text("Temperature (F): " + tempFarenheit);
        console.log(temp);
        //create variable to create news tags to hold values of properties from api
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed);
        console.log(windSpeed);

        var humidity = $("<p>").text("Humidity: " + response.main.humidity);
        console.log(humidity);

        var cityName = $("<h1>").text(response.name);
        console.log(cityName);
        //clear previous search and append new seach values to DOM
        $(".city").empty();
        $(".city").append(cityName, windSpeed, humidity, temp);
      });
    }


      // Event handler for user clicking the select-artist button
      $("#select-city").on("click", function (event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();
        // Storing the artist name
        var inputCity = $("#city-input").val().trim();
    
        // Running the searchBandsInTown function(passing in the artist as an argument)
        searchCity(inputCity);
      });