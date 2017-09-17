var latitude, longitude;  // Longitude and Latitude variables
var Ftemp, Ctemp; // Fahrenheit and Celcius variables

function geoFindMe() {
	var output = document.getElementById("location");

	if (!navigator.geolocation) {
		output.innerHTML = "Geolocation is not supported by your browser";
		// add in a function to pop up a modal for zip code
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
			var icon = data.weather[0].icon;
			console.log("icon number is " + icon);
			var iconURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

			$("#temp").html(Math.round(data.main.temp) + " &deg; F"); // displays degrees Far
			$("#location").html("You are " + city + " " + ", " + data.sys.country); // displays city and country
			$("#condition").html(weather); // displays the weather condition
			$("#icons").html("<img id='picture' src=" + iconURL + ">"); // adds an img tag with icon from API

			switch (icon) { // switch statement to change background image for each weather type
			case "01d":
				$(".container").css("background-image", "url('/img/clearDay.jpg')");
				break;
			case "01n":
				$(".container").css("background-image", "url('/img/clearSkyNight.jpg')");
				break;
			case "02d":
				$(".container").css("background-image", "url('/img/fewCloudDay.jpg')");
				break;
			case "02n":
				$(".container").css("background-image", "url('/img/fewCloudsNight.jpg')");
				break;
			case "03d":
				$(".container").css("background-image", "url('/img/scatteredCloudsDay.jpg')");
				break;
			case "03n":
				$(".container").css("background-image", "url('/img/scatteredCloudNight.jpg')");
				break;
			case "04d":
				$(".container").css("background-image", "url('/img/scatteredCloudsDay.jpg')");
				break;
			case "04n":
				$(".container").css("background-image", "url('/img/scatteredCloudsNight.jpg')");
				break;
			case "09d":
				$(".container").css("background-image", "url('/img/dayRain.jpg')");
				break;
			case "09n":
				$(".container").css("background-image", "url('/img/nightRain.jpg')");
				break;
			case "10d":
				$(".container").css("background-image", "url('/img/dayRain.jpg')");
				break;
			case "10n":
				$(".container").css("background-image", "url('/img/nightRain.jpg')");
				break;
			case "11d":
				$(".container").css("background-image", "url('/img/dayRain.jpg')");
				break;
			case "11n":
				$(".container").css("background-image", "url('/img/nightRain.jpg')");
				break;
			case "50d":
				$(".container").css("background-image", "url('/img/mistDay')");
				break;
			case "50n":
				$(".container").css("background-image", "url('/img/mistDay.jpg')");
				break;

			default:
				$(".container").css("background-image" , "url('/img/nightRain.jpg')");
			}

		});

	} // end success

	function error() {
		output.innerHTML = "Unable to retrieve your location";
		// add in a function to pop up a modal for zip code
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
