angular.module("eurecaJovem").controller("oportunidadeCtrl", function ($timeout, $sce, $scope, $rootScope, $location, $mdToast, $mdDialog, $http, config, $route, $anchorScroll) {


    //serviços de consulta api
    $scope.buscarDetalhesOportunidade = function (url) {
        return $http.get(config.webServiceURL + "/oportunidade/buscarPorURL/" + url);
    };

    $scope.inscreverVaga = function (inscricao) {
        return $http.post(config.webServiceURL + "/inscricao/meinscrever", inscricao);
    };


    //chamadas da página
    $scope.carregarDetalhesOportunidade = function () {
        $scope.buscarDetalhesOportunidade($route.current.params.url).then(function (resposta) {
            if (resposta.status == 200) {
                console.log("resposta da busca da oportunidade por url", resposta.data);
                $scope.oportunidade = [];
                var oportunidade = resposta.data;
                if (oportunidade.cliente)
                    oportunidade.cliente = JSON.parse(oportunidade.cliente);
                //verificando se existe vagas cadastradas e tratando para novas
                if (oportunidade.vagas) {
                    oportunidade.vagas = JSON.parse(oportunidade.vagas);
                    for (i = 0; i < oportunidade.vagas.length; i++) {
                        if (oportunidade.vagas[i].requesitos) {
                            oportunidade.vagas[i].requesitos = JSON.parse(oportunidade.vagas[i].requesitos);
                            for (x = 0; x < oportunidade.vagas[i].requesitos.length; x++) {
                                if (oportunidade.vagas[i].requesitos[x].idioma) {
                                    oportunidade.vagas[i].requesitos[x].idioma = JSON.parse(oportunidade.vagas[i].requesitos[x].idioma);
                                }
                                if (oportunidade.vagas[i].requesitos[x].cursos) {
                                    oportunidade.vagas[i].requesitos[x].cursos = JSON.parse(oportunidade.vagas[i].requesitos[x].cursos);
                                } else {
                                    $scope.todosCursos = "Qualquer curso de graduação";
                                }
                                if (oportunidade.vagas[i].requesitos[x].selectGruposCursos) {
                                    oportunidade.vagas[i].requesitos[x].selectGruposCursos = JSON.parse(oportunidade.vagas[i].requesitos[x].selectGruposCursos);
                                }
                            }
                        } else {
                            oportunidade.vaga.requesitos = [];
                        }
                    }
                }
                if (oportunidade.dicas)
                    oportunidade.dicas = JSON.parse(oportunidade.dicas);
                else
                    oportunidade.dicas = [];
                if (oportunidade.faq)
                    oportunidade.faq = JSON.parse(oportunidade.faq);
                else
                    oportunidade.faq = [];
                if (oportunidade.perguntas) {
                    oportunidade.perguntas = JSON.parse(oportunidade.perguntas);
                } else {
                    oportunidade.perguntas = [];
                }
                if (oportunidade.desafios) {
                    oportunidade.desafios = JSON.parse(oportunidade.desafios);
                } else {
                    oportunidade.desafios = [];
                }
                if (oportunidade.anexos) {
                    oportunidade.anexos = JSON.parse(oportunidade.anexos);
                    for (i = 0; i < oportunidade.anexos.length; i++) {
                        if (oportunidade.anexos[i].posicao == 2) {
                            $scope.videoIntro = angular.copy(oportunidade.anexos[i].link);
                        }
                        if (oportunidade.anexos[i].posicao == 5) {
                            $scope.bannerOportunidade = angular.copy(oportunidade.anexos[i].arquivo);
                        }
                    }
                } else {
                    oportunidade.anexos = [];
                }
                if (oportunidade.sources) {
                    oportunidade.sources = JSON.parse(oportunidade.sources);
                } else {
                    oportunidade.sources = [];
                }
                $scope.oportunidade = angular.copy(oportunidade);

                $scope.timeline = [{ data: $scope.oportunidade.dataDivulgacao, descricao: "Data lançamento", icone: "flag", bg: "#6699ff" },
                { data: $scope.oportunidade.dataInicioInscricao, descricao: "Início das inscrições", icone: "description", bg: "green" },
                { data: $scope.oportunidade.dataFimInscricao, descricao: "Fim das inscrições", icone: "description", bg: "red" },
                { data: $scope.oportunidade.dataInicioEnvio, descricao: "Início dos desafios online", icone: "send", bg: "green" },
                { data: $scope.oportunidade.dataFimEnvio, descricao: "Fim dos desafios online", icone: "send", bg: "red" }

                ];
            } else {
                $scope.info = "Ocorreu um erro buscando a oportunidade";
                $mdToast.show($mdToast.simple().textContent($scope.info));
            }

        }),
            function (resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };
    };


    $scope.meInscreverEm = function (inscricao) {
        $scope.inscricao.idVaga = inscricao.vaga.idVaga;
        $scope.inscricao.idPessoa = $rootScope.usuarioLogado.id;
        $scope.inscreverVaga($scope.inscricao).then(function (resposta) {
            if (resposta.status == 200) {
                $rootScope.alerta = resposta.data;
                if ($rootScope.alerta.redirecionar == true) {
                    $location.path('/obrigadoInscricao');
                    $rootScope.oportunidade = $scope.oportunidade;
                }
                $timeout(function () { delete $rootScope.alerta }, 6500);
                //$mdToast.show($mdToast.simple().textContent(resposta.data));
            }
        }),
            function error(resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };
    }


    $scope.abreDialogVaga = function (ev, vaga) {
        $scope.inscricao = {};
        $scope.inscricao.perguntas = $scope.oportunidade.perguntas;
        $scope.inscricao.vaga = vaga;

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'pages/oportunidade/dialogVaga.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,  // do not forget this if use parent scope
            clickOutsideToClose: true,
            fullscreen: true // Only for -xs, -sm breakpoints.

        }).then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    };


    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {

            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    };


    $scope.removeAlert = function () {
        $scope.alertType = null;
    };

    $scope.irParaAncora = function (ancora) {
        $location.hash('vagas');
        $anchorScroll();
    }

    $scope.checarInscricao = function (idOportunidade) {
        var idJovem = $rootScope.usuarioLogado.data.id;
        eurecaJovemAPI.checarInscricaoService(idJovem, idOportunidade).then(function (resposta) {
            if (resposta.status != 200) {
                $scope.jaTemInscricao = true;
            }
        }),
            function error(resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };
    }

    $scope.irDesafios = function (url) {
        //console.log("chamei metodo dos desafios");
        //var user = eurecaJovemStorageAPI.pegarUsuarioLogado();
        //var id = user.id;
        //console.log("user", id);
        //console.log("url", url);
        //$location.path("desafios" + url + "/" + id);
        $rootScope.participacaoDesafio = $scope.oportunidade;
        $location.path("desafios");
    }

});
