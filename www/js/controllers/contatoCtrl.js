angular.module("eurecaJovem").controller("contatoCtrl", function ($scope, $routeParams, $location, $mdToast, $mdSidenav, $rootScope, eurecaJovemAPI, eurecaJovemStorageAPI) {

    $scope.enviarEmail = function (email) {
        console.log(email);
        eurecaJovemAPI.enviarEmailService(email).then(function (resposta) {
            if (resposta.status == 200) {
                $scope.info = "Recebi seu contato. Retorno em breve.";
                $location.path("/dashboard");
            } else {
                $scope.info = "O envio do e-mail falhou.";
            }
            $mdToast.show($mdToast.simple().textContent($scope.info));
        }),
            function (resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };
    };

    $scope.carregarInfos = function () {
        $scope.email = {};
        $scope.email.remetente = $rootScope.pessoa.email;
        if (angular.isUndefined($scope.listaOportunidades)) {
            eurecaJovemAPI.filtrarTodasOpsEmailService().then(function (resposta) {
                if (resposta.status == 200) {
                    $scope.listaOportunidades = resposta.data;
                }
            }),
                function (resposta) {
                    $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
                };
        }

    }

});
