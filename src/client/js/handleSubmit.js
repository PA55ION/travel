//Global variable 
const submit = document.getElementById('search-button');
const GEONAMES_URL = 'http://api.geonames.org/searchJSON?q=';
const GEONAMES_USERNAME = '&maxRows=1&username=pa55ion';
const PIXABAY_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
let location = document.getElementById('location').value;
let departure = document.getElementById('date').value;
const date = new Date();
const time = date.getTime();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
let leaving;
let post;
let cityName;
let countryName;
let dates;
let imgData;

const city = document.getElementById('city');
const leavingDate = document.getElementById('leaving-date')
const temp = document.getElementById('temp');



//COMMENT http://api.geonames.org/searchJSON?q=paris&username=pa55ion
//COMMENT https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${longitude},${latitude}?units=auto
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

    console.log(`${departure}T${hours}:${minutes}:${seconds}`)
    console.log(location)
    console.log(departure)
    leaving = `${departure}T${hours}:${minutes}:${seconds}`
    cityName = location;
    dates = departure;

   

   
    getCityInfo(`${GEONAMES_URL}${location}${GEONAMES_USERNAME}`)
    //COMMENT this one working find
    .then(function(data) {
        post = data;
        getCityInfo('/city', {
            locations: location,
            name: post.geonames[0].name,
            latitude: post.geonames[0].lat,
            longitude: post.geonames[0].lng,
        })
    })
    .then(function(data) {
       console.log('response: ', post)
       postWeather('/weather', {

       })
    }).then(function(data) {
        getImage('/img', {

        })
    })
    // .then(function(data) {
    //     getCityInfo('/all');
    // })
}

//GET geonames info
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

//POST Darksky api
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
        date: dates,
       })
    // body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
        console.log("post response:", data)
        console.log(data);
        updateUI(data)
    }).catch(err => {
        console.log('err', err)
    })
}

//GET pixabay api
const getImage = async (url = '', pixabayData = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cityName: cityName
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
    //  .catch(err => {
    //      console.log('err', err)
    //  })
 }



function updateUI(data) {
   temp.innerHTML = data.temperature;
   city.innerHTML = cityName;
   leavingDate.innerHTML = dates;


   console.log('img:', imgData)
    console.log(data.temperature)
    console.log(cityName)
  
}

let pics = document.getElementById('img');

function updateImg(imgData) {
    console.log(imgData.hits[0].id)
    pics.innerHTML = imgData.hits[0].pageURL
}



submit.addEventListener('click', handleSubmit)

