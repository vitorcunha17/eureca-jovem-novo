angular.module("eurecaJovem").controller("participacaoCtrl", function ($scope, $rootScope, $routeParams, $location, $mdToast, eurecaJovemAPI, eurecaJovemStorageAPI, config, $mdDialog, $timeout, $sessionStorage) {

    //Se não houver oportunidade selecionada direciona pra lista de oportunidades
    if ($location.path() == '/desafios') {
        if (angular.isUndefined($rootScope.participacaoDesafio)) {
            $scope.info = "Sua sessão expirou.";
            $mdToast.show($mdToast.simple().textContent($scope.info));
            $location.path('/dashboard');
        } else {
            //checa se ele ja entregou o desafio
            //$scope.enviouDesafio();

            var user = eurecaJovemStorageAPI.pegarUsuarioLogado();
            var id = user.id;
            if (id != null) {
                eurecaJovemAPI.buscarDesafiosEntreguesService(id, $rootScope.participacaoDesafio.idOp).then(function (resposta) {
                    if (resposta.status == 200) {
                        if (resposta.data.desafiosEntregues) {
                            $scope.desafiosEntregues = JSON.parse(resposta.data.desafiosEntregues);
                            for (var i = 0; i < $rootScope.participacaoDesafio.desafios.length; i++) {
                                for (var x = 0; x < $scope.desafiosEntregues.length; x++) {
                                    if ($rootScope.participacaoDesafio.desafios[i].idDesafio == $scope.desafiosEntregues[x].idDesafio) {
                                        $rootScope.participacaoDesafio.desafios[i].conteudo = angular.copy($scope.desafiosEntregues[x].conteudo);
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    };

    $scope.carregarParticipacaos = function () {
        //console.log("buscar participacoes");
        //var id = $sessionStorage.userLogado.id;
        delete $rootScope.participacoes;
        var user = eurecaJovemStorageAPI.pegarUsuarioLogado();
        var id = user.data.id;
        if (id != null) {
            eurecaJovemAPI.buscarParticipacoesService(id).then(function (resposta) {
                if (resposta.status == 200) {
                    if (resposta.data.semInsc) {
                        $scope.semParticipacoes = true;
                    } else {
                        $rootScope.participacoes = resposta.data;
                        for (var i = 0; i < $rootScope.participacoes.length; i++) {
                            var participacao = $rootScope.participacoes[i];
                            if (participacao.anexos) {
                                participacao.anexos = JSON.parse(participacao.anexos);
                                for (i = 0; i < participacao.anexos.length; i++) {
                                    if (participacao.anexos[i].posicao == 5) {
                                        $rootScope.bannerOportunidade = angular.copy(participacao.anexos[i].arquivo);
                                    }
                                }
                            }
                            if (participacao.vaga) {
                                participacao.vaga = JSON.parse(participacao.vaga);
                            }
                            if (participacao.cliente) {
                                participacao.cliente = JSON.parse(participacao.cliente);
                            }
                            if (participacao.desafios) {
                                participacao.desafios = JSON.parse(participacao.desafios);
                            }
                            //$rootScope.participacao = angular.copy(participacao);
                            //console.log('part', $rootScope.participacao);

                        }
                    }
                }
            });
        } else {
            eurecaJovemStorageAPI.removerUsuarioLogado();
            eurecaJovemStorageAPI.removerChave();
            delete $rootScope.usuarioLogado;
            $location.path('dashboard');
        }



    };

    $scope.enviouDesafio = function () {
        //console.log("Enviou desafio?");
        var user = eurecaJovemStorageAPI.pegarUsuarioLogado();
        var id = user.data.id;
        if (id != null) {
            eurecaJovemAPI.buscarDesafiosEntreguesService(id, $rootScope.participacaoDesafio.idOp).then(function (resposta) {
                if (resposta.status == 200) {
                    $scope.desafiosEntregues = resposta.data;
                    //console.log("Resposta:", resposta.data);
                }
            });
        }
    };


    $scope.paginaDesafios = function (oportunidade) {
        $rootScope.participacaoDesafio = oportunidade;
        $location.path('desafios');
    }


    $scope.enviarLinkDesafio = function (desafio) {
        desafio.idUser = $rootScope.usuarioLogado.id;
        //console.log(desafio);
        if (desafio != null) {
            eurecaJovemAPI.enviarDesafioLinkService(desafio).then(function (resposta) {
                if (resposta.status == 200) {
                    //console.log("Desafio link enviado?", resposta.data);
                    $mdToast.show($mdToast.simple().textContent(resposta.data));
                }
            });
        }
    }

    $scope.options = {
        unit: "%",
        readOnly: true,
        subText: {
            enabled: true,
            text: 'Completado',
            color: 'gray',
            font: 'auto'
        },
        trackWidth: 30,
        barWidth: 40,
        trackColor: '#e1e1e1',
        barColor: '#fcd900'
    };

});
