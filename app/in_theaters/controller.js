/**
 * Created by Administrator on 2016/11/7.
 */
(function (angular) {
	'use strict';

	var module=angular.module('movie.in_theaters', ['ngRoute','movie.services.http']);

	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/in_theaters/:pages', {
			templateUrl: 'in_theaters/view.html',
			controller: 'InTheaters'
		});
	}]);

	/*module.controller('InTheaters', ['$scope','$http',function($scope,$http) {
		$scope.subjects=[];
		$scope.message='';
		var doubanApi='http://api.douban.com/v2/movie/in_theaters';
		$http.jsonp(doubanApi+'?callback=JSON_CALLBACK').then(function (response) {
			if(response.status===200){
				$scope.subjects=response.data.subjects;
			}else{
				$scope.message='服务器跑到火星了! '+response.statusText;
			}
		},function (err) {
			console.log(err);
			$scope.message='服务器跑到火星了! '+err.statusText;
		});
	}]);*/
	module.controller('InTheaters', ['$scope','$route','$routeParams','HttpService',function($scope,$route,$routeParams,HttpService) {
		var pages=parseInt($routeParams.pages);
		var count=10;
		var start=(pages-1)*count;
		$scope.title='';
		$scope.subjects=[];
		$scope.message='';
		$scope.totalCount=0;
		$scope.pageCount=0;
		$scope.loading=true;
		HttpService.jsonp('http://api.douban.com/v2/movie/in_theaters',{start:start,count:count},function (data) {
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
