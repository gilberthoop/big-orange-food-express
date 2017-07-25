(function() {
    
    'user strict';
    
    angular
        .module('app')
        .controller('PaymentController', PaymentController);
        
        PaymentController.$inject = ['api', '$location'];
    
    function PaymentController(api, $location) {
        var self = this;
        
        self.submit = function() {
            self.showProgress = true; 
            
            // Process the order
            api.placeOrder(self.card)
                .then(function(response) {
                    if(response && response.success) {
                        return $location.url('/confirmation');
                    }
                    alert('Something went wrong.');
                });
            
            // Remove all saved data from sessionStorage
            sessionStorage.clear();
            
            return $location.url('/confirmation');
        };
    }
    
}());