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

            let temp = Math.round(data.main.temp);
            let iconCode = data.weather[0].icon;
            let speedWind = Math.round(data.wind.speed) + " km/h";
            console.log(data)
            var SRD = new Date(data.sys.sunrise * 1000);
            var SSD = new Date(data.sys.sunset * 1000);

            let totalHours = (Math.floor(data.sys.sunrise) - Math.floor(data.sys.sunset));
            let daylight = new Date(totalHours * 1000).getHours() + "hrs"


            let id = iconCode
            function getWeatherIcon(id) {
                switch (id) {
                    case "01d":
                        return "wi-day-sunny";
                        break;
                    case "02d":
                        return "wi-day-cloudy";
                        break;
                    case "03d":
                        return "wi-cloud";
                        break;
                    case "04d":
                        return "wi-cloudy";
                        break;
                    case "09d":
                        return "wi-day-rain";
                        break;
                    case "10d":
                        return "wi-night-alt-rain";
                        break;
                    case "11d":
                        return "wi-thunderstorm";
                        break;
                    case "13d":
                        return "wi-snow";
                        break;
                    case "50d":
                        return "wi-fog";
                        break;
                    default:
                        return "wi-day-cloudy"
                }
            }

            let iconWind = "";
            if (data.wind.deg >= 348.75 && data.wind.deg <= 33.75) {
                iconWind = "wi-direction-up";
            }
            else if (data.wind.deg > 33.75 && data.wind.deg <= 78.75) {
                iconWind = "wi wi-direction-up-right";
            }
            else if (data.wind.deg > 78.75 && data.wind.deg <= 123.75) {
                iconWind = "wi wi-direction-right";
            }
            else if (data.wind.deg > 123.75 && data.wind.deg <= 168.75) {
                iconWind = "wi wi-direction-down-right";
            }
            else if (data.wind.deg > 168.75 && data.wind.deg <= 213.75) {
                iconWind = "wi wi-direction-down";
            }
            else if (data.wind.deg > 213.75 && data.wind.deg <= 258.75) {
                iconWind = "wi wi-direction-down-left";
            }
            else if (data.wind.deg > 258.75 && data.wind.deg <= 303.75) {
                iconWind = "wi wi-direction-left";
            }
            else if (data.wind.deg > 303.75 && data.wind.deg <= 348.75) {
                iconWind = "wi wi-direction-up-left";
            }

            document.getElementById("main").innerHTML = data.weather[0].main;
            document.getElementsByTagName("I")[1].className = 'wi' + ' ' + getWeatherIcon(id);
            document.getElementById("location").innerHTML = data.name;
            document.getElementById("temp").innerHTML = temp;
            document.getElementById("humidity").innerHTML = data.main.humidity + "%";
            document.getElementById("pressure").innerHTML = data.main.pressure + " mmHg";
            document.getElementById("visiablity").innerHTML = data.visibility;
            document.getElementById("sunrise").innerHTML = SRD.getHours() + ":" + SRD.getMinutes()
            document.getElementById("sunset").innerHTML = SSD.getHours() + ":" + SSD.getMinutes()
            document.getElementById("daylight").innerHTML = daylight
            document.getElementById("cd").innerHTML = data.main.feels_like;
            document.getElementsByTagName("I")[9].className = iconWind;
            document.getElementById("dd").innerHTML = data.wind.deg + `°`;
            document.getElementById("sd").innerHTML = speedWind;
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });

}
