const long = document.querySelector('#longitude')
const lat = document.querySelector('#latitude')

// Initialize map and marker
const mymap = L.map('mapid').setView([0, 0], 2)
const satelliteIcon = L.icon({
    iconUrl: '../img/satellite.png',
    iconSize: [30,30]
})
const marker = L.marker([0, 0], {icon: satelliteIcon}).addTo(mymap)

// Setup map tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(mymap)

// Map update function
function issLocation() {
    fetch('/iss').then((res) => {
        res.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                long.textContent = data.location.longitude
                lat.textContent = data.location.latitude
                mymap.setView([data.location.latitude, data.location.longitude], 2)
                marker.setLatLng([data.location.latitude, data.location.longitude])
            }
        })
    })
}

// Update map on page load
window.addEventListener('load', (e) => {
    issLocation()
})

// Update map every 10 seconds
setInterval(() => {
    issLocation()
}, 10000)

