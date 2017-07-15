var zomato = require("zomato");
var config = require("../config");
var EatStreet = require("eatstreet");

var ES = new EatStreet("4721fc0b973460d9");
var restParams = { 'address': 'Los Angeles, CA' };
var menuParams = { 'apiKey': '90fd4587554469b1f15b4f2e73e761809f4b4bcca52eedca' };

/*
 Link to the eatstreet API: 
 https://www.npmjs.com/package/eatstreet
*/

exports.getRestaurants = function(next) {
    ES.SearchRestaurants(restParams, function(err, res) {
        if(err) {
            return next(err);
        }
        
        next(null, res);
    });
}

exports.getRestaurantMenu = function(resKey, next) {
    ES.RestaurantMenu({apiKey: resKey}, function(err, res) {
        if(err) {
            console.log(err);
        } 
        
        next(null, res);
    });  
}


