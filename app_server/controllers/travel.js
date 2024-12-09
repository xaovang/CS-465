const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* GET travel view */
const travel = async function (req, res, next) {
    // console.log('TRAVEL CONTROLLER BEGIN');
    let message = null;

    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            // console.log(json);
            
            // Handle condition where the response is not an array
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = []; // Default to an empty array
            } else if (!json.length) {
                // Handle condition where the array has no data
                message = 'No trips exist in our database!';
            }

            // Render the view with the trips and message
            res.render('travel', { title: 'Travlr Getaways', trips: json, message });
        })
        .catch(err => res.status(500).send(err.message));
    // console.log('TRAVEL CONTROLLER AFTER RENDER');
};

module.exports = {
    travel
};
