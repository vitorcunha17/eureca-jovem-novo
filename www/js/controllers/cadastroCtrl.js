angular.module("eurecaJovem").controller("cadastroCtrl", function ($scope, $routeParams, $location, $mdToast, $mdSidenav, $rootScope, eurecaJovemAPI, eurecaJovemStorageAPI) {

    $rootScope.cadastrar = function (usuario) {
        if (usuario.senha == usuario.senha2) {
            if (usuario != null) {
                eurecaJovemAPI.cadastrar(usuario).then(function (resposta) {
                    if (resposta.status == 200) {
                        $mdToast.show($mdToast.simple().textContent(resposta.data));
                        $rootScope.loginOuCadastro = "login";
                        $location.path('/login');
                    } else if (resposta.status == 202) {
                        $mdToast.show($mdToast.simple().textContent(resposta.data));
                    } else {
                        $scope.error = "Não foi possível cadastrar.";
                        $mdToast.show($mdToast.simple().textContent($scope.error));
                    }
                }),
                    function (resposta) {
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
