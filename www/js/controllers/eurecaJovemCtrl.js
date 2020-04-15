angular.module("eurecaJovem").controller("eurecaJovemCtrl", function ($sce, $scope, $routeParams, $location, $mdToast, $mdSidenav, $rootScope, $sessionStorage, eurecaJovemAPI, eurecaJovemStorageAPI, eurecaECBrasil, config, $mdDialog, $timeout) {

    $rootScope.usuarioLogado = eurecaJovemStorageAPI.pegarUsuarioLogado();
    $rootScope.userLogado = $sessionStorage.userLogado;
    //utilizado para que o primeiro acesso sem usuário seja login
    $rootScope.loginOuCadastro = "login";
    //carregando diretorios padrao
    $rootScope.diretorioImagens = config.imageServiceURL;


    /*comentando pra tentar resolver problemas de rota
    if ($rootScope.usuarioLogado) {
        $rootScope.pessoa = $rootScope.usuarioLogado.pessoa;
        console.log("Usuario logado: ", $rootScope.usuarioLogado);
        $location.path("dashboard");
    }*/

    //passando o cadastro para poder logar após cadastro efetuado.
    $scope.cadastrar = function (usuario) {
        if (usuario.senha == usuario.senha2) {
            if (usuario != null) {
                eurecaJovemAPI.cadastrar(usuario).then(function (resposta) {
                    if (resposta.status == 200) {
                        $mdToast.show($mdToast.simple().textContent(resposta.data));
                        /* removendo o redirect
                        $location.path('/login');*/
                        $rootScope.loginOuCadastro = "login";
                        var ulogin = {};
                        ulogin.nome = usuario.usuario;
                        ulogin.senha = usuario.senha;
                        $scope.autenticar(ulogin);
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

    $scope.autenticar = function (user) {
        ////console.log("Entrei...");
        eurecaJovemAPI.loginService(user).then(function successCallback(data) {
            if (data.status == 200) {
                eurecaJovemStorageAPI.setarUsuarioLogado(data.data);
                eurecaJovemStorageAPI.setarChave(btoa(user.nome + ":" + user.senha));
                $rootScope.usuarioLogado = data.data;
                $rootScope.pessoa = data.data.pessoa;
                //$sessionStorage.userLogado = data.data;
                //$rootScope.userLogado = $sessionStorage.userLogado;
                $scope.buscarIdiomas();
                $mdToast.show($mdToast.simple().textContent("Login realizado com sucesso"));
                
                $location.path("dashboard");
            } else {
                $scope.error = "Usuário incorreto";
                $mdToast.show($mdToast.simple().textContent($scope.error));
            }

        }),
        function errorCallback(data) {
            $scope.error = "Não foi possivel contatar o servidor";
            $mdToast.show($mdToast.simple().textContent($scope.error));
        }
    };

    $scope.logout = function () {
        eurecaJovemStorageAPI.removerUsuarioLogado();
        eurecaJovemStorageAPI.removerChave();
        delete $rootScope.usuarioLogado;
        $mdToast.show($mdToast.simple().textContent("Logout realizado com sucesso"));
        $location.path('login');
    };

    $scope.onClick = function (points, evt) {
        //console.log(points, evt);
    };

    $scope.buscarOportunidades = function () {
        eurecaJovemAPI.filtrarOportunidadesAbertasService().then(function (data) {
            if (data.status == 200) {
                //console.log("oportunidades abertas:", data.data);
                $scope.oportunidadesAbertas = data.data;
            } else {
                $scope.info = data;
            }
        }),
        function error(data) {
            $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
        };
    };

    $scope.buscarIdiomas = function() {
        eurecaJovemAPI.filtrarIdiomasService().then(function (resposta) {
            if (resposta.status == 200) {
                for (var i = 0; i < resposta.data.length; i++) {
                    resposta.data[i].nivel = {};
                }
                $rootScope.idiomasDisponiveis = resposta.data;
            } else {
                $scope.info = resposta.status;
            }
            $mdToast.show($mdToast.simple().textContent($scope.info));
        }),
        function (resposta) {
            $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
        };
    };

    $scope.oportunidade = function (url) {
        $rootScope.loginOuCadastro = "oportunidadeDetalhes";
        $location.path('oportunidade/' + url);
    };

    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
        scales: {
            yAxes: [{
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
            }, {
                id: 'y-axis-2',
                type: 'linear',
                display: true,
                position: 'right'
            }]
        }
    };


    $scope.listaNacionalidade = eurecaECBrasil.filtrarPaisService();

    $scope.listaEstado = eurecaECBrasil.filtrarEstadoService();

    $scope.listaCidade = eurecaECBrasil.filtrarCidadeService();

    //controle do sidenav de menu principal
    $scope.abreMenu = function () {
        $mdSidenav('menuSideBar').toggle();
    };

    //controles de links do menu
    $scope.dashboard = function () {
        $location.path('dashboard');
    };

    $scope.perfil = function () {
        $location.path('perfil');
    };

    $scope.contato = function () {
        $location.path('contato');
    };

    $scope.cadastro = function () {
        $rootScope.loginOuCadastro = 'cadastro';
        //console.log($rootScope.loginOuCadastro);
        $location.path('cadastro');
    };

    $scope.login = function () {
        $rootScope.loginOuCadastro = 'login';
        //console.log($rootScope.loginOuCadastro);
        $location.path('login');
    };

    $scope.oportunidades = function () {
        $location.path('oportunidades');
    };

    $scope.openMenu = function ($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
    };

    $scope.abrirDialogPasswordReset = function (ev) {
        $scope.emailReset = [];
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'view/passwordReset.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,  // do not forget this if use parent scope
            clickOutsideToClose: true,
            //fullscreen: true // Only for -xs, -sm breakpoints.

        }).then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    };

    $scope.dialogAlterarSenha = function (ev) {
        $scope.senhas = [];
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'view/alterarSenha.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,  // do not forget this if use parent scope
            clickOutsideToClose: true,
            //fullscreen: true // Only for -xs, -sm breakpoints.

        }).then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    };

    $scope.alterarSenha = function (senhas) {
        if (senhas.novaSenha == senhas.confirmaSenha) {
            eurecaJovemAPI.alterarSenhaService($rootScope.usuarioLogado.id,senhas).then(function (resposta) {
                if (resposta.status == 200) {
                    $mdDialog.hide();
                    $mdToast.show($mdToast.simple().textContent("Senha alterada com sucesso! Você será deslogado."));
                    $scope.logout();
                } else if (resposta.status == 202){
                    $mdToast.show($mdToast.simple().textContent(resposta.data));
                }
            }),
            function error(resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };
        } else {
            $mdToast.show($mdToast.simple().textContent("As senhas informadas não são iguais"));
        }
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

    $scope.resetarSenha = function (email) {
        eurecaJovemAPI.passwordResetService(email).then(function (resposta) {
            if (resposta.status == 200) {
                $rootScope.alerta = resposta.data;
                $timeout(function () { delete $rootScope.alerta, delete $scope.emailReset }, 10000);
            } else {
                $scope.info = data;
            }
        }),
        function error(resposta) {
            $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
        };
    }

});
