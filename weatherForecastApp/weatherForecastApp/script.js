
//create variable to hold API key
var APIKey = "947943026b6cb6065f688e6292251549";
//create function that gets properties from api DOM tree
//appends property values to DOM
function searchCity(city) {
  //create variable to hold URL get get info needed to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // Create CODE HERE to Log the queryURL
    console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(response);
    // Create CODE HERE to calculate the temperature (converted from Kelvin)
    var tempKelvin = response.list[0].main.temp;
    var tempFarenheit = ((tempKelvin - 273.15) * 1.80 + 32).toFixed(2);
    // Create CODE HERE to transfer content to HTML
    var temp = $("<p>").text("Temperature: " + tempFarenheit + " \xB0F");
    //create variable to create news tags to hold values of properties from api
    var windSpeed = $("<p>").text("Wind Speed: " + response.list[0].wind.speed + " MPH");
    var humidity = $("<p>").text("Humidity: " + response.list[0].main.humidity + "%");
    var cityName = $("<h1>").text(response.city.name);
    //clear previous search and append new seach values to DOM
    $(".city-weather").empty();
    $(".city-weather").append(temp, windSpeed, humidity);
    $(".city-name").empty();
    $(".city-name").append(cityName);

    //create for loop to iterate through DOM tree for 5 day forecast
    for (var i = 1; i < response.list.length; i++) {
      if (response.list.length > 6) {
        response.list.length = 6
      }

      //store values for other days in variables
      var tempKelvinFore = response.list[i].main.temp;
      var tempFarenheitFore = ((tempKelvinFore - 273.15) * 1.80 + 32).toFixed(2);
      var tempFore = $("<p class='form-inline'>").text("Temperature: " + tempFarenheitFore + " \xB0F");
      var windSpeedFore = $("<p class='form-inline'>").text("Wind Speed: " + response.list[i].wind.speed + " MPH");
      var humidityFore = $("<p class='form-inline'> <br>").text("Humidity: " + response.list[i].main.humidity + "%");


      //append values to cards created in html
      $(".forecast").append(tempFore, windSpeedFore, humidityFore);
    }
  });
}
//create variable to parse and set  JSON object from response to localStorage
var searchHistory = JSON.parse(localStorage.getItem("search-history"));
//set parameter so that value of null is empty array to ad to
if (searchHistory === null) {
  searchHistory = []
}
//create function that iterates through response and creates button for searchHistory
renderSearchHistory();
function renderSearchHistory() {
  //empty div with search-history ID
  $("#search-history").empty();
  for (var i = 0; i < searchHistory.length; i++) {
    var button = $("<button type='button' class='btn btn-primary forecast-button'>").text(
      searchHistory[i]
    );
    //append button to DOM
    $("#search-history").append(button);
  }
}
//create function to get value from search inputted by user
$("form").on("submit", function (event) {
  event.preventDefault();
  var search = $("#city-input")
    .val()
    .trim();
  //put values iterated from response and user input to beginning of array
  searchHistory.unshift(search);
  //set limit to amount of values/buttons stored
  while (searchHistory.length > 10) {
    searchHistory.pop();
  }
  //put search-history inputted by user into localStorage
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
  renderSearchHistory();
});

// Event handler for user clicking the select-city button
$("#select-city").on("click", function (event) {
  // Preventing the button from trying to submit the form
  event.preventDefault();
  // Storing the city in variable from user input
  var inputCity = $("#city-input").val().trim();
  // Running the searchCity function(passing in the city as an argument)
  searchCity(inputCity);
  $(".forecast").empty();
});

//Event hanndler for user clicking forecast-button 
//Prevent button from trying to submit form
//store value in variable
//run searchCity function to take value from local storage and append to DOM again
