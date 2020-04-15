angular.module('eurecaJovem').factory('authInterceptor', ["eurecaJovemStorageAPI", function(eurecaJovemStorageAPI) {
    return {
        // Send the Authorization header with each request
        'request': function(config) {
            if (!config.url.includes("viacep") && (!config.url.includes("usuario/login")) && (!config.url.includes("usuario/cadastrar")) && (!config.url.includes("usuario/recuperarsenha")) && (!config.url.includes("arquivos")) && (!config.url.includes("oportunidade/filtrarAbertas")) && (!config.url.includes("eval"))) {
                if (eurecaJovemStorageAPI.pegarChave() != null && eurecaJovemStorageAPI.pegarUsuarioLogado() != null) {
                    config.headers = config.headers || {};
                    var encodedString = eurecaJovemStorageAPI.pegarChave();
                    config.headers.Authorization = 'Basic ' + encodedString;
                }
            }
            if (config.url.includes("api/report")) {
                config.headers = config.headers || {};
                var chaveAcessoJSReport = (btoa('printer@grupoanga.com' + ":" +'pr1ntj@'));
                config.headers.Authorization = 'Basic ' + chaveAcessoJSReport;
                //console.log("Passando na chave: ", config.headers.Authorization);
            }
            return config;
        }
    };
}]);
