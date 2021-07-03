const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=06a2fff4c7c74f8ffe4554f9a48a3aa8&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Can not Connect to Weather Service', undefined)
        } else if (response.body.error) {
            callback('Unable to find Weather', undefined)
        } else {
            callback(undefined, "Date and Time: " + response.body.location.localtime + ".\n" +
                "It is currently " + response.body.current.temperature + " degree.\n It feels like " +
                +response.body.current.feelslike + " degree.\n And Probability of rain is " + response.body.current.precip + "%.\n Weather Description is " + response.body.current.weather_descriptions[0] + ".\n" + response.body.current.cloudcover + "% sky is cloud-covered." +
                " Visibility is " + response.body.current.visibility + "km.")
        }
    })
}

module.exports = forecast