var latitude, longitude;  // Longitude and Latitude variables
var Ftemp, Ctemp; // Fahrenheit and Celcius variables

function geoFindMe() {
	var output = document.getElementById("location");

	if (!navigator.geolocation) {
		output.innerHTML = "Geolocation is not supported by your browser";
		// add in a function to pop up a modal for zip code
		$(".modal").css("display","block");
		return;
	}

	function success(position) {
		latitude = position.coords.latitude.toFixed(4);
		longitude = position.coords.longitude.toFixed(4);

		let api = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon="+ longitude + "&units=imperial" + "&APPID=9bc2e8db193857d51a6764aae51aa49c";

		// jQuery AJAX call FreeCodeCamp Weather API
		$.getJSON(api, function(data) {
			Ftemp = data.main.temp;
			Ctemp = (Ftemp - 32) * (5 / 9);
			var city = data.name;
			var weather = data.weather[0].description;
			var icon = data.weather[0].icon;
			

			$("#temp").html("<p>" + Math.round(data.main.temp) +  "&deg; F" + "</p>"); // displays degrees Far
			$("#location").html("<p>" + "You are " + city + ", " + data.sys.country + "</p>"); // displays city and country
			$("#condition").html("<p>" + weather + "</p>"); // displays the weather condition
			
			pickIcon(icon);
			

		});

	} // end success

	function error() {
		$(".modal").css("display","block");
	}

	
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

function closeModal(){
	// HTML already validated zip code value
	var zipCode = document.getElementById("zipCode").value;
	$(".modal").css("display","none");
	let api = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&units=imperial" + "&APPID=9bc2e8db193857d51a6764aae51aa49c";

	// jQuery AJAX call FreeCodeCamp Weather API
	$.getJSON(api, function(data) {
		Ftemp = data.main.temp;
		Ctemp = (Ftemp - 32) * (5 / 9);
		var city = data.name;
		var weather = data.weather[0].description;
		var icon = data.weather[0].icon;
		

		$("#temp").html("<p>" + Math.round(data.main.temp) +  "&deg; F" + "</p>"); // displays degrees Far
		$("#location").html("<p>" + "You are " + city + ", " + data.sys.country + "</p>"); // displays city and country
		$("#condition").html("<p>" + weather + "</p>"); // displays the weather condition
		
		pickIcon(icon);
		

	});
}

function pickIcon(icon){

	switch (icon) { // switch statement to change background image for each weather type
	case "01d": //clear skys daytime
		$(".showcase").css("background-image", "url('Local-Weather-API/img/clearDay.jpg')"); /* Local-Weather-API/img/clearDay.jpg */
		$("#icons").html("<i class='wi wi-day-sunny'></i>");
		break;
	case "01n": // clear sky night
		$(".showcase").css("background-image", "url('Local-Weather-API/img/clearSkyNight.jpg')");
		$("#icons").html("<i class='wi wi-night-clear'></i>");
		break;
	case "02d": // few clouds day
		$(".showcase").css("background-image", "url('Local-Weather-API/img/fewCloudDay.jpg')");
		$("#icons").html("<i class='wi wi-day-cloudy'></i>");
		break;
	case "02n": // few clouds night
		$(".showcase").css("background-image", "url('Local-Weather-API/img/fewCloudsNight.jpg')");
		$("#icons").html("<i class='wi wi-night-cloudy'></i>");
		break;
	case "03d": // scattered clouds day
		$(".showcase").css("background-image", "url('Local-Weather-API/img/scatteredCloudsDay.jpg')");
		$("#icons").html("<i class='wi wi-day-sunny-overcast'></i>");
		break;
	case "03n": // scattered clouds night
		$(".showcase").css("background-image", "url('Local-Weather-API/img/scatteredCloudNight.jpg')");
		$("#icons").html("<i class='wi wi-night-partly-cloudy'></i>");
		break;
	case "04d": // broken clouds day
		$(".showcase").css("background-image", "url('Local-Weather-API/img/scatteredCloudsDay.jpg')");
		$("#icons").html("<i class='wi wi-day-cloudy-high'></i>");
		break;
	case "04n": // broken clouds night
		$(".showcase").css("background-image", "url('Local-Weather-API/img/scatteredCloudsNight.jpg')");
		$("#icons").html("<i class='wi wi-night-partly-cloudy'></i>");
		break;
		
	case "09d": // showers and rain day
	case "10d": // rain day
	case "11d": // thunderstomrs
		$(".showcase").css("background-image", "url('Local-Weather-API/img/rainFloor.jpg')");
		$("#icons").html("<i class='wi wi-day-rain'></i>");
		break;
		
	case "09n": // showers and rain night
	case "10n": // rain night
	case "11n": // thunderstorm night
		$(".showcase").css("background-image", "url('Local-Weather-API/img/rainFloor.jpg')");
		$("#icons").html("<i class='wi wi-night-rain'></i>");
		break;
		
	case "50d": // mist day
		$(".showcase").css("background-image", "url('Local-Weather-API/img/mistDay')");
		$("#icons").html("<i class='wi wi-day-fog'></i>");
		break;
	case "50n": // mist night
		$(".showcase").css("background-image", "url('Local-Weather-API/img/mistDay.jpg')");
		$("#icons").html("<i class='wi wi-night-fog' '></i>");
		break;

	}
}
