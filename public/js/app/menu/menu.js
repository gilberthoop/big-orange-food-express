(function() {
    
    'user strict';
    
    angular
        .module('app')
        .controller('MenuController', MenuController);
        
    MenuController.$inject = ['api', '$routeParams', 'ngDialog', '$scope', '$location'];
    
    function MenuController(api, $routeParams, ngDialog, $scope, $location) {
        var self = this;
        
        self.items = [];
        
        api.getRestaurantMenu($routeParams.restKey)
            .then(function(data) {
                self.restaurant = data;
            });
            
            
        self.viewItem = function(item) {
            self.activeItem = item;
            self.activeItem.options = [];
            
            ngDialog.open({
                templateUrl: 'item.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        }
        
        self.toggleOption = function(option) {
            var index = self.activeItem.options.indexOf(option);
            
            if(index > -1) {
                self.activeItem.options.splice(index, 1);
                return;
            }
            
            self.activeItem.options.push(option);
        };
        
        self.addItem = function(item) {
            var newItem = {
                id: item.id,
                name: item.name,
                price: item.price
            };
            
            if(item.options.length > 0) {
                newItem.options = item.options.map(function(item) {
                    return {id: item.id, name: item.name, price: item.price};
                });
            }
            
            self.items.push(newItem);
            ngDialog.close();
            console.log(self.items);
        }
        
        self.cancel = function() {
            ngDialog.close();
        }
        
        self.checkOut = function() {
            $location.url('/payment');
        }
    }
    
}());