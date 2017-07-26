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

            self.items.push(newItem);
            ngDialog.close();

            // Store the item in the session storage
            sessionStorage.savedOrders = JSON.stringify(self.items);

            var price = 0;
            // Update total price of items
            for (var i = 0; i < self.items.length; i++) {
                price += self.items[i].price;
            }
            self.total = Math.round(price * 100) / 100;
        }

        if (sessionStorage.savedOrders != null) {
            // Convert string to object format of session storage containing the orders
            var ordersObject = JSON.parse(sessionStorage.savedOrders);
            
            // If order array is not empty, display previous orders for reference in a list
            if (ordersObject.length > 0) {
                for (var i = 0; i < ordersObject.length; i++) {
                    document.getElementById("prevOrders").innerHTML +=
                        '<li><strong>' + ordersObject[i].name + ":</strong> $" + ordersObject[i].price || '   ' + '<li>';
                }
            }
        }


        self.cancel = function() {
            ngDialog.close();
        }


        self.checkOut = function() {

            var food = {
                restId: $routeParams.restKey,
                items: self.items
            };

            // Pop up a confirm dialog for the total price upon check out 
            if (confirm("Your total is: $" + self.total + ". Proceed to payment?") == true) {
                /*
                    If the order is confirmed,
                        create the order
                        add the order to the database
                        proceed to the payment view
                */
                api.createOrder(food)
                    .then(function(data) {
                        if (data.success) {
                            return $location.url('/payment');
                            console.log('success');
                        }
                        console.log('fail');
                    });
            }
            else {
                // Else alert the user and do nothing
                alert("Order cancelled.");
            }

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
