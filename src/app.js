const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getGeoCode = require('./utils/geocode');
const forecastWeather = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3200

// Define path for express config
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicPathDirectory = path.join(__dirname, '../public');

// Set public folder
app.use(express.static(publicPathDirectory));

//Setup handlebars engine and view location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
    res.render('index',{
       title : 'D - Weather App',
       heading : 'Welcome to weather app'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'Weather App - Help',
        heading : 'Welcome to weather app - Help page'
     });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address!'
        });
    }
    getGeoCode(req.query.address,(error, { latitude, longitude, location } = {}) => {
        // Setting error msg and stop the function
        if(error){
            return res.send({error}) // For best use case I have used the same name for key and value 
        } 
        // If there no error in Geocoding, Then getting weather details dynamically
        forecastWeather(latitude+'',longitude+'',(error,forecastdata) => {
            if(error){
                return res.send({error}); // For best use case I have used the same name for key and value
            }
            res.send({
                forecast : forecastdata,
                location,
                address : req.query.address
            });
        });
    }); 
});

app.listen(port ,()=>{
    console.log('Server is up on the port' + port);
});
