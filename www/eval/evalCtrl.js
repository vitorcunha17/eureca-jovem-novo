angular.module("eurecaJovem").controller("evalCtrl", function ($route, config, $http, $scope, $routeParams, $mdDialog, $location, $mdToast, $mdSidenav, $rootScope, evalService) {

    //serviços de consulta api
    $scope.enviarEval = function (desafio) {
        return $http.post(config.webServiceURL + "/amigos/enviarAssessment", desafio);
    };

    $scope.abreDialogEval = function (ev, desafio) {
        //carrego os dados do eval
        $scope.questionarioEval = {};
        //modelo da pepsico
        idModelo = 17;
        $rootScope.desafioEval = desafio;
        $rootScope.desafioEval.idUser = $rootScope.usuarioLogado.id;
        console.log("dialogEval",desafio);
        evalService.buscarModeloService(idModelo).then(function (resposta) {
            if (resposta.status == 200) {
                $scope.questionarioEval = resposta.data;
                console.log("Questionario", $scope.questionarioEval);
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
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'eval/dialogEval.html',
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

    $scope.salvarEval = function () {
        console.log("enviando eval", $rootScope.desafioEval);
        $scope.enviarEval($rootScope.desafioEval).then(function (resposta) {
            $mdToast.show($mdToast.simple().textContent(resposta.data));
            $route.reload();
        })
    }

});
