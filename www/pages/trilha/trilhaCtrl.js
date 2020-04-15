angular.module("eurecaJovem").controller("trilhaCtrl", function ($route, $sce, $scope, $rootScope, $routeParams, $location, $mdToast, $mdSidenav, $route, config, $mdDialog, $http, eurecaJovemStorageAPI) {

    //serviços de consulta api
    $scope.buscarDetalhesTrilha = function (url, hashCli) {
        return $http.get(config.webServiceURL + "/amigos/buscarTrilha/" + url + "/" + hashCli);
    };

    $scope.enviarDesafioLink = function (envio) {
        return $http.post(config.webServiceURL + "/amigos/enviarLink", envio);
    };


    //chamadas da página
    $scope.carregarDetalhesTrilha = function () {
        var user = eurecaJovemStorageAPI.pegarUsuarioLogado();
        $scope.hashCli = user.hashCli;
        if ($scope.hashCli != '') {
            $scope.buscarDetalhesTrilha($route.current.params.url, $scope.hashCli).then(function (resposta) {
                if (resposta.status == 200) {
                    console.log("Trilha encontrada:", resposta.data);
                    $rootScope.trilha = resposta.data;
                } else {
                    $scope.info = "Ocorreu um erro buscando a oportunidade";
                    $mdToast.show($mdToast.simple().textContent($scope.info));
                }
            }),
                function (resposta) {
                    $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
                };
        } else {
            delete $rootScope;
            eurecaJovemStorageAPI.removerUsuarioLogado();
            eurecaJovemStorageAPI.removerChave();
            $mdToast.show($mdToast.simple().textContent("Hash de checagem do cliente incorreta"));
        }
    };




    $scope.enviarLinkDesafio = function (desafio) {
        desafio.idUser = $rootScope.usuarioLogado.id;
        if ((desafio != null) && ($rootScope.usuarioLogado.id != null)) {
            $scope.enviarDesafioLink(desafio).then(function (resposta) {
                $mdToast.show($mdToast.simple().textContent(resposta.data));
                $route.reload();
            });
        }
    }



    //Acho que era usado em um acordion que não esta mais usando. Mantive por não ter tempo de confirmar. by Gutem
    $scope.collapseAll = function (data) {
        for (var i in $scope.accordianData) {
            if ($scope.accordianData[i] != data) {
                $scope.accordianData[i].expanded = false;
            }
        }
        data.expanded = !data.expanded;
    };




});
