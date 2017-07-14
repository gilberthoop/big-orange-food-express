var zomato = require("zomato");
var config = require("../config");
var EatStreet = require("eatstreet");

var ES = new EatStreet("4721fc0b973460d9");
var params = { 'address': 'Los Angeles, CA' };

/*
 Link to the eatstreet API: 
 https://www.npmjs.com/package/eatstreet
*/

exports.getRestaurants = function(next) {
    ES.SearchRestaurants(params, function(err, result) {
        if(err) {
            return next(err);
        }
        // Pass result when no errors
        next(null, result);
    })
}


