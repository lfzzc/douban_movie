/**
 * Created by Administrator on 2016/11/10.
 */
(function (angular) {
	var module=angular.module('movie.detail',['ngRoute','movie.services.http']);
	module.config(['$routeProvider',function ($routeProvider) {
		$routeProvider.when('/subject/:id',{
			templateUrl:'moviedetail/view.html',
			controller:'DetailController'
		})
	}]);
	module.controller('DetailController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		'AppConfig',
		function ($scope,$route,$routeParams,HttpService,AppConfig) {
		$scope.movie={};
		$scope.loading=true;
		var id=$routeParams.id;
		HttpService.jsonp(AppConfig.detailApi+id,{},function (data) {
			$scope.movie=data;
			$scope.loading=false;
			$scope.$apply();
		});
	}]);
})(angular);
