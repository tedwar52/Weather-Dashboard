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

    const units = "&units=imperial";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + units + apikey;
    
    
    console.log(queryURL); //this is working

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        $("#daily").empty();

        console.log("searching...");
        //console.log(response.weather[0].description);
        //Name of City
        var locationDiv = $("<div>");
        var location = $("<p>");
        location.text(response.name);
        locationDiv.append(location);
        
        //Date
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        locationDiv.append(date);
        $("#daily").prepend(locationDiv);

        //Weather Description Icon
        var descriptionDiv = $("<div>");
        var iconcode = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
        var description = $("<img>").attr("src", iconURL);
        descriptionDiv.append(description);
        $("#daily").append(descriptionDiv);

        //Temperature
        var tempDiv = $("<div>");
        var temp = $("<p>");
        temp.text(response.main.temp);
        tempDiv.append(temp);
        $("#daily").append(tempDiv);

        //Humidity
        var humidityDiv = $("<div>");
        var humidity = $("<p>");
        humidity.text(response.main.humidity);
        humidityDiv.append(humidity);
        $("#daily").append(humidityDiv);

        //Wind Speed
        var windDiv = $("<div>");
        var windSpeed = $("<p>");
        windSpeed.text(response.wind.speed);
        windDiv.append(windSpeed);
        $("#daily").append(windDiv);

        //UV Index
    })
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
  
   buildQueryURL();

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