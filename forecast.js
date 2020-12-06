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
    const apikey = "&appid=a7006c74c28e21c72439b32d4b4920ec";
    
    const citySearch = $("#search-term").val().trim();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apikey;

    console.log(queryURL);
}
/**
 * @param {object} 
 */

$("#run-search").on("click", function(event) {
    event.preventDefault();
    /*clear();*/
    var queryURL = buildQueryURL();
    $.ajax({
        url: queryURL,
        method: "GET"
    });
    console.log("It searched!");
})