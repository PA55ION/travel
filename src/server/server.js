//COMMENT express to run server and route
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


//COMMENT start up instance of app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//COMMENT Middle ware
app.use(cors());
app.use(express.static('dist'));
console.log(__dirname)

//COMMENT spin up the server
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

