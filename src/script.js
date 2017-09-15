var latitude, longitude;  // Longitude and Latitude variables
var Ftemp, Ctemp; // Fahrenheit and Celcius variables

function geoFindMe() {
	var output = document.getElementById("location");

	if (!navigator.geolocation) {
		output.innerHTML = "Geolocation is not supported by your browser";
		return;
	}

	function success(position) {
		latitude = position.coords.latitude.toFixed(2);
		longitude = position.coords.longitude.toFixed(2);

		output.innerHTML = "<p>Latitude is " + latitude + "° <br>Longitude is " + longitude + "°</p>";

		var api = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon="+ longitude + "&units=imperial" + "&APPID=9bc2e8db193857d51a6764aae51aa49c";

		// jQuery AJAX call FreeCodeCamp Weather API
		$.getJSON(api, function(data) {
			Ftemp = data.main.temp;
			Ctemp = (Ftemp - 32) * (5 / 9);
			var city = data.name;
			var weather = data.weather[0].description;
			var iconURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
			$("#temp").html(Math.round(data.main.temp) + " &deg; F");
			$("#location").html("You are " + city + " " + ", " + data.sys.country);
			$("#condition").html(weather);
			$("#icons").html("<img id='picture' src=" + iconURL + ">");

		});

	} // end success

	function error() {
		output.innerHTML = "Unable to retrieve your location";
	}

	output.innerHTML = "<p>Locating…</p>";

	navigator.geolocation.getCurrentPosition(success, error);



} // end of geoFindMe() function

function switchTemp(){
	var current = $("#changeTemp").html();
	if (current.indexOf("F") != -1) {
		$("#temp").html(Ctemp.toFixed(2) + " &deg; C");
		$("#changeTemp").html("&deg; C");
    }
    else if (current.indexOf("C") != -1) {
        $("#temp").html(Math.round(Ftemp )+ " &deg; F");
		$("#changeTemp").html("&deg; F");
    }
}
