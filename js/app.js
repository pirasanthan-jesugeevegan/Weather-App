var apiKey = '3aab69399bf03eca438758bf6e33d18e'

//get location
navigator.geolocation.getCurrentPosition(weather);


function weather(position) {
    lat = position.coords.latitude
    long = position.coords.longitude
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=metric'

    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data)
            let weather = data.weather[0];
            let temp = Math.round(data.main.temp);
            console.log(weather)

            document.getElementById("location").innerHTML = data.name;
            document.getElementById("temp").innerHTML = temp;
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });

}




