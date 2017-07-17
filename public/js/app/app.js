'use strict';

angular
    .module('app', ['ngRoute', 'ngDialog'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.otherwise({redirectTo: '/restaurants'});
        
        $locationProvider.hashPrefix('');
    }]);