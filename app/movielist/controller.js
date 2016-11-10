/**
 * Created by Administrator on 2016/11/9.
 */
(function (angular) {
	'use strict';

	var module = angular.module('movieList', ['ngRoute', 'movie.services.http']);

	module.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/:category/:pages', {
			templateUrl: 'movielist/view.html',
			controller: 'ListController'
		});
	}]);
	module.controller('SearchController', ['$scope', '$route', function ($scope, $route) {
		$scope.input = '';
		$scope.search = function () {
			$route.updateParams({category: 'search', q: $scope.input})
		}
	}]);
	module.controller('ListController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		'AppConfig',
		function ($scope, $route, $routeParams, HttpService, AppConfig) {
			var pages = parseInt($routeParams.pages);
			var count=AppConfig.pageCount;
			var start = (pages - 1) * count;
			$scope.title = 'Loading...';
			$scope.subjects = [];
			$scope.message = '';
			$scope.totalCount = 0;
			$scope.pageCount = 0;
			$scope.loading = true;
			HttpService.jsonp(AppConfig.listApi+$routeParams.category, {start: start, count: count, q: $routeParams.q}, function (data) {
				$scope.title = data.title;
				$scope.subjects = data.subjects;
				$scope.totalCount = data.total;
				$scope.pageCount = Math.ceil($scope.totalCount / count);
				$scope.currentPage = pages;
				$scope.loading = false;
				$scope.$apply();
			});
			$scope.goPage = function (page) {
				if (page >= 1 && page <= $scope.pageCount) {
					$route.updateParams({
						pages: page
					})
				}
			};
		}]);
})(angular);
