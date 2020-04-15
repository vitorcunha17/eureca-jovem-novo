angular.module("eurecaJovem").factory("loadInterceptor", function($q,$rootScope, $timeout){
	//Timeout agenda no futuro a execução de uma função
	return{
		request: function(config){
			$rootScope.loading = true;
			config.timeout = 20000;
			$rootScope.offline = false;
			return config;
		},
		requestError: function(rejection){
			$timeout(function(){
				$rootScope.loading = false;
				$rootScope.offline = true;
			}, 0)

			return $q.reject(rejection);
		},
		response: function(response){
				$rootScope.loading = false;
				$rootScope.offline = false;
			return response;
		},
		responseError: function(rejection){
			$timeout(function(){
				$rootScope.loading = false;
				$rootScope.offline = true;
			}, 0)
			return $q.reject(rejection);
		}	
	};

});