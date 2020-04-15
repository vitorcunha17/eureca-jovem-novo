angular.module("eurecaJovem").factory("evalService", function($http, config) {
    
        var _buscarModelo = function(modeloId) {
            return $http.get(config.evalURL + "/eureca/buscarQuestionario/" + modeloId);
        };
    
   
        return {
            buscarModeloService: _buscarModelo
        }
    
    });
    