const usrForm = document.querySelector(".weatherForm");
const usrInp = document.querySelector(".usrInp");
const btnSubmit = document.querySelector(".mainBtn");
const resultDisplayAreaParent = document.querySelector(
    ".resultDisplayAreaMain",
);
const resultDisplayArea = document.querySelector(".resultDisplayArea");
const containerMain = document.querySelector(".container");
const loadingGif = document.querySelector("#loadingGif");
const api = "426d2f090c061430c02a4ea9ba629bff";

let cache = {};

usrForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = usrInp.value;
    if (city) {
        try {
            loadingGif.hidden = false;
            resultDisplayAreaParent.hidden = true;
            const weatherData = await weatherInfo(city);
            displayWeather(weatherData);
        } catch (error) {
            displayError(error);
        }
    } else {
        displayError("Enter something first!");
    }
});

async function weatherInfo(usrVal) {
    if (cache[usrVal.toLowerCase()]) {
        console.log("cache hit");
        return cache[usrVal.toLowerCase()];
    }
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${usrVal}&appid=${api}`;
    let response = await fetch(api_url);
    if (!response.ok) {
        throw new Error("Unable to fetch data!");
    }
    const data = response.json();
    cache[usrVal.toLowerCase()] = data;
    return data;
}
function displayWeather(weatherData) {
    resultDisplayAreaParent.hidden = false;
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }],
    } = weatherData;
    let weatherTempr = document.createElement("p");
    let weatherCity = document.createElement("p");
    let weatherDescription = document.createElement("p");
    let weatherHumidity = document.createElement("p");
    let weatherEmoji = document.createElement("p");
    globalThis.document.title = `${(temp - 273.15).toFixed(2)}°C - ${city}`;
    weatherTempr.innerHTML = `<span class="tempr">Temperature: ${(temp - 273.15).toFixed(2)}°C</span>`;
    weatherCity.innerHTML = `<span class="city">${city}</span>`;
    let finalDescription =
        description.charAt(0).toUpperCase() + description.slice(1);
    weatherDescription.textContent = `Description: ${finalDescription}`;
    weatherHumidity.textContent = `Humidity: ${humidity}%`;
    weatherEmoji.textContent = weatherEmojiDisplay(id);

    weatherEmoji.classList.add("weatherEmoji");
    loadingGif.hidden = true;

    resultDisplayAreaParent.hidden = false;
    resultDisplayArea.textContent = "";
    resultDisplayArea.appendChild(weatherCity);
    resultDisplayArea.appendChild(weatherTempr);
    resultDisplayArea.appendChild(weatherHumidity);
    resultDisplayArea.appendChild(weatherDescription);
    resultDisplayArea.appendChild(weatherEmoji);
}
function displayError(error) {
    let createElem = document.createElement("p");
    createElem.textContent = error;
    createElem.classList.add("errorMessage");
    resultDisplayArea.textContent = "";
    loadingGif.hidden = true;
    resultDisplayAreaParent.hidden = false;
    resultDisplayArea.appendChild(createElem);
}
function weatherEmojiDisplay(id) {
    switch (true) {
        case id >= 200 && id < 300:
            return "⛈️";
        case id >= 300 && id < 400:
            return "⛈️";
        case id >= 500 && id < 600:
            return "🌧️";
        case id >= 600 && id < 700:
            return "❄️";
        case id >= 700 && id < 800:
            return "🌫️";
        case id === 800:
            return "☀️";
        case id > 800 && id <= 804:
            return "☁️";
    }
}
