var zomato = require("zomato");
var config = require("../config");

// Create a client
var client = zomato.createClient({
    userKey: '254204de027f7c3f  65fca58fd218d4eb'
});


// Get Foodie and Nightlife Index, 
// list of popular cuisines and nearby restaurants around the given coordinates
exports.getRestaurants = function(next) { 
    client.getGeocode({lat: "49.2828", lon: "-123.1067"}, function(err, result) { 
        if(err) {
            return next(err);
        }
        // Pass the result when no errors
        next(null, result);
    });
}; 


// Get the menu of a restaurant
exports.getMenu = function(next) {
    client.dailyMenu({ res_id:"16774318" }, function(err, result) {
        if(err) {
            return next(err);
        }
        // Pass the result when no errors
        next(null, result);
    });
};



/*
var USER_KEY = "254204de027f7c3f65fca58fd218d4eb";
var URL = "https://developers.zomato.com/api/v2.1";
///geocode?";
var latitude = "49.2828";
var longitude = "-123.1067";
*/

/*var callAPI = function(resource, args, callback) {
    var options = {
        method: 'GET',
        url: URL + resource,
        headers: { 'user-key': USER_KEY },
        params: args
    };
    request(options, function(error, response, body) {
        callback(error, response);
    });
};*/


/* Location Specific APIs
exports.getGastownRestaurants = function(next) {
    client.getGeocode(latitude, longitude, function(err, result) {
        if(err) {
            return next(err);
        }
        callAPI('/geocode', {lat:latitude, lon:longitude}, callback);
        next(null, result);
    });
};*/
