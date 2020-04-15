angular.module("eurecaJovem").controller("contatoCtrl", function($scope, $routeParams, $location, $mdToast, $mdSidenav, $rootScope, eurecaJovemAPI, eurecaJovemStorageAPI) {

	$scope.enviarEmail = function(pessoa){
	//console.log(pessoa);
		if (pessoa != null) {
            eurecaJovemAPI.enviarEmail(pessoa).then(function(resposta) {
                    if (resposta.status == 200) {
                        var pessoa = resposta.data;
                        $rootScope.pessoa = angular.copy(pessoa);
                        eurecaJovemStorageAPI.setarUsuarioLogado(pessoa);
                    } else {
                        $scope.error = "Jovem não encontrado";
                        $mdToast.show($mdToast.simple().textContent($scope.error));
                    }
                }),
                function(resposta) {
                    $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
                };
        } else {
            var pessoa = {};
            pessoa.idJovem = idJovem;
            $rootScope.pessoa = angular.copy(pessoa);
        }
	};

	$scope.carregarEmail = function(){
		//console.log(eurecaJovemStorageAPI.pegarUsuarioLogado().data);
        $rootScope.pessoa = eurecaJovemStorageAPI.pegarUsuarioLogado().data;
	};
});
