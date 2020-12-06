function buildQueryURL() {

    /*base url*/
    const URL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apikey;
    /* should be: url + city name + api key */
    
    const city = "Asheville";
    const apikey = "&appid=a7006c74c28e21c72439b32d4b4920ec";
    
}