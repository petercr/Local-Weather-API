var latitude, longitude;


function geoFindMe() {
    var output = document.getElementById("location");

    if (!navigator.geolocation) {
        output.innerHTML = "Geolocation is not supported by your browser";
        return;
    }

    function success(position) {
        latitude = position.coords.latitude.toFixed(2);
        longitude = position.coords.longitude.toFixed(2);

        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        var api = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon="+ longitude + "&units=imperial" + "&APPID=9bc2e8db193857d51a6764aae51aa49c";

        // jQuery AJAX call FreeCodeCamp Weather API
        $.getJSON(api, function(data) {

            $('#temp').html(data.main.temp + " &deg; C");
            $('#condition').html("<img src=" + data.weather.icon + ">");
        });

    } // end success

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);



} // end of geoFindMe() function
