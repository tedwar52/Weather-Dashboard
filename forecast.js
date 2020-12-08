/** 
*@returns {string}
*/

const searchedCities = ["Charlotte", "Wilmington"]
$( document ).ready(function() {
    $("#old-cities").push(searchedCities);
});


function buildQueryURL() {

    /*base url*/
    const URL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
    
    /* should be: url + city name + api key */
    
    //const city = "Asheville";

    //how can i separate the search for city & state? two different input fields?
    const state = "NC";
    const country = "USA";
    //---------------------------

    const apikey = "&appid=a7006c74c28e21c72439b32d4b4920ec";
    
    const citySearch = $("#search-term").val().trim();
    const city = $(this).attr("data-name");

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
        var location = $("<h2>");
        location.addClass("bold")
        location.text(response.name);
        locationDiv.append(location);
        
        //Date
        var dateComp = $("<h5>")
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        dateComp.append(date);
        locationDiv.append(dateComp);
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
        temp.text("Temperature: " + response.main.temp);
        tempDiv.append(temp);
        $("#daily").append(tempDiv);

        //Humidity
        var humidityDiv = $("<div>");
        var humidity = $("<p>");
        humidity.text("Humidity: " + response.main.humidity);
        humidityDiv.append(humidity);
        $("#daily").append(humidityDiv);

        //Wind Speed
        var windDiv = $("<div>");
        var windSpeed = $("<p>");
        windSpeed.text("Wind Speed: " + response.wind.speed);
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
        a.addClass("city-btn");
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

$(document).on("click", "#city-btn", buildQueryURL);

//----------------NOTES-----------------------------


//should probably display everything in card components

//create new URL for 5-day forecast so it is not using the 5day api with 3hr updates

//still need to workout out UV Index!!
//----take lat and lon data from original api call
//-----create new url using that data
//------new ajax call using new url, then have it display
//-------colour code the results based on favourable, moderate, or severe

//have 5 day forecast display side by side!!

//need old search results to display when the page opens, not just at the click of a button!
//those buttons need to be clickable --> bring up old search results!

//may use something other than <p> to make text appear nicer..

//style with bootstrap