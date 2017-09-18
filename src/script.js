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
			var iconURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

			$("#temp").html(Math.round(data.main.temp) + " &deg; F"); // displays degrees Far
			$("#location").html("You are " + city + " " + ", " + data.sys.country); // displays city and country
			$("#condition").html(weather); // displays the weather condition
			

			switch (icon) { // switch statement to change background image for each weather type
			case "01d": //clear skys daytime
				$(".container").css("background-image", "url('/img/clearDay.jpg')");
				$("#icons").html("<i class='wi wi-day-sunny'></i>");
				break;
			case "01n": // clear sky night
				$(".container").css("background-image", "url('/img/clearSkyNight.jpg')");
				$("#icons").html("<i class='wi wi-night-clear'></i>");
				break;
			case "02d": // few clouds day
				$(".container").css("background-image", "url('/img/fewCloudDay.jpg')");
				$("#icons").html("<i class='wi wi-day-cloudy'></i>");
				break;
			case "02n": // few clouds night
				$(".container").css("background-image", "url('/img/fewCloudsNight.jpg')");
				$("#icons").html("<i class='wi wi-night-cloudy'></i>");
				break;
			case "03d": // scattered clouds day
				$(".container").css("background-image", "url('/img/scatteredCloudsDay.jpg')");
				$("#icons").html("<i class='wi wi-day-sunny-overcast'></i>");
				break;
			case "03n": // scattered clouds night
				$(".container").css("background-image", "url('/img/scatteredCloudNight.jpg')");
				$("#icons").html("<i class='wi wi-night-partly-cloudy'></i>");
				break;
			case "04d": // broken clouds day
				$(".container").css("background-image", "url('/img/scatteredCloudsDay.jpg')");
				$("#icons").html("<i class='wi wi-day-cloudy-high'></i>");
				break;
			case "04n": // broken clouds night
				$(".container").css("background-image", "url('/img/scatteredCloudsNight.jpg')");
				$("#icons").html("<i class='wi wi-night-partly-cloudy'></i>");
				break;
			
			case "09d": // showers and rain day
			case "10d": // rain day
			case "11d": // thunderstomrs
				$(".container").css("background-image", "url('/img/dayRain.jpg')");
				$("#icons").html("<i class='wi wi-day-rain'></i>");
				break;
			
			case "09n": // showers and rain night
			case "10n": // rain night
			case "11n": // thunderstorm night
				$(".container").css("background-image", "url('/img/nightRain.jpg')");
				$("#icons").html("<i class='wi wi-night-rain'></i>");
				break;
			
			case "50d": // mist day
				$(".container").css("background-image", "url('/img/mistDay')");
				$("#icons").html("<i class='wi wi-day-fog'></i>");
				break;
			case "50n": // mist night
				$(".container").css("background-image", "url('/img/mistDay.jpg')");
				$("#icons").html("<i class='wi wi-night-fog'></i>");
				break;

			default:
				$(".container").css("background-image" , "url('/img/nightRain.jpg')");
				$("#icons").html("<i class='wi wi-day-sunny'></i>");
				console.log("something went wrong");
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
