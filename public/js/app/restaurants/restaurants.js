(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('RestaurantsController', RestaurantsController);
     
    RestaurantsController.$inject = ['$http'];   
    
    function RestaurantsController($http) {
        var self = this;
        
        var USER_KEY = "254204de027f7c3f65fca58fd218d4eb";
        var URL = "https://developers.zomato.com/api/v2.1/geocode?";
        
        //$http.get('/orders/api/restaurants')    
        
        $http({
                method: 'GET',
                url: URL,
                headers: {'user-key' : USER_KEY},
                params: {
                    lat: '49.2828', 
                    lon: '-123.1067',
                } 
            })
            .then(function(response) {     
                self.restaurants = response.data; 
            },
            function(reason) {
                console.log(reason);
            })
            .catch(function(err) {
                console.log(err);
            })
    } 
}());