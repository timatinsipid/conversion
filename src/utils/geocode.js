const request = require('request')
const mapboxAPIKey='pk.eyJ1IjoidGRqbWFwYm94IiwiYSI6ImNreGNlM3pvejNwazMydXBubTQ1NnM3eGIifQ.uomxqSeBX3-mNQHrAkIvPA'
const mapboxBaseURI = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapboxResults = '&limit=1'

const geocode = (address,callback)=>{
    const url = mapboxBaseURI + encodeURIComponent(address) +'.json?access_token='+mapboxAPIKey+mapboxResults
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services', undefined)
        } else if (body.features.length===0){
            callback('unable to find location',undefined)
        }
        else
        {
            callback(undefined,{
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name                })
        }
    })
}
module.exports = geocode