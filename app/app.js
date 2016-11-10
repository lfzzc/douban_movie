'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
   	'ngRoute',
	'movie.directive.auto',
	'movie.detail',
  	'movieList'
])
	.constant('AppConfig',{
		pageCount:10,
		listApi:'http://api.douban.com/v2/movie/',
		detailApi:'http://api.douban.com/v2/movie/subject/'
	})
	.config(['$routeProvider','AppConfig', function($routeProvider,AppConfig) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}]);
