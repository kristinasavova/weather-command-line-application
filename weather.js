const https = require ('https'); // require https module
const querystring = require ('querystring'); 
const api = require ('./api.json');

// Print out temp details
// Print out error message 

function get (query) {
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
        if (response.statusCode === 200) {
            let body = '';
            // Read the data
            response.on ('data', chunk => {
                body += chunk; 
            });
            response.on ('end', () => { 
                console.log (body);
                // Parse data
                // Print the data 
            });
        }
    }); 
}

module.exports.get = get;  

// Handle any errors 