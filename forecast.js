/** 
*@returns {string}
*/

const searchedCities = ["Charlotte", "Wilmington"]

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

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + apikey;


    console.log(queryURL); //this is working
}
/**
 * @param {object} currentForecast
 */
function forecastResult(currentForecast) {
    console.log(currentForecast); //this is NOT working

    $("#daily").empty();
    var results = currentForecast.data;
    /*i will need to create a unique piece for each component i want to display from the results!.. then append & prepend each one*/
    for (var i = 0; i < results.length; i++) {
        
        //name of city//
        var locationDiv = $("<div>");
        var location = $("<p>");
        location.text(name[i].name);
        locationDiv.append(location);
        //date
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        /*do i need to set the date as an attribute onto a new <p>?*/
        locationDiv.append(date);
        $("#daily").prepend(locationDiv)
        //weather description -- will need icon representation//
        var descriptionDiv = $("<div>");
        var description = $("<img>");
        description.text(weather[i].icon);
        descriptionDiv.append(description);
        $("#daily").prepend(descriptionDiv);
        //temperature//
        var tempDiv = $("<div>");
        var temp = $("<p>");
        temp.text(main[i].temp);
        tempDiv.append(temp);
        $("#daily").prepend(tempDiv);
        //humidity//
        var humidityDiv = $("<div>");
        var humidity = $("<p>");
        humidity.text(main[i].humidity);
        humidityDiv.append(humidity);
        $("#daily").prepend(humidityDiv);
        //wind speed//
        var windDiv = $("<div>");
        var windSpeed = $("<p>");
        windSpeed.text(wind[i].speed);
        windDiv.append(windSpeed);
        $("#daily").prepend(windDiv);
        //uv index//
        var uvDiv = $("<div>");
        var uvIndex = $("<p>");
        uvIndex.text(main[i].humidity);
        humidityDiv.append(humidity);
        $("#daily").prepend(humidityDiv);
    };
}

//--this saves my searched cities as data
function saveSearch() {

    $("#old-cities").empty();

    for (var i = 0; i < searchedCities.length; i++) {
        var a = $("<button>");
        a.addClass("btn-lg");
        a.addClass("btn-outline-primary");
        a.addClass("btn-block");
        a.attr("data-name", searchedCities[i]);
        a.text(searchedCities[i]);
        $("#old-cities").append(a);
    }
}

$("#run-search").on("click", function(event) {
    event.preventDefault();
    /*clear();*/
    var search = $("#search-term").val().trim();
    var queryURL = buildQueryURL();
    $.ajax({
        url: queryURL,
    }).then(forecastResult);
    console.log("It searched!");

    //save my search and push it into my searchedCities array
    searchedCities.push(search);
    saveSearch();
    
});

//----------------NOTES-----------------------------

//  can clean up code under forecastResult function... can probably append several new components to one or two divs instead of creating a new one for each component

//  will probably want to display results in a card component (check html!!)

// console.log on line 32 is NOT working
// is making a currentForecast object necessary? am I doing that part right? is this the source of an error

//ensure the date displays correctly -- line 45