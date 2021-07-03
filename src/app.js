const path = require('path')
const express = require('express')
    //Mustache handle bar
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//making port dynamic for heroku and if it is not avail then use 300
const port = process.env.PORT || 3000

//define paths for Express Config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup View Engine 
app.set('view engine', 'hbs');

//setup locations
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dictionary to serve.
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
    })
})

//Making some keys(search bars) for the website
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is Help Page.',
        title: 'Help',
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You Must provide an address.'
        })
    }


    //Working on geocode and forecast
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

//Error handling
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help is not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.'
    })
})

//Server listening
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})