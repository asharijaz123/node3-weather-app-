const request = require('request')

const geocode = (address, callback) => {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNoYXJuZXRzb2wiLCJhIjoiY2txcDUweWVuMHI0bjJvczVnZjUwaHFybiJ9.YIoYjs8pYADQEM3mQVXxow';

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            //undeefined is the value of secind argument in callback
            callback('Unable to Connect to Map Api', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to Find the Location,Try another search', undefined)
        } else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })

}

module.exports=geocode