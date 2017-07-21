var express = require('express'); 
var router = express.Router();
var restrict = require("../auth/restrict");
var orderService = require("../services/order-service"); 

router.get('/', restrict, function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/');
    }
    
    var vm = { 
        title: 'Place an order.', 
        orderId: req.session.orderId,
        items: req.session.items,
        firstName: req.user ? req.user.firstName : null
    }
    res.render('orders/index', vm);
});  

router.get('/api/restaurants', restrict, function(req, res, next) {
    orderService.getRestaurants(function(err, restaurants) {
        if(err) {
            return res.status(500).json({error:'Failed to retrieve restaurants.'});
        }
        res.json(restaurants);
    }); 
}); 

router.get('/api/restaurant-menu/:restKey', function(req, res, next) {
    orderService.getRestaurantMenu(req.params.restKey, function(err, menu) {
        if(err) {
            return res.status(500).json({error:'Failed to retrieve restaurant menu'});
        }
        res.json(menu);
    });
});

router.post('/api/create-order', restrict, function(req, res, next) {
    orderService.createOrder(req.user._doc, req.body, function(err, orderId) {
        if(err) {
            return res.status(500).json({ error: 'Failed to create order' });
        }
        
        req.session.order_id = orderId;
        res.json({ success: true });
    });
    
        console.log("order created")
});

router.post('/api/place-order', restrict, function(req, res, next) {
    orderService.placeOrder(req.session.order_id, req.body, function(err, res) {
        if(err) {
            return res.status(500).json({ error: 'Failed to place order' });
        }
        res.json(res);
    });
});

module.exports = router;