'use strict';

angular
    .module('app')
    .run(['$rootScope', '$window', function($rootScope, $window) {
        $rootScope.back = function() {
            $window.history.back();
        }
        
        $rootScope.forward = function() {
            $window.history.forward();
        }
        
        $rootScope.historyLength = function() {
            return $window.history.length;
        }
    }])