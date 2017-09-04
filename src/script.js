
function geoFindMe() {
var output = document.getElementById("location");

if (!navigator.geolocation){
output.innerHTML = "Geolocation is not supported by your browser";
return;
}

function success(position) {
var latitude  = position.coords.latitude;
var longitude = position.coords.longitude;

output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

var img = new Image();
img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

output.appendChild(img);
}

function error() {
output.innerHTML = "Unable to retrieve your location";
}

output.innerHTML = "<p>Locating…</p>";

navigator.geolocation.getCurrentPosition(success, error);
}

    $.ajax({
    type: "GET",
    url: "https://fcc-weather-api.glitch.me/",
    data: "/api/current?lon=:" +longitude&+"lat=:"+latitude,
    dataType: "dataType",
    success: function (response) {
        $('#condition').html()
    }
});


