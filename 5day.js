//display a 5 day forecast of searched city
/** 
*@returns {string}
*/

function buildLongURL() {

    const city = "Asheville";
    const citySearch = $("#search-term").val().trim();
    const apiKey = "&appid=a7006c74c28e21c72439b32d4b4920ec";

    const longURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

    console.log(longURL);
}
/**
 * @param {object} longForecast
 */
function weatherResult(longForecast) {
    console.log(longForecast)
    var results = longForecast.data;

    //I need 5 different sets of data to return in 5 different spots, collectively, on my page

    //display the first day
    for (var i = 0; i < results.length; i++) {
        //create main div//
        var day1 = $("<div>");
        //date//
        var date1 = $("<p>");
        date1.text(list[i].dt_text);
        day1.append(date1);
        //icon rep of weather conditions//
        var icon1 = $("<img>");
        icon1.text(list[i].weather.icon);
        day1.append(icon1);
        //temperature//
        var temp1 = $("<p>");
        temp1.text(list[i].main.temp);
        day1.append(temp1);
        //humidity//
        var humidity1 = $("<p>");
        humidity1.text(list[i].main.humidity);
        
        $("#forecast").append(day1);
    }
}

$("#run-search").on("click", function(event) {
    event.preventDefault();
    /*clear();*/
    var longURL = buildLongURL();
    $.ajax({
        url: longURL,
    });
    console.log("It searched for 5 day forecast!");
});