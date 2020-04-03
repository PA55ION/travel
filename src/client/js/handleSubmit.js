//Global variable 
const submit = document.getElementById('search-button');
const GEONAMES_URL = 'http://api.geonames.org/searchJSON?q=';
const GEONAMES_USERNAME = '&maxRows=1&username=pa55ion';
const DARKSKY_URL = 'https://api.darksky.net/forecast/';
const PIXABAY_URL = 'https://pixabay.com/api/'

let post;
//COMMENT http://api.geonames.org/searchJSON?q=paris&username=pa55ion
//COMMENT https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${longitude},${latitude}?units=auto
export function handleSubmit(e) {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const departing = document.getElementById('date').value
    const date = new Date();
    const time = date.getTime();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    console.log(`${departing}T${hours}:${minutes}:${seconds}`)
    console.log(location)
    console.log(departing)
   
    getCityInfo(`${GEONAMES_URL}${location}${GEONAMES_USERNAME}`)
    .then(function(data) {
        post = data;
        fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                latitude: post.geonames[0].lat,
                longitude: post.geonames[0].lng,
                departing: `${departing}T${hours}:${minutes}:${seconds}`
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data)
        })
    })
    // .then(function(data) {
    //     postWeather('/weather', {
    //         location: location,
    //         // date: date;
    //         longitude: data.geonames[0].lng,
    //         latitude: data.geonames[0].lat,
    //         name: data.geonames[0].name,
    //     })
    // }).then(function(data) {
        
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
       body: JSON.stringify(data)
    })
       try {
        console.log("post response:", response);
        console.log(response);
       } catch (err) {
           console.log('err', err)
       }
}

//GET pixabay api
const getImage = async (url = '') => {
    const request = await fetch(url)

    try {
        const picData = await request.json();
        console.log(picData);
        return picData
    }
    catch(err) {
        console.log('err', err)
    }
}


function updateUI(data) {

}



submit.addEventListener('click', handleSubmit)

