(function() {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngDialog'])
        .config(config)

    config.$inject = ['$routeProvider', '$locationProvider'];
    
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/restaurants', {
                templateUrl: '/js/app/restaurants/restaurants.html',
                controller: 'RestaurantsController',
                controllerAs: 'restCtrl'
            })
            .when('/menu/:restKey', {
                templateUrl: '/js/app/menu/menu.html',
                controller: 'MenuController',
                controllerAs: 'menuCtrl'
            })
            .when('/payment', {
                templateUrl: '/js/app/payment/payment.html',
                controller: 'PaymentController',
                controllerAs: 'paymentCtrl'
            })
            .otherwise({redirectTo: '/restaurants'});
            
        $locationProvider.hashPrefix('');
    } 
}());
