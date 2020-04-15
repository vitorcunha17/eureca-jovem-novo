angular.module('eurecaJovem').factory('authInterceptor', ["eurecaJovemStorageAPI", function(eurecaJovemStorageAPI) {
    return {
        // Send the Authorization header with each request
        'request': function(config) {
            if (!config.url.includes("viacep") && (!config.url.includes("usuario/login"))) {
                if (eurecaJovemStorageAPI.pegarChave() != null && eurecaJovemStorageAPI.pegarUsuarioLogado() != null) {
                    config.headers = config.headers || {};
                    var encodedString = eurecaJovemStorageAPI.pegarChave();
                    //config.headers.Authorization = 'Basic ' + encodedString;
                }
            }
            return config;
        }
    };
}]);
