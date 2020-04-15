angular.module("eurecaJovem").config(function($httpProvider) {
    $httpProvider.interceptors.push("loadInterceptor");
    $httpProvider.interceptors.push("timestampInterceptor");
	$httpProvider.interceptors.push('authInterceptor');
});
