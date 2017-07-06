var zomato = require("zomato");
var config = require("../config");

// Create a client
var client = zomato.createClient({
    userKey: '254204de027f7c3f65fca58fd218d4eb'
});


// Get Foodie and Nightlife Index, 
// list of popular cuisines and nearby restaurants around the given coordinates
exports.getRestaurants = function(next) { 
    client.getGeocode({lat: "49.2827", lon: "-123.1207"}, function(err, result) { 
        if(err) {
            return next(err);
        }
        // Pass the result when no errors
        next(null, result);
    });
}; 