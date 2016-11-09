
(function (angular) {
	var http=angular.module('movie.services.http',[]);
	http.service('HttpService',['$window','$document',function ($window,$document) {
		this.jsonp=function (url,data,callback) {
			var randomNum=Math.random().toString().replace('.','');
			var randomName='my_json_'+randomNum;
			$window[randomName]=callback;
			var queryString=url.indexOf('?')==-1?'?':'&';
			for(var key in data){
				queryString+=key+'='+data[key]+'&';
			}
			queryString+='callback='+randomName;
			var scriptEle=$document[0].createElement('script');
			scriptEle.src=url+queryString;
			$document[0].body.appendChild(scriptEle);
		};
	}]);
})(angular);
