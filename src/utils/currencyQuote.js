const request = require('request')
const currencies = "CAD"
const baseURI = "https://api.apilayer.com/currency_data/live"

const currencyQuote = (source, callback) => {
    const url = baseURI + '?base' + source + "&currencies=" + currencies
//    console.log(url)
    const options = {
        url: url,
        headers: {
            "apikey": "6LgZ9bNTzADD1YeSrtBoK5Vv1QiZoBG5",
            json: true
        }
    };
    request(options, (error, { body }) => {
        //console.log("in request")
        if (error) {
            callback('Unable to connect to currency service', undefined)
        }
        else if (body.error) {
            console.log(response.body.error)
            callback("Unable to load quote", undefined)
        }
        else {
            callback(undefined, body )
        }
    })
}

module.exports = currencyQuote 