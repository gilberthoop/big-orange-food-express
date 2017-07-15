(function() {
    
    'user strict';
    
    angular
        .module('app')
        .controller('MenuController', MenuController);
        
    MenuController.$inject = ['api', '$routeParams'];
    
    function MenuController(api, $routeParams) {
        var self = this;
        
        api.getRestaurantMenu($routeParams.restKey)
            .then(function(data) {
                self.restaurant = data;
            });
    }
    
}());