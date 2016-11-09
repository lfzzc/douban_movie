(function (angular) {
	'use strict';

	var module=angular.module('movie.top250', ['ngRoute','movie.services.http']);

	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/top250/:pages', {
			templateUrl: 'top250/view.html',
			controller: 'Top250'
		});
	}]);
	module.controller('Top250', ['$scope','$route','$routeParams','HttpService',function($scope,$route,$routeParams,HttpService) {
		var pages=parseInt($routeParams.pages);
		var count=10;
		var start=(pages-1)*count;
		$scope.title='';
		$scope.subjects=[];
		$scope.message='';
		$scope.totalCount=0;
		$scope.pageCount=0;
		$scope.loading=true;
		HttpService.jsonp('http://api.douban.com/v2/movie/top250',{start:start,count:count},function (data) {
			$scope.title=data.title;
			$scope.subjects=data.subjects;
			$scope.totalCount=data.total;
			$scope.pageCount=Math.ceil($scope.totalCount/count);
			$scope.currentPage=pages;
			$scope.loading=false;
			$scope.$apply();
		});
		$scope.goPage=function (page) {
			if(page>=1&&page<=$scope.pageCount){
				$route.updateParams({
					pages:page
				})
			}
		}
	}]);
})(angular);
