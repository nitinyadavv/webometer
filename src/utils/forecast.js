const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=06a2fff4c7c74f8ffe4554f9a48a3aa8&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Can not Connect to Weather Service', undefined)
        } else if (response.body.error) {
            callback('Unable to find Weather', undefined)
        } else {
            callback(undefined, ' Local Time: ' + response.body.location.localtime + ', Temprature: ' + response.body.current.temperature + ' Fahrenheit' + ', Weather-Description: ' + response.body.current.weather_descriptions[0] +
                ', CloudCover: ' + response.body.current.cloudcover + '%' +
                ', Visibility: ' + response.body.current.visibility + 'km')
        }
    })
}

module.exports = forecast