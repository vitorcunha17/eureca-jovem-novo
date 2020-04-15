//BURLA MECANISMOS DE CACHE
angular.module("eurecaJovem").factory("timestampInterceptor", function(){
	return {
		request: function(config){
			////console.log(config);
			var url = config.url;
			// o que eu estou interceptando.
			if(url.indexOf('view') > 1 ) return config;
			var timestapm = new Date().getTime();
			config.url = url + "?timestamp="+timestapm;
			return config;
		}
	};
})