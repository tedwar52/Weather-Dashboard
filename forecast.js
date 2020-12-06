/*
$(document).ready(function () {
    var input = "";

    $("#run-search").click(function () {
        $("#search-term").each(function () {
            $
        })
    })
});
*/
/** 
@returns {string}
*/

function buildQueryURL() {

    /*base url*/
    const URL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
    
    /* should be: url + city name + api key */
    
    const city = "Asheville";

    //how can i separate the search for city & state? two different input fields?
    const state = "NC";
    const country = "USA";
    //---------------------------

    const apikey = "&appid=a7006c74c28e21c72439b32d4b4920ec";
    
    const citySearch = $("#search-term").val().trim();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apikey;


    console.log(queryURL);
}
/**
 * @param {object} currentForecast
 */
function forecastResult(currentForecast) {
    console.log(currentForecast);
    var results = currentForecast.data;
    /*i will need to create a unique piece for each component i want to display from the results!.. then append & prepend each one*/
    for (var i = 0; i < results.length; i++) {
        
        //name of city//
        var locationDiv = $("<div>");
        var location = $("<p>");
        location.text(name[i].name);
        locationDiv.append(location);
        //date
        $("#weather-section").append(locationDiv);
        //weather description -- will need icon representation//
        var descriptionDiv = $("<div>");
        var description = $("<img>");
        description.text(weather[i].icon);
        descriptionDiv.append(description);
        $("#weather-section").append(descriptionDiv);
        //temperature//
        var tempDiv = $("<div>");
        var temp = $("<p>");
        temp.text(main[i].temp);
        tempDiv.append(temp);
        $("#weather-section").append(tempDiv);
        //humidity//
        var humidityDiv = $("<div>");
        var humidity = $("<p>");
        humidity.text(main[i].humidity);
        humidityDiv.append(humidity);
        $("#weather-section").append(humidityDiv);
        //wind speed//
        var windDiv = $("<div>");
        var windSpeed = $("<p>");
        windSpeed.text(wind[i].speed);
        windDiv.append(windSpeed);
        $("#weather-section").append(windDiv);
        //uv index//
        var uvDiv = $("<div>");
        var uvIndex = $("<p>");
        uvIndex.text(main[i].humidity);
        humidityDiv.append(humidity);
        $("#weather-section").append(humidityDiv);
    };
}

$("#run-search").on("click", function(event) {
    event.preventDefault();
    /*clear();*/
    var queryURL = buildQueryURL();
    $.ajax({
        url: queryURL,
    }).then(forecastResult);
    console.log("It searched!");
})