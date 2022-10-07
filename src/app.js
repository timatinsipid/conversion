const path = require('path')
const express = require('express')
const hbs = require('hbs')
const currencyQuote = require('./utils/currencyQuote')


const app = express()
const port = process.env.PORT || 3000

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
        title: 'Conversion App',
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

app.get('/quote', (req, res) => {
    if (!req.query.amount) {
        return res.send({ error: 'you must provide an amount' })
    }
    currencyQuote("USD", (error, body) => {
        if (error) {
            console.log("in error block")
            return res.send({ error })
        }
        console.log(body)
        return res.send(body)
    })

})

app.get('/quotetest', (req, res) => {
    if (!req.query.amount) {
        return res.send({ error: 'you must provide an amount' })
    }
    let body = {
        "success": true,
        "timestamp": 1665164764,
        "source": "USD",
        "quotes": {
            "USDCAD": 1.37118
        }
    }
    console.log(body)
    return res.send(body)
})


app.get('/help/*', (req, res) => {
    res.render('404',
        {
            title: '404',
            errorMessage: 'Help article not found',
            name: 'Tim'
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
app.listen(port, () => {
    console.log('Server Running on ' + port)
})