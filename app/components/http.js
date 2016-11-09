
(function (angular) {
	var http=angular.module('movie.services.http',[]);
	http.service('HttpService',['$window','$document',function ($window,$document) {
		this.jsonp=function (url,data,callback) {
			//拼接参数
			var queryString=url.indexOf('?')==-1?'?':'&';
			for(var key in data){
				queryString+=key+'='+data[key]+'&';
			}
			//callback名字
			var randomNum=Math.random().toString().replace('.','');
			var randomName='my_json_'+randomNum;
			//完整的请求地址
			queryString+='callback='+randomName;
			//创建script标签
			var scriptEle=$document[0].createElement('script');
			scriptEle.src=url+queryString;
			//挂载
			$window[randomName]=function (data) {
				callback(data);
				$document[0].body.removeChild(scriptEle);//垃圾回收
			};
			//append到页面
			$document[0].body.appendChild(scriptEle);
		};
	}]);
})(angular);
