//Global variable 
const submit = document.getElementById('search-button');
const GEONAMES_URL = 'http://api.geonames.org/searchJSON?q=';
const GEONAMES_USERNAME = '&maxRows=1&username=pa55ion';
const DARKSKY_URL = 'https://api.darksky.net/forecast/';
const PIXABAY_URL = 'https://pixabay.com/api/'

//COMMENT http://api.geonames.org/searchJSON?q=paris&username=pa55ion
//COMMENT https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${longitude},${latitude}?units=auto
export function handleSubmit(e) {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value
    console.log(location)
    console.log(date)
   

    getCityInfo(`${GEONAMES_URL}${location}${GEONAMES_USERNAME}`)
    .then(function(data) {
        postWeather('/weather', {
            location: location,
            // date: date;
            longitude: data.geonames[0].lng,
            latitude: data.geonames[0].lat,
            name: data.geonames[0].name,
        })
    }).then(function(data) {
        console.log(data)
        getCityInfo('/all')
    })
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
    const response = await fetch(url,{
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
        // updateUI(data);
      } catch (error) {
        console.log("error", error);
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

