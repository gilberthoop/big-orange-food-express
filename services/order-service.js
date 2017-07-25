var config = require("../config");
var EatStreet = require("eatstreet");
var Order = require("../model/Order").Order;

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


exports.createOrder = function(user, food, next) {
    this.order = new Order({
        user: user,
        food: food
    });
    
    this.order.save(function(err, savedOrder) {
        if(!err) {
            return next(null, savedOrder._id);
        }
        next(err);
    });
};


exports.clearOrder = function(order_id) {
    this.order.find({id:order_id}).remove().exec();
};


exports.prepareTray = function(items) {
    var tray = [];
    
    for(var i=0; i<items.length; i++) {
        var trayItem = items[i].apiKey + '/1';
        tray.push(trayItem);
    }
    
    return tray.join('+');
};


exports.placeOrder = function(order_id, card, next) {
    var self = this;
    
    Order.findOne({_id: order_id}, function(err, order) {
        if(err) {
            console.log(err);
            return next(err);
        }
        var args = {
            rid: order.food.restId,
            em: order.user.email,
            tray: self.prepareTray(order.food.items),
            first_name: order.user.firstName,
            last_name: order.user.lastName,
        };
        console.log('Delivery on the way!');
    });
};