angular.module("eurecaJovem").controller("oportunidadeCtrl", function($scope, $routeParams, oportunidade, $location, $mdToast, $mdSidenav, $scope, eurecaJovemAPI, eurecaJovemStorageAPI, eurecaECBrasil, config, $mdDialog) {

    $scope.imagensIntro = [];
    var oportunidade = oportunidade.data;
    //objeto cliente
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
                    }
                    if (oportunidade.vagas[i].requesitos[x].selectGruposCursos) {
                        oportunidade.vagas[i].requesitos[x].selectGruposCursos = JSON.parse(oportunidade.vagas[i].requesitos[x].selectGruposCursos);
                    }
                }
            } else {
                oportunidade.vaga.requesitos = [];
            }
        }
    } else
        oportunidade.vagas = [];
    if (oportunidade.dicas)
        oportunidade.dicas = JSON.parse(oportunidade.dicas);
    else
        oportunidade.dicas = [];
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
                $scope.imagensIntro.push(angular.copy(oportunidade.anexos[i]));
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
    //console.log("oportunidade", $scope.oportunidade);



    $scope.collapseAll = function(data) {
        for (var i in $scope.accordianData) {
            if ($scope.accordianData[i] != data) {
                $scope.accordianData[i].expanded = false;
            }
        }
        data.expanded = !data.expanded;
    };


    $scope.timeline = [{ data: $scope.oportunidade.dataDivulgacao, descricao: "Data lançamento", icone: "flag", bg: "#6699ff" },
        { data: $scope.oportunidade.dataInicioInscricao, descricao: "Início das inscrições", icone: "description", bg: "green" },
        { data: $scope.oportunidade.dataFimInscricao, descricao: "Fim das inscrições", icone: "description", bg: "red" },
        { data: $scope.oportunidade.dataInicioEnvio, descricao: "Início dos desafios online", icone: "send", bg: "green" },
        { data: $scope.oportunidade.dataFimEnvio, descricao: "Fim dos desafios online", icone: "send", bg: "red" }

    ];

    $scope.abrirDialogVagas = function(ev) {
        $mdDialog.show({
            //controller: DialogController,
            templateUrl: 'view/dialogVagas.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope,
            clickOutsideToClose: true,
            //fullscreen: true // Only for -xs, -sm breakpoints.

        }).then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };




});
