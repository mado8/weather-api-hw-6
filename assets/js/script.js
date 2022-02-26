const apiKey = `7b2108bf7e20dd2cb90cba345009dacd`
var searchInput = document.getElementById("search-input");
var search = document.getElementById("search-button");
var currentWeather = document.getElementById("current-weather");
var forecast = document.getElementById("forecast");
var recentSearch = document.getElementById("recent-searches");
var myCities = JSON.parse(localStorage.getItem("myCities") || "[]");

var city;

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
    })
}

const renderCities = () => {
    console.log(myCities)
    myCities.forEach(city => {
        console.log(city)
        let a = document.createElement("a");
        a.className += "card-body"
        a.innerHTML = city
        recentSearch.append(a)
    })
}

searchInput.addEventListener("change", handleInput)
search.addEventListener('click', handleSubmit)
renderCities();