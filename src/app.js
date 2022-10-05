const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')

const app = express()

//define paths for express config
const publicDirectory = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup root static directory 
app.use(express.static(publicDirectory))

//setup routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tim'
    })
})

app.get('/about', (req, res) => {
    res.render('about',
        {
            title: 'About',
            name: 'Tim'
        })
})

app.get('/help', (req, res) => {
    res.render('help',
        {
            title: 'Help',
            message: 'This is the help message',
            name: 'Tim'
        })
})
 
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'you must provide an address' })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }= {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if (error)
            {
                return res.send({ error })
            }
            return res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })

            })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'you must provide a search term' })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',
        {
            title: '404',
            errorMessage: 'Help article not found',
            name: 'Tim'
        })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })

})

app.get('*', (req, res) => {
    res.render('404',
        {
            title: '404',
            errorMessage: 'Page not found',
            name: 'Tim'
        })

})

//start the server listening on tcp 3000
app.listen(3000, () => {
    console.log('Server Running')
})