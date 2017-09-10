var latitude, longitude;


function geoFindMe() {
    var output = document.getElementById("location");

    if (!navigator.geolocation) {
        output.innerHTML = "Geolocation is not supported by your browser";
        return;
    }

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        var api = "https://fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&lat=" + latitude;
        // jQuery AJAX call FreeCodeCamp Weather API
        $.getJSON(api, function(data) {
          ;


            $('#temp').html(data.main.temp);
            $('#condition').html("<img src=" + data.weather[0].icon;
        });

    } // end success

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);



} // end of geoFindMe() function
