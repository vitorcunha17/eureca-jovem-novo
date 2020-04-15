angular.module("eurecaJovem").controller("cadastroCtrl", function($scope, $routeParams, $location, $mdToast, $mdSidenav, $rootScope, eurecaJovemAPI, eurecaJovemStorageAPI) {

	$scope.cadastrar = function(usuario){
		//console.log(usuario);
		if (usuario.senha == usuario.senha2) {
        if (usuario != null) {
            eurecaJovemAPI.cadastrar(usuario).then(function(resposta) {
                    if (resposta.status == 200) {
                        var usuario = resposta.data;
                        $rootScope.usuario = angular.copy(usuario);
                        eurecaJovemStorageAPI.setarUsuarioLogado(usuario);
                    } else {
                        $scope.error = "Jovem não encontrado";
                        $mdToast.show($mdToast.simple().textContent($scope.error));
                    }
                }),
                function(resposta) {
                    $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
                };
        } else {
            var usuario = {};
            usuario.idJovem = idJovem;
            $rootScope.usuario = angular.copy(usuario);
        }
    } else {
        $mdToast.show($mdToast.simple().textContent("Senhas diferentes"));
    	
    	}
	};

});
