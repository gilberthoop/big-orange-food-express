(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('RestaurantsController', RestaurantsController);
     
    RestaurantsController.$inject = ['api'];   
    
    function RestaurantsController(api) {
        var self = this;
        
        api.getRestaurants()
            .then(function(data) {
                self.restaurants = data;
            }); 
        
        
        
        /* Before using factory
        
        $http.get('/orders/api/restaurants')
            .then(function(response) {
                self.restaurants = response.data; 
            },
            function(reason) {
                console.log(reason);
            })
            .catch(function(err) {
                console.log(err);
            });
        */
    } 
}());