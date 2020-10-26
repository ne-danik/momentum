// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  dayWeek = document.querySelector('.day-week'),

  btnPrev = document.querySelector("#btnPrev"),
  btnNext = document.querySelector("#btnNext");

// SET BACKGROUND AND GREETING
let imageData = [];

function getRandomImageNum() {
  let imgNum = Math.trunc(Math.random() * 20 + 1);
  return imgNum = imgNum >= 10 ? (imgNum = `${imgNum}.jpg`) : (imgNum = `0${imgNum}.jpg`);
}

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  const base = "assets/images/";
  for (let i = 0; i < 24; i++) {
    switch (true) {
      case (i < 6):
        imageData[i] = base + "night/" + getRandomImageNum();
        break;
      case (i < 12):
        imageData[i] = base + "morning/" + getRandomImageNum();
        break;
      case (i < 18):
        imageData[i] = base + "day/" + getRandomImageNum();
        break;
      default:
        imageData[i] = base + "evening/" + getRandomImageNum();
    }
  }

  let src = imageData[hour];
  const img = document.createElement("img");

  img.src = src;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${src})`;
  };

  switch (true) {
    case (hour < 6):
      greeting.textContent = "Good Night, ";
      break;
    case (hour < 12):
      greeting.textContent = "Good Morning, ";
      break;
    case (hour < 18):
      greeting.textContent = "Good Afternoon, ";
      break;
    default:
      greeting.textContent = "Good Evening, ";
  }
}

let index = new Date();
let numOfImg = index.getHours();

btnNext.onclick = function () {
  if (numOfImg < imageData.length - 1) {
    numOfImg++;
    btnPrev.classList.remove('disabled');
    let src = imageData[numOfImg];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
  } else {
    btnNext.classList.add('disabled');
  }
};

btnPrev.onclick = function () {
  if (numOfImg > 0) {
    numOfImg--;
    btnNext.classList.remove('disabled');
    let src = imageData[numOfImg];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
  } else {
    btnPrev.classList.add('disabled');
  }
};

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    day = today.getDate();

    function getCurrentWeek(today) {
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[today.getDay()];
    }
    
    function getCurrentMonth(today) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months[today.getMonth()];
    }

    week = getCurrentWeek(today);
    month = getCurrentMonth(today);

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  dayWeek.innerHTML = `${week}, ${day} ${month}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

let nameMemory = "";
  
function hiddenName(event) {
  localStorage.setItem("name", event.target.innerText);
  nameMemory = localStorage.getItem("name");
  if (event.type === "click") {
    name.textContent = "";
  }
}

// Set Name
function setName(event) {
  if (event.type === 'keypress') {
    // Make sure enter is pressed
    if (event.which == 13 || event.keyCode == 13) {
      localStorage.setItem('name', event.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', event.target.innerText);
  }
  if (localStorage.getItem("name") === "") {
    localStorage.setItem("name", event.target.innerText);
    name.textContent = nameMemory;
    localStorage.removeItem("name");
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

let focusMemory = "";
  
function hiddenFocus(event) {
  localStorage.setItem("focus", event.target.innerText);
  focusMemory = localStorage.getItem("focus");
  if (event.type === "click") {
    focus.textContent = "";
  }
}

// Set Focus
function setFocus(event) {
  if (event.type === 'keypress') {
    // Make sure enter is pressed
    if (event.which == 13 || event.keyCode == 13) {
      localStorage.setItem('focus', event.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', event.target.innerText);
  }
  if (localStorage.getItem("focus") === "") {
    localStorage.setItem("focus", event.target.innerText);
    focus.textContent = focusMemory;
    localStorage.removeItem("focus");
  }
}

// WEATHER
const weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  city = document.querySelector('.city'),
  windSpeed = document.querySelector("#wind"),
  humidity = document.querySelector("#humidity");
let cityMemory = "";

function getCity() {
  if (
    localStorage.getItem("city") === null ||
    localStorage.getItem("city") == "[Enter your location]"
  ) {
    city.textContent = "[Enter your location]";
  } else {
    city.textContent = localStorage.getItem("city");
    getWeather();
  }
}

function hiddenCity(event) {
  localStorage.setItem("city", event.target.innerText);
  cityMemory = localStorage.getItem("city");
  if (event.type === "click") {
    city.textContent = "";
  }
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

city.onblur = function () {
  getWeather();
};

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=26a9e8b4d87ba795f5b27046406dc0c6&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 

  if (city.textContent == "") {
    localStorage.setItem("city", cityMemory);
    city.textContent = localStorage.getItem("city");
  } else if (data.cod != 200) {
    alert("Please enter your correct location");
    city.textContent = localStorage.getItem("city");
  } else {
    city.textContent = data.name;
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `${data.wind.speed}m/s`;
    humidity.textContent = `${data.main.humidity}%`;
  }
}

document.addEventListener('DOMContentLoaded', getWeather);

// QUOTE
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn-refresh');

async function getQuote() {  
  const url = await fetch(`https://type.fit/api/quotes`);
  const data = await url.json();

  let index = Math.trunc(Math.random() * data.length);

  blockquote.textContent = data[index].text;
  figcaption.textContent = data[index].author;
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener("click", hiddenName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener("click", hiddenFocus);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener("click", hiddenCity);

// Run
showTime();
setBgGreet();
getName();
getFocus();
getQuote();