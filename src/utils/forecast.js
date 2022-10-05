const request = require('request')
const weatherStackAPIKey = "30d69475aa266ec8f3db7172842be92e"
const weatherStackBaseURI = "http://api.weatherstack.com/current"

const units = "&units=m"


const forecast = (lat, long, callback) => {
    const location=long+','+lat
    const url = weatherStackBaseURI+'?access_key='+weatherStackAPIKey+'&query='+location+units
    // console.log(weatherStackUrl)
    request({url, json:true},(error,{body})=>{
        if (error){
            callback('Unable to connect to weather service',undefined)
        }
        else if(body.error){
            // console.log(response.body.error)
            callback("Unable to load weather",undefined)
        }
        else
        {
        callback(undefined,body.current.weather_descriptions[0] + '- It is currently ' + body.current.temperature +'C and it feels like ' + body.current.feelslike +'C')
       }
    })
}


 module.exports = forecast