(function() {

    'user strict';

    angular
        .module('app')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['api', '$routeParams', 'ngDialog', '$scope', '$location', '$mdDialog'];

    function MenuController(api, $routeParams, ngDialog, $scope, $location, $mdDialog) {
 
        var self = this;
        self.items = [];
        self.total = 0;


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

            if (index > -1) {
                self.activeItem.options.splice(index, 1);
                return;
            }

            self.activeItem.options.push(option);
        };


        self.addItem = function(item) {
            var newItem = {
                id: item.apiKey,
                name: item.name,
                price: item.basePrice
            };

            if (item.options.length > 0) {
                newItem.options = item.options.map(function(item) {
                    return {
                        id: item.apiKey,
                        name: item.name,
                        price: item.basePrice
                    };
                });
            }

            self.items.push(newItem);
            ngDialog.close(); 
            console.log(self.items);
            
            // Update total price of items
            for (var i = 0; i < self.items.length; i++) {
                self.total += self.items[i].price;
            }
        }


        self.cancel = function() {
            ngDialog.close();
        }


        self.checkOut = function() {
            var orderOk = false;
            
            // Pop up a confirm dialog for the total price upon check out 
            if (confirm("Your total is: $" + self.total +". Proceed to payment?") == true) {
                orderOk = true;
            } else {
                alert("Order cancelled.");
            } 
            
            var food = {
                restId: $routeParams.restKey,
                items: self.items
            };

            api.createOrder(food)
                .then(function(data) {
                    if (data.success && orderOk) {
                        return $location.url('/payment');
                        console.log('success');
                    }  
                    console.log('fail');
                }); 
        };


        $scope.showConfirm = function(ev) { 
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Confirm order?')  
                .textContent('Your total is ' + self.total)
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Confirm')
                .cancel('Cancel'); 
            
            $mdDialog.show(confirm); 
        };
    }

}());
