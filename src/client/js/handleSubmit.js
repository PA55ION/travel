//Global variable 
const submit = document.getElementById('search-button');
const GEONAMES_URL = 'http://api.geonames.org/searchJSON?q=';
const GEONAMES_USERNAME = '&maxRows=1&username=pa55ion';
// const PIXABAY_URL = 'https://pixabay.com/api/';
// const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
let location = document.getElementById('location').value;
let departure = new Date(document.getElementById('date').value).getTime();
const date = new Date();
const time = date.getTime();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

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
    let date = new Date();
    let time = date.getTime();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if(hours < 10) {
        hours = "0" + hours;
    } 
    if(seconds < 10) { 
        seconds = "0" + seconds;
    } 
    if(minutes < 10) {
        minutes = "0" + minutes;
    } 

    console.log(`${hours}:${minutes}:${seconds}`)
    console.log(location)
    console.log(departure)
    leaving = `${departure}T${hours}:${minutes}:${seconds}`
    cityName = location;
    // dates = departure;

    const days = Client.countdown(departure);
    document.getElementById('days').innerHTML = cityName + ',' + ' is ' + days + ' days away'
    console.log(days)
   

  
    getCityInfo(`${GEONAMES_URL}${location}${GEONAMES_USERNAME}`)
    .then(function(data) {
        post = data;
            getCityInfo('http://localhost:8000/city', {
                locations: location,
                name: post.geonames[0].name,
                latitude: post.geonames[0].lat,
                longitude: post.geonames[0].lng,
            })
    }).then(function(data) {
        postWeather('http://localhost:8000/weather', {
        })
    }).then(function(data) {
        getImage('http://localhost:8000/img')
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
        // date: dates,
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
    //  body: JSON.stringify(data)
     }).then(res => res.json())
     .then(pixabayData => {
         imgData = pixabayData
         console.log("pixabay response:", imgData)
        //  console.log('pix:', pixabayData.hits[0].id);
         console.log('picture:', imgData.hits[0].pageURL);
         updateImg(imgData)
     })
 }


//COMMENT update ui screen
let travel = document.getElementById('travel-info')

function updateUI(data) {
   temp.innerHTML = data.temperature;
   city.innerHTML = cityName;
   leavingDate.innerHTML = dates;
//    travel.innerHTML = cityInfo
    console.log(data.temperature)
    console.log(cityName)


    
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
    // img.innerHTML = `<img class="w-full" id='img' src="${imgData.hits[0].largeImageURL}" alt="Sunset in the mountains">`
   type.innerHTML = imgData.hits[0].type;
   tags.innerHTML = imgData.hits[0].tags;
   likes.innerHTML = imgData.hits[0].likes;
}


submit.addEventListener('click', handleSubmit)



