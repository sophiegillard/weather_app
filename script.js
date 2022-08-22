// ALL VARIABLES HERE
    //HTML Positions
// let ville = document.getElementById('search__filter').value;
let ville;
const loupeIcon = document.getElementById('search__icon');
const form = document.getElementById('search');
const main = document.getElementById('weather')
const searchFilter = document.getElementById('search__filter');
    //Other variales
let hoursDate;
let hoursArr= []
let resultArr=[];
let formattedTime;
let weekDay;
let bkPicture;
let imageBackGround;


//Function to get new value each time -- doesn't work !!!
searchFilter.addEventListener('keyup', getCityName=> {
    ville = getCityName.target.value;
    return ville;
})

loupeIcon.addEventListener('click', () =>{
    let urlWeather = "https://api.openweathermap.org/data/2.5/forecast?q="+ville+"&units=metric&appid=35a424094f5768808cd0f9ac43b6d336";
    fetchForecast(urlWeather)
    document.getElementById('search__filter').value = ""


    //TRYING TO GET LOCAL STORAGE
    const key = "cities"
    const value = ville
    console.log(key)
    console.log(value)

    if (key && value){
        localStorage.setItem(key, value)

    }
})


for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    console.log(`${key} : ${value}`)
    let urlWeather = "http://api.openweathermap.org/data/2.5/forecast?q="+ville+"&units=metric&appid=35a424094f5768808cd0f9ac43b6d336";

    
}




const fetchForecast = async (url) => {

    try{
        const response = await fetch(url)
        const result = await response.json()
        let bkPicture;
        let cardHeader;
        // let weekDay = getWeekDay(result.list[0].dt)

        //calling all functions to create the cards
        mainCard(result.city.name)
        headerCard(result.city.name, result.list[0].main.temp, result.list[0].weather[0].description)
        contentCard(result.city.name)
        contentCardHour(result.city.name)
        contentCardWeek(result.city.name)
        console.log(result)

        //Creating the hourly weather cards
        for (let i = 0; i < 5; i++) {
            let hours = getHourTime(result.list[i].dt)

            hourlyCard(hours, `images/${result.list[i].weather[0].icon}.png`, result.list[i].main.temp)
        }


        // Creating loop for weekDay
        for (let i = 0, n = 5; i < 6; i++, n+=7) {
            if ((i+n)>40){
                break;
            }
            else{
            let weekDay= getWeekDay(result.list[i+n].dt);
            weeklyCard(result.city.name, `images/${result.list[i+n].weather[0].icon}.png`, weekDay, result.list[i+n].weather[0].main, result.list[i+n].main.temp, result.list[i+n].main.temp)
            }
        }

        //FETCH PITCURES API
        const fetchPictures = async (urlFetch) =>{
            try{
                const response = await fetch (urlFetch);
                const resultPic = await response.json()
            
                cardHeader= document.getElementsByClassName(`card__header ${result.city.name}`)[0]
    
                cardHeader.style.background = 'url(' + resultPic["results"][0]["urls"]["regular"]+')';
                cardHeader.style.backgroundPosition = 'center center';
                cardHeader.style.backgroundSize = 'cover';
                return cardHeader;
            }
            catch(e){
                alert('no picture found')
                console.log(e)
            }
        }

        let urlphotos= `https://api.unsplash.com/search/photos?query=${ville}&client_id=LXFnKFlXOktGEqfGNNe8p-z5DtielDkONj9s-EWYJmw`;
        fetchPictures(urlphotos)
        


    } catch (e) {
        alert('ERROR : please enter a valid a city in English')
        console.log(e)
    }
}




//CREATION OF CARDS -- BEGINNING
const mainCard = (city) =>{
    // Creating the main Div
    cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.classList.add(city);
    main.appendChild(cardDiv);
    
}

const headerCard = (cityName, cityDegree, cityWeather) =>{
    let card__header = document.createElement('section');
    card__header.classList.add('card__header');
    card__header.classList.add(cityName);
    cardDiv.appendChild(card__header)

    let card__header__content = document.createElement('div');
    card__header__content.classList.add ('card__header__content');
    card__header__content.classList.add(cityName);
    card__header.appendChild( card__header__content);

    let forecast__actual__city = document.createElement('h2');
    forecast__actual__city.classList.add('forecast__actual__city');
    card__header__content.appendChild(forecast__actual__city);
    forecast__actual__city.innerHTML= cityName;

    let forecast__actual__degree = document.createElement('p');
    forecast__actual__degree.classList.add('forecast__actual__degree');
    card__header__content.appendChild(forecast__actual__degree);
    forecast__actual__degree.innerHTML = cityDegree +"°";

    let forecast__actual__weather = document.createElement('p');
    forecast__actual__weather.classList.add('forecast__actual__weather');
    card__header__content.appendChild(forecast__actual__weather);
    forecast__actual__weather.innerHTML = cityWeather;
}
 //Creating card content but not the small weather cards
