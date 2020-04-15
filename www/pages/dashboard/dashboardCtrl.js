angular.module("eurecaJovem").controller("dashboardCtrl", function (config, $scope, $routeParams, $location, $mdToast, $mdSidenav, $rootScope, $http, eurecaJovemStorageAPI) {

    //serviços de consulta api
    $scope.filtrarMinhasOportunidades = function (hashp) {
        return $http.get(config.webServiceURL + "/amigos/filtrarMinhasOps/" + hashp);
    };




    //inicializa a lista de oportunidades
    $scope.filtrarMinhasOps = function () {
        var user = eurecaJovemStorageAPI.pegarUsuarioLogado();
        $scope.hashCli = user.hashCli;
        if ($scope.hashCli != '') {
            $scope.filtrarMinhasOportunidades($scope.hashCli).then(function (resposta) {
                if (resposta.status == 200) {
                    $scope.minhasOps = resposta.data.minhasOportunidades;
                    for (i=0;i<$scope.minhasOps.length;i++) {
                        var knobOptions = {
                            bgColor: '#17226f',
                            trackWidth: 25,
                            barWidth: 30,
                            barColor: '#FFAE1A',
                            textColor: '#fff',
                            max: $scope.minhasOps[i].steps_total,
                            subText: {
                                enabled: true,
                                text: 'Fases'
                            },
                            readOnly: true,
                            size: 130
                        };
                        $scope.minhasOps[i].knob = knobOptions;
                    }
                    console.log("minhas ops", $scope.minhasOps);

                }
            }),
                function error(resposta) {
                    $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
                };
        } else {
            delete $rootScope;
            eurecaJovemStorageAPI.removerUsuarioLogado();
            eurecaJovemStorageAPI.removerChave();
            $mdToast.show($mdToast.simple().textContent("Hash de checagem do cliente incorreta"));
        }

    }

    

    $scope.desafiosOp = function (url) {
        $location.path('trilha/' + url);
    };

    $scope.verRanking = function (url) {
        var user = eurecaJovemStorageAPI.pegarUsuarioLogado();
        var id = user.id;
        $location.path('ranking/' + url + "/" + id);
    };

});
