'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
   	'ngRoute',
	'movie.directive.auto',
  	'movieList'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}]);
