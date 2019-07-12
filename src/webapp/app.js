
var fms = angular.module('fms', ['ngMaterial', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when('/visgraph', {templateUrl: 'webapp/pages/visgraph/visnetwork.html'})
        .otherwise({redirectTo:'/visgraph'})
    });
