const path = require('path')
const express = require('express')
const hbs = require('hbs')
const iss = require('./utils/iss')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'ISS Locator',
        name: 'Peter Wolff'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Peter Wolff'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Peter Wolff'
    })
})

app.get('/iss', (req, res) => {
    iss((error, location) => {
        if(error) {
            return res.send({ error })
        }

        res.send({
            location
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Peter Wolff',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})