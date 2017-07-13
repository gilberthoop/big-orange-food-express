(function() {
    
    'user strict';
    
    var USER_KEY = "254204de027f7c3f65fca58fd218d4eb";
    var URL = "https://developers.zomato.com/api/v2.1/geocode?";
    
    angular
        .module('app')
        .factory('api', apiFactory);
        
    apiFactory.$inject = ['$http'];
    
    function apiFactory($http) {
        return {
            getRestaurants: getRestaurants()
        };
        
        function getRestaurants() {
            return $http({
                method: 'GET',
                url: URL,
                headers: {'user-key' : USER_KEY},
                params: {
                    lat: '49.2828', 
                    lon: '-123.1067',
                } 
            })
            .then(function(response) {
                return response.data;
            });
        }
        
    }
    
})