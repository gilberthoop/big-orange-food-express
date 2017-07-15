(function() {
    
    'user strict';
    
    angular
        .module('app')
        .factory('api', apiFactory);
        
    apiFactory.$inject = ['$http'];
    
    function apiFactory($http) {
        return {
            getRestaurants: getRestaurants,
            getRestaurantMenu: getRestaurantMenu
        };
        
        function getRestaurants() {
            return $http.get('/orders/api/restaurants')
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getRestaurantMenu(restKey) {
            return $http.get('/orders/api/restaurant-menu/' + restKey)
                .then(function(response) {
                    return response.data;
                });
        }
    }
    
}());