angular.module("eurecaJovem").controller("oportunidadesCtrl", function ($scope, $rootScope, $routeParams, $location, $mdToast, $http, eurecaJovemStorageAPI, config) {

    if (angular.isUndefined($rootScope.usuarioLogado)) {
        $rootScope.usuarioLogado = eurecaJovemStorageAPI.pegarUsuarioLogado();
    }

    //serviços de consulta api
    $scope.filtrarEstagiosAbertos = function (tipo) {
        return $http.get(config.webServiceURL + "/amigos/filtrarAbertas/" + $rootScope.usuarioLogado.hashCli + "/" + tipo);
    };


    //chamadas da página
    $scope.carregarEstagios = function (tipo) {
        console.log("Carregando oportunidades do tipo:", tipo);
        $scope.filtrarEstagiosAbertos(tipo).then(function (resposta) {
            if (resposta.status == 200) {
                $scope.opEstagio = resposta.data.oportunidadesAbertas;
                console.log("Oportunidades encontradas:", $scope.oportunidadesAbertas);
            }
        }),
            function (resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };
    };

    $scope.carregarTrainees = function (tipo) {
        console.log("Carregando oportunidades do tipo:", tipo);
        $scope.filtrarEstagiosAbertos(tipo).then(function (resposta) {
            if (resposta.status == 200) {
                $scope.opTrainee = resposta.data.oportunidadesAbertas;
                console.log("Oportunidades encontradas:", $scope.oportunidadesAbertas);
            }
        }),
            function (resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };
    };


    //chama a pagina de oportunidade e passa a url pra ser consultada
    $scope.detalhesOportunidade = function (url) {
        $location.path('oportunidade/' + url);
    };

});
