/**
 * Created by Administrator on 2016/11/9.
 */
(function (angular) {
	angular.module('movie.directive.auto',[])
		.directive('autoFocus',['$location',function ($location) {
			var path=$location.path();
			return {
				restrict:'A',
				link:function ($scope, iElm, iAttrs, controller) {
					var aLink=iElm.children().attr('href');
					console.log(aLink);
					var type=aLink.replace(/#(\/.+?)\/\d/,'$1');
					if(path.startsWith(type)){
						iElm.addClass('active')
					}
					iElm.on('click',function () {
						iElm.parent().children().removeClass('active');
						iElm.addClass('active')
					});
				}
			}
		}]);
})(angular);
