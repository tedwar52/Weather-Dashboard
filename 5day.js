//display a 5 day forecast of searched city
/** 
*@returns {string}
*/

function buildLongURL() {

    const city = "Asheville";
    const citySearch = $("#search-term").val().trim();
    const apiKey = "&appid=a7006c74c28e21c72439b32d4b4920ec";
    const units = "&units=imperial";

    const longURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + units + apiKey;

    console.log(longURL);

    $.ajax({
        url: longURL,
        method: "GET"
    }).then(function(response) {
        
        for (var i = 0; i < 5; i++) {
            //Create new card component for each day
            var day = $("<div>");
            day.addClass("card");

            //Date
            var date = $("<p>");
            date.text(response.list[i].dt_txt);
            day.append(date);
            $("#forecast").append(day);

            //Weather Conditions Icon
            var iconURL = response.list[i].weather[0].icon;
            var icon = $("<img>").attr("src", iconURL);
            day.append(icon);
            $("#forecast").append(day);
            
            //Temperature
            var temp = $("<p>");
            temp.text(response.list[i].main.temp);
            day.append(temp);
            $("#forecast").append(day);

            //Humidity
            var humidity = $("<p>");
            humidity.text(response.list[i].main.humidity);
            day.append(humidity);
            $("#forecast").append(day);

        }
    })
}


$("#run-search").on("click", function(event) {
    event.preventDefault();
    /*clear();*/
    buildLongURL();
    
    console.log("It searched for 5 day forecast!");
});