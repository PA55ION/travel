let projectData = {}

if(process.env.NODE_ENV !== 'production') {
    require ('dotenv').config()
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;


//COMMENT express to run server and route
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');


//COMMENT start up instance of app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//COMMENT Middle ware
app.use(cors());
app.use(express.static('dist'));

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
   
});

app.get('/all', (req, res) => {
    res.send(projectData)
});

app.post('/weather', (req, res) => {
    const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude},${req.body.departure}`
    const cityName = `${req.body.cityName}`
    const dates = `${req.body.departure}`

    axios({
        url: url,
        responseType: 'json'
      }).then(data => res.json(data.data.currently))
      .catch(error => {
          console.log('error', error)
      })
    
    projectData = req.body;
    console.log("post request: received");
    console.log(projectData);
    // res.send('post received');

    console.log(req.body)
});

app.post('/img', (req, res) => {
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${req.body.cityName}&image_type=photo`;
    

    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data))
    .catch(err => {
        console.log('err', err)
    })
    projectData = req.body;
    console.log("pixabay request: received");
    console.log(projectData);
    console.log(req.body)
})
app.get('/city', (req, res) => {
    res.send(projectData);
})


module.exports = app;