//get location
navigator.geolocation.getCurrentPosition(weather);

function weather(position) {
    var lat = position.coords.latitude
    var long = position.coords.longitude
    console.log(lat);
    console.log(long)
}