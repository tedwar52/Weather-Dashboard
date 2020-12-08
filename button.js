function buttonSearchSingle () {
    const apikey = "&appid=a7006c74c28e21c72439b32d4b4920ec";
    var city = $(this).attr("data-name");
    const units = "&units=imperial";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + units + apikey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //single day forecast

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
        temp.text("Temperature: " + response.main.temp + "F");
        tempDiv.append(temp);
        $("#daily").append(tempDiv);

        //Humidity
        var humidityDiv = $("<div>");
        var humidity = $("<p>");
        humidity.text("Humidity: " + response.main.humidity + "%");
        humidityDiv.append(humidity);
        $("#daily").append(humidityDiv);

        //Wind Speed
        var windDiv = $("<div>");
        var windSpeed = $("<p>");
        windSpeed.text("Wind Speed: " + response.wind.speed + "mph");
        windDiv.append(windSpeed);
        $("#daily").append(windDiv);

    });
}

function buttonSearchMulti() {
    var city = $(this).attr("data-name");
    const apiKey = "&appid=a7006c74c28e21c72439b32d4b4920ec";
    const units = "&units=imperial";

    const longURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + units + apiKey;


    $.ajax({
        url: longURL,
        method: "GET"
    }).then(function(response) {

        $("#forecast").empty();

        for (var i = 0; i < response.list.length; i++) {
               if (response.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                   console.log(response.list[i].dt_txt);
             //Create new card component for each day
            var day = $("<div>");
            day.addClass("card");

            //Date
            var date = $("<h5>");
            date.text(response.list[i].dt_txt);
            day.append(date);
            $("#forecast").append(day);

            //Weather Conditions Icon
            var iconDiv = $("<div>");
            var iconcode = response.list[i].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
            var icon = $("<img>").attr("src", iconURL);
            iconDiv.append(icon);
            day.append(iconDiv);
            $("#forecast").append(day);
            
            //Temperature
            var temp = $("<p>");
            temp.text("Temperature: " + response.list[i].main.temp + "F");
            day.append(temp);
            $("#forecast").append(day);

            //Humidity
            var humidity = $("<p>");
            humidity.text("Humidity: " + response.list[i].main.humidity + "%");
            day.append(humidity);
            $("#forecast").append(day);
            }
        }
    })
}

$(document).on("click", ".city-btn", buttonSearchSingle);
$(document).on("click", ".city-btn", buttonSearchMulti);