const contentCard = (cityName) => {
    let card__content = document.createElement('section');
    card__content.classList.add('card__content');
    card__content.classList.add(cityName);
    cardDiv.appendChild(card__content)

}

//HOURS CARDS
const contentCardHour = (cityName) => {
    let card__content__city =document.getElementsByClassName(`card__content ${cityName}`)[0]
    console.log(card__content__city)
    let forecast__hourly = document.createElement('div');
    forecast__hourly.classList.add('forecast__hourly');
    card__content__city.appendChild(forecast__hourly);

    let forecast__hourly__title = document.createElement('h3');
    forecast__hourly__title.classList.add('forecast__hourly__title');
    forecast__hourly__title.classList.add('secondary__title');
    forecast__hourly.appendChild(forecast__hourly__title);
    forecast__hourly__title.innerHTML="Hourly Forecast"

    forecast__hourly__cards = document.createElement('div');
    forecast__hourly__cards.classList.add('forecast__hourly__cards');
    forecast__hourly.appendChild(forecast__hourly__cards);
}

    // WEEKLY CARDS
const contentCardWeek = (cityName) => {
    let card__content__city =document.getElementsByClassName(`card__content ${cityName}`)[0]
    let forecast__weekly = document.createElement('div');
    forecast__weekly.classList.add('forecast__weekly');
    card__content__city.appendChild(forecast__weekly);

    let forecast__weekly__title = document.createElement('h3');
    forecast__weekly__title.classList.add('forecast__weekly__title');
    forecast__weekly__title.classList.add('secondary__title');
    forecast__weekly.appendChild(forecast__weekly__title);
    forecast__weekly__title.innerHTML="Weekly Forecast"

    let forecast__weekly__cards = document.createElement('div');
    forecast__weekly__cards.classList.add('forecast__weekly__cards');
    forecast__weekly__cards.classList.add(cityName);
    forecast__weekly.appendChild(forecast__weekly__cards);
}

    //HOURLY CARDS
const hourlyCard = (hours, icon, futureDegree) =>{
    let hourly__card = document.createElement('div');
    hourly__card.classList.add('hourly__card');
    forecast__hourly__cards.appendChild(hourly__card);

    let hourly__card__time = document.createElement('time');
    hourly__card__time.classList.add('hourly__card__time');
    hourly__card.appendChild(hourly__card__time);
    hourly__card__time.innerText = hours;

    let hourly__card__icon = document.createElement('img');
    hourly__card__icon.classList.add('hourly__card__icon');
    hourly__card.appendChild(hourly__card__icon);
    hourly__card__icon.src= icon;

    let hourly__card__degree = document.createElement('p');
    hourly__card__degree.classList.add('hourly__card__degree');
    hourly__card.appendChild(hourly__card__degree);
    hourly__card__degree.innerHTML = futureDegree +"°C"
}

       //WEEKLY CARDS
const weeklyCard = (cityName, icon, day, weather, maxDegree, minDegree) => {
    let forecast__weekly__cards= document.getElementsByClassName(`forecast__weekly__cards ${cityName}`)[0]
    let weekly__card = document.createElement('div');
    weekly__card.classList.add('weekly__card');
    forecast__weekly__cards.appendChild(weekly__card);
    

    let weekly__card__icon = document.createElement('img');
    weekly__card__icon.classList.add('hourly__card__icon');
    weekly__card.appendChild(weekly__card__icon);
    weekly__card__icon.src= icon;

    let weekly__card__time = document.createElement('p');
    weekly__card__time.classList.add('weekly__card__time');
    weekly__card.appendChild(weekly__card__time);
    weekly__card__time.innerHTML = day;

    let weekly__card__weather = document.createElement('p');
    weekly__card__weather.classList.add('weekly__card__weather');
    weekly__card.appendChild(weekly__card__weather);
    weekly__card__weather.innerHTML = weather;

    // let weekly__card__maxDegree = document.createElement('p');
    // weekly__card__maxDegree.classList.add('weekly__card__maxDegree');
    // weekly__card.appendChild(weekly__card__maxDegree);
    // weekly__card__maxDegree.innerHTML = maxDegree;

    let weekly__card__minDegree = document.createElement('p');
    weekly__card__minDegree.classList.add('weekly__card__minDegree');
    weekly__card.appendChild(weekly__card__minDegree);
    weekly__card__minDegree.innerHTML = minDegree +"°C";
}
//CREATION OF CARDS -- END


//Getting HOURS in the format 00:00
const getHourTime = (unixSecond) =>{
let unix_timestamp = unixSecond;
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

var day= date.getDay();

// Will display time in 10:30:23 format
return formattedTime = hours + ':' + minutes.substr(-2);
}

// Display the weekDay
const getWeekDay = (unixSecond) =>{
    const weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    let unix_timestamp = unixSecond;
    let date = new Date(unix_timestamp * 1000);

    return weekDay = weekday[date.getDay()];
}

