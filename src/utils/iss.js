const fetch = require('node-fetch')

const issLocation = (callback) => {
    const url = 'http://api.open-notify.org/iss-now.json'

    fetch(url).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                callback('Unalbe to connect to the ISS location server!', undefined)
            } else {
                const myLocation = {
                    longitude: data.iss_position.longitude,
                    latitude: data.iss_position.latitude
                }
                callback(undefined, myLocation)
                // long.textContent = data.iss_position.longitude
                // lat.textContent = data.iss_position.latitude
                // mymap.setView([data.iss_position.latitude, data.iss_position.longitude], 2)
                // marker.setLatLng([data.iss_position.latitude, data.iss_position.longitude])
            }
        })
    })
}

module.exports = issLocation