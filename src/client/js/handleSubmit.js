//Global variable 
const submit = document.getElementById('search-button');
const GEONAMES_URL = 'http://api.geonames.org/searchJSON?q=';
const GEONAMES_USERNAME = '&maxRows=1&username=pa55ion';
const PIXABAY_API_KEY = '15817547-0820fe2163586163356300c93'
const PIXABAY_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=`;
let restCountry = 'https://restcountries.eu/rest/v2/capital/'

//COMMENT this variable will store multible varialble such as date, minutes, hours, and seconds to use it in Darksky API in postWather
let leaving;
//COMMENT post variable will store data from geoname api
let post;
//COMMENT city name variable will store geoname city to pass into getImage
let cityName;
let countryName;
let dates;

//COMMENT this will store data from Pixabay API
let imgData;

const city = document.getElementById('city');
const leavingDate = document.getElementById('leaving-date')
const temp = document.getElementById('temp');
// const searchBox = new google.maps.places.SearchBox(location)



export function handleSubmit(e) {
    e.preventDefault();
    let location = document.getElementById('location').value;
    let departure = document.getElementById('date').value;
    let countdownDate = new Date(document.getElementById('date').value).getTime();
    let date = new Date();
    let time = date.getTime();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();    

    //Add 0 to time if a digit is a single digit to use it in darksky api
    if(hours < 10) {
        hours = "0" + hours;
    } 
    if(seconds < 10) { 
        seconds = "0" + seconds;
    } 
    if(minutes < 10) {
        minutes = "0" + minutes;
    } 

    leaving = `${departure}T${hours}:${minutes}:${seconds}`
    cityName = location;
    // dates = departure;
    let days = Client.countdown(countdownDate)
   
    dates = departure;
  
    getCityInfo(`${GEONAMES_URL}${location}${GEONAMES_USERNAME}`)
    .then(function(data) {
        post = data;
            getCityInfo('http://localhost:3000/city', {
                locations: location,
                name: post.geonames[0].name,
                latitude: post.geonames[0].lat,
                longitude: post.geonames[0].lng,
            })
    }).then(function(data) {
        postWeather('http://localhost:3000/weather', {
        })
    }).then(function(data) {
        getImage('http://localhost:3000/img', {
        })
    })

    document.getElementById('travel-info').innerHTML = `Your trip to ${cityName} is ${days} days away. It's time to Pack you bag :)`

    fetch(`${restCountry}${cityName}`)
    .then(res => res.json())
    .then(function(res) {
        console.log(res);
        document.getElementById('currencies').innerHTML = 'Currency: ' + res[0].currencies[0].name;
        document.getElementById('population').innerHTML = 'Population: ' + res[0].population.toLocaleString('en-US')
        document.getElementById('language').innerHTML = 'Language: ' + res[0].languages[0].name
    })
}


//GET geonames info to get city name, longitude and latitude
const getCityInfo = async (url = '') => {
    const request = await fetch(url)
 
   try {
       const data = await request.json();
       console.log("Get Response: ", data )
       return data;
   }
   catch (error) {
       console.log('error', error)
   }
};

// POST: Darksky api to get weather
const postWeather = async (url = '', data = {}) => {
   const response = await fetch(url, {
       method: 'POST',
       credentials: 'same-origin',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        latitude: post.geonames[0].lat,
        longitude: post.geonames[0].lng,
        departure: leaving,
        cityName: post.geonames [0].name,
       
       })
    }).then(res => res.json())
    .then(data => {
        console.log("post response:", data)
        console.log(data);
        updateUI(data)
    }).catch(err => {
        console.log('err', err)
    })
}

// POST pixabay api
const getImage = async (url = '', pixabayData = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // cityName: cityName
            cityName: post.geonames[0].name,
        })
     }).then(res => res.json())
     .then(pixabayData => {
         imgData = pixabayData
         console.log("pixabay response:", imgData)
         console.log('picture:', imgData.hits[0].pageURL);
         updateImg(imgData)
     })
 }


//COMMENT update ui screen
let travel = document.getElementById('travel-info')
let weather = document.getElementById('weather')
let container = document.getElementById('container');
let summary = document.getElementById('summary');

function updateUI(data) {
   temp.innerHTML = `Typical weather for this day is ${data.temperature}`;
   city.innerHTML = cityName;
   leavingDate.innerHTML = `Departure date: ${dates}`;
   summary.innerHTML = `Weather condition is ${data.summary}`;
//    travel.innerHTML = cityInfo
    console.log(data.temperature)
    console.log(data.summary)
    console.log(cityName)
    let animation = document.getElementById('parent');
    animation.classList.add('animation')
    let background = document.getElementById('hero-image');
    background.classList.add('filter');
}

let type = document.getElementById('types')
let tags = document.getElementById('tags')
let likes = document.getElementById('likes')

function updateImg(imgData) {
    console.log(imgData.hits[0].id)
    const img = document.getElementById('imgContainer')
    let newImg = document.createElement('IMG')
    newImg.setAttribute('src', imgData.hits[0].largeImageURL)
    newImg.setAttribute('id', 'img')
    img.appendChild(newImg)

    

   type.innerHTML = `<span id="likes" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">${imgData.hits[0].type}</span>`;
   tags.innerHTML = `<span id="likes" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">${imgData.hits[0].tags}</span>`;
   likes.innerHTML =  `<span id="likes" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">${imgData.hits[0].likes}</span>`;
}

// function myFunction() {
//     let animation = document.getElementById('parent');
//     animation.classList.add('animation')
//  }


submit.addEventListener('click', handleSubmit);




