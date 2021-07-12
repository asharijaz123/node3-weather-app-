const request = require('request')
const geocode = require('./geoCode')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=64acb01c78340fe55e91840b12ffe7ed&query=' + latitude + ',' + longitude + '&units=f';
    console.log(url)
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to Connect to Weather Service', undefined)
        } else if (body.error) {
            callback('Unable to find Location', undefined)

        } else {
            callback(undefined, "Conditions are  " + body.current.weather_descriptions[0] + '. It is is currently ' + body.current.temperature + " farehniet out there and it feels like " + body.current.feelslike +" The humidity today is  "+body.current.humidity);

        }

    })
}


module.exports = forecast