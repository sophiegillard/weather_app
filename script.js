// ALL VARIABLES HERE
    //HTML Positions
let city = document.getElementById('search__filter').value;
const loupeIcon = document.getElementById('search__icon');
const form = document.getElementById('search');
const main = document.getElementById('weather')
const searchFilter = document.getElementById('search__filter');
    //Other variales
let cardDiv;
let forecast__hourly__cards;

//FUnction to get new value each time -- doesn't work !!!
// searchFilter.addEventListener('keyup', getCityName=> {
//     city = getCityName.target.value;
// })


const urlWeather = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=35a424094f5768808cd0f9ac43b6d336`;


const fetchForecast = async (url) => {
    try{
    const response = await fetch(url)
    const result = await response.json()
    mainCard(city)
    headerCard(result.city.name, result.list[0].main.temp, result.list[0].weather[0].description)
    contentCard()
    // hourlyCard(2, "images/weather.svg", 29)
    for (let i = 0, n = 3; i < 5; i++, n++) {
        hourlyCard(n+3, `http://openweathermap.org/img/wn/${result.list[0].weather[0].icon}@2x.png`, result.list[i].main.temp)
        console.log(result.list[i].main.temp)
        
    }
console.log(result)

    } catch (e) {
        alert('ERROR : please enter a valid a city in English')
        console.log(e)
    }
}

loupeIcon.addEventListener('click', () =>{
    fetchForecast(urlWeather)
})

const mainCard = (city) =>{
    // Creating the main Div
    cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.classList.add(city);
    main.appendChild(cardDiv);
    return cardDiv;
}

const headerCard = (cityName, cityDegree, cityWeather) =>{
    let card__header = document.createElement('section');
    card__header.classList.add('card__header');
    cardDiv.appendChild(card__header)

    let forecast__actual__city = document.createElement('h2');
    forecast__actual__city.classList.add('forecast__actual__city');
    card__header.appendChild(forecast__actual__city);
    forecast__actual__city.innerHTML= cityName;

    let forecast__actual__degree = document.createElement('p');
    forecast__actual__degree.classList.add('forecast__actual__degree');
    card__header.appendChild(forecast__actual__degree);
    forecast__actual__degree.innerHTML = cityDegree;

    let forecast__actual__weather = document.createElement('p');
    forecast__actual__weather.classList.add('forecast__actual__weather');
    card__header.appendChild(forecast__actual__weather);
    forecast__actual__weather.innerHTML = cityWeather;
}
 //Creating card content but not the small weather cards
const contentCard = () => {
    let card__content = document.createElement('section');
    card__content.classList.add('card__content');
    cardDiv.appendChild(card__content)

    //HOURS CARDS
    let forecast__hourly = document.createElement('div');
    forecast__hourly.classList.add('forecast__hourly');
    card__content.appendChild(forecast__hourly);

    let forecast__hourly__title = document.createElement('h3');
    forecast__hourly__title.classList.add('forecast__hourly__title');
    forecast__hourly.appendChild(forecast__hourly__title);
    forecast__hourly__title.innerHTML="Hourly Forecast"

    forecast__hourly__cards = document.createElement('div');
    forecast__hourly__cards.classList.add('forecast__hourly__cards');
    forecast__hourly.appendChild(forecast__hourly__cards);
    return forecast__hourly__cards;

    //WEEKLY CARDS
    let forecast__weekly = document.createElement('div');
    forecast__weekly.classList.add('forecast__weekly');
    card__content.appendChild(forecast__weekly);

    let forecast__weekly__title = document.createElement('h3');
    forecast__weekly__title.classList.add('forecast__weekly__title');
    forecast__weekly.appendChild(forecast__weekly__title);
    forecast__weekly__title.innerHTML="Weekly Forecast"

    let forecast__weekly__card = document.createElement('div');
    forecast__weekly__card.classList.add('forecast__weekly__card');
    forecast__weekly.appendChild(forecast__weekly__card);
}

const hourlyCard = (hours, icon, futureDegree) =>{
    let hourly__card = document.createElement('div');
    hourly__card.classList.add('hourly__card');
    forecast__hourly__cards.appendChild(hourly__card);

    let hourly__card__time = document.createElement('time');
    hourly__card__time.classList.add('hourly__card__time');
    hourly__card.appendChild(hourly__card__time);
    hourly__card__time.innerText = hours + "hours later";

    let hourly__card__icon = document.createElement('img');
    hourly__card__icon.classList.add('hourly__card__icon');
    hourly__card.appendChild(hourly__card__icon);
    hourly__card__icon.src= icon;

    let hourly__card__degree = document.createElement('p');
    hourly__card__degree.classList.add('hourly__card__degree');
    hourly__card.appendChild(hourly__card__degree);
    hourly__card__degree.innerHTML = futureDegree +"°C"
}

const repeatHourlyCard =(temperature) =>{
    for (let i = 0; i < 5; i++) {
        console.log(temperatur)
        
    }
}