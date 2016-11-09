/**
 * Created by Administrator on 2016/11/7.
 */
/*(function (angular) {
	'use strict';
	var module=angular.module('movie.coming_soon',[]);

	module.config(['$routeProvider',function ($routeProvider) {
		$routeProvider
			.when('/coming_soon',{
				templateUrl:'coming_soon/view.html',
				controller:'ComingSoon'
			})
	}]);

	module.controller('ComingSoon',['$scope','$http',function ($scope,$http) {
		$http.get('/mymoviecat/app/coming_soon.json').then(function (response) {
			if(response.status===200){
				$scope.subjects=response.data.subjects;
			}else{
				$scope.message='服务器跑到火星了! '+response.statusText;
			}
		},function (err) {
			console.log(err);
			$scope.message='服务器跑到火星了! '+err.statusText;
		});
	}]);
})(angular);*/
/**
 * Created by Administrator on 2016/11/7.
 */
(function (angular) {
	'use strict';

	var module=angular.module('movie.coming_soon', ['ngRoute','movie.services.http']);

	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/coming_soon/:pages', {
			templateUrl: 'coming_soon/view.html',
			controller: 'ComingSoon'
		});
	}]);
	module.controller('ComingSoon', ['$scope','$route','$routeParams','HttpService',function($scope,$route,$routeParams,HttpService) {
		var pages=parseInt($routeParams.pages);
		var count=10;
		var start=(pages-1)*count;
		$scope.title='';
		$scope.subjects=[];
		$scope.message='';
		$scope.totalCount=0;
		$scope.pageCount=0;
		$scope.loading=true;
		HttpService.jsonp('http://api.douban.com/v2/movie/coming_soon',{start:start,count:count},function (data) {
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
