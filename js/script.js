const api = {
    key: "7ec937a505f7ef3673e8129d33275b2c",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
}

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
    if (event.keyCode === 13) {
        getResult(searchBox.value);
    }
}

function getResult(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(displayResults)
}


function displayResults(weather) {
    console.log(weather)
    const city = document.querySelector(".city");
    city.innerHTML =` ${weather.name}, ${weather.sys.country}`

    const now = new Date();
    const date = document.querySelector(".location .data");
    date.innerHTML = getDate(now);

    const temp = document.querySelector(".temp");
    temp.innerHTML =` ${Math.round(weather.main.temp)}<span>°C</span>`;

    const weatherEl = document.querySelector(".weather");

    if (weather.weather[0].main === "Rog") {
        weatherEl.innerHTML = `${weather.weather[0].main}
        <i class="fa-solid fa-raindrops"></i>
        `;
    }

    const hiLow = document.querySelector(".hi-low");
    hiLow.innerHTML = `
    ${Math.round(weather.main.temp_min)} °C /
    ${Math.round(weather.main.temp_max)} °C 
    `;
}

function getDate(a) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const day = days[a.getDay()];
    const date = a.getDate();
    const month = months[a.getMonth()];
    const year = a.getFullYear();

    return` ${day} ${date} ${month} ${year}`;

}
