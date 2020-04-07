const https = require ('https'); // require https module
const http = require ('http'); // require http module
const querystring = require ('querystring'); 
const api = require ('./api.json');

// Print out temp details
function printWeather (weather) {
    const message = `Current temperature in ${weather.name} is ${weather.main.temp}°C`;
    console.log (message); 
}
// Print out error message 
function printError (error) {
    console.error (error.message); 
}

function get (query) {
    try { // check if the URL is not malformed 
        const parameters = {
            APPID: api.key, 
            units: 'metric'  
        };
        const zipCode = parseInt (query);
        if (!isNaN(zipCode)) {
            parameters.zip = zipCode + ',us'; 
        } else {
            parameters.q = query + ',us'; 
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`; 
        console.log (url); 

        // Connect to the API URL 
        const request = https.get (url, response => {
            if (response.statusCode === 200) { // check if the response from server is okay
                let body = '';
                // Read the data
                response.on ('data', chunk => {
                    body += chunk; 
                });
                response.on ('end', () => { 
                    try { // catch any errors by the json parser 
                        // Parse data
                        const weather = JSON.parse (body);
                        // Print the data 
                        printWeather (weather); 
                    } catch (error) {
                        printError (error);
                    }
                });
            } else { // if the response from server is not okay 
                const statusErrorCode = new Error (`There was an error getting the message for '${query}'. (${http.STATUS_CODES[response.statusCode]})`); 
                printError (statusErrorCode);                
            }
        }); 
    } catch (error) { // if the URL is malformed 
        printError (error);
    }
}

module.exports.get = get;  
 