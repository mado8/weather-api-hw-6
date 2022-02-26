const apiKey = `7b2108bf7e20dd2cb90cba345009dacd`
var searchInput = document.getElementById("search-input");
var search = document.getElementById("search-button");
var currentWeather = document.getElementById("current-weather");
var forecast = document.getElementById("forecast");
var recentSearch = document.getElementById("recent-searches");
var myCities = JSON.parse(localStorage.getItem("myCities") || "[]");

var city;

const unixTimestamp = new Date()
const weekday = unixTimestamp.toLocaleString("en-US", {weekday: "long"}) // Monday
const month = unixTimestamp.toLocaleString("en-US", {month: "long"}) // December
const day = unixTimestamp.toLocaleString("en-US", {day: "numeric"})

const handleInput = (e) => {
    e.preventDefault();
    city = e.target.value
    console.log(city)
}

const handleSubmit = (e) => {
    e.preventDefault();
    myCities.push(city);
    localStorage.setItem('myCities', JSON.stringify(myCities))
    console.log(myCities)
    renderOneCity(myCities[myCities.length -1])
    getSearch()
}

const getSearch = () => {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    fetch(url)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        console.log(data)
        document.getElementById('my-weather-title').innerHTML = `${`<div>${city.toUpperCase()}`} 
        ${'<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" alt="' + data.weather[0].description + '"></img>'}
        ${`${weekday.toUpperCase()}, ${month.toUpperCase()} ${day}`}</div>`
        document.getElementById('temp').innerHTML = `Temperature: ${data.main.temp} ºF`
        document.getElementById('feels-like').innerHTML = `Feels Like: ${data.main.feels_like} ºF`
        document.getElementById('wind').innerHTML = `Wind: ${data.wind.speed} MPH`
        document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity} %`
        document.getElementById('uv-index')
    })
}

const renderOneCity = (city) => {
    let button = document.createElement("button");
        button.className += "card-body"
        button.setAttribute("value", city)
        button.innerHTML = city
        recentSearch.append(button)
}

const renderCities = () => {
    console.log(myCities)
    myCities.forEach(city => {
       console.log(city)
       renderOneCity(city)
    })
}


recentSearch.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }

  city = event.target.value;
  getSearch()
})

searchInput.addEventListener("change", handleInput)
search.addEventListener('click', handleSubmit)
renderCities();