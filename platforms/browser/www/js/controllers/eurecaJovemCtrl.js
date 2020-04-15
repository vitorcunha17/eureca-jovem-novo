angular.module("eurecaJovem").controller("eurecaJovemCtrl", function($scope, $routeParams, $location, $mdToast, $mdSidenav, $rootScope, $sessionStorage, eurecaJovemAPI, eurecaJovemStorageAPI, eurecaECBrasil, config) {

    $rootScope.usuarioLogado = eurecaJovemStorageAPI.pegarUsuarioLogado();
    $rootScope.userLogado = $sessionStorage.userLogado;
    //utilizado para que o primeiro acesso sem usuário seja login
    $rootScope.loginOuCadastro = 'login';
    //carregando diretorio de imagens padrao
    $rootScope.diretorioImagens = config.imageServiceURL;

    $scope.autenticar = function(user) {
        ////console.log("Entrei...");
        eurecaJovemAPI.loginService(user).then(function successCallback(data) {
                if (data.status == 200) {
                    eurecaJovemStorageAPI.setarUsuarioLogado(data);
                    eurecaJovemStorageAPI.setarChave(btoa(user.nome + ":" + user.senha));
                    $rootScope.usuarioLogado = data;
                    //$rootScope.userLogado = data.data;
                    $sessionStorage.userLogado = data.data;
                    $rootScope.userLogado = $sessionStorage.userLogado;
                    $mdToast.show($mdToast.simple().textContent("Login realizado com sucesso"));
                    $location.path('dashboard');
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

    $scope.logout = function() {
        eurecaJovemStorageAPI.removerUsuarioLogado();
        eurecaJovemStorageAPI.removerChave();
        delete $rootScope.usuarioLogado;
        $mdToast.show($mdToast.simple().textContent("Logout realizado com sucesso"));
        $location.path('dashboard');
    };

    $scope.onClick = function(points, evt) {
        //console.log(points, evt);
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
    $scope.abreMenu = function() {
        $mdSidenav('menuSideBar').toggle();
    };

    //controles de links do menu
    $scope.dashboard = function() {
        $location.path('dashboard');
    };

    $scope.perfil = function() {
        $location.path('perfil');
    };

    $scope.contato = function() {
        $location.path('contato');
    };

    $scope.cadastro = function() {
        $rootScope.loginOuCadastro = 'cadastro';
        $location.path('dashboard');
    };

    $scope.login = function() {
        $rootScope.loginOuCadastro = 'login';
        $location.path('dashboard');
    };

});
