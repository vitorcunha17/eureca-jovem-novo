angular.module("eurecaJovem").controller("dashboardCtrl", function($scope, $routeParams, $location, $mdToast, $mdSidenav, $rootScope, eurecaJovemAPI, eurecaJovemStorageAPI) {

	//$rootScope.diretorioImagens = config.imageServiceURL;

    //inicializa a lista de oportunidades
    if ($location.path() == '/dashboard') {
        eurecaJovemAPI.filtrarOportunidadesAbertasService().then(function(data) {
                if (data.status == 200) {
                	  ////console.log(data.data);
                    $scope.oportunidadesAbertas = data.data;
                } else {
                    $scope.info = data;
                }
            }),
            function error(data) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };
    };

    /*
    $scope.oportunidadesAbertas = [
        { nome: "Estágio Globo.com", img: "globo.png" },
        { nome: "Estágio PepsiCo", img: "pepsico.png" },
    ]; */

    $scope.oportunidade = function(url) {
        $location.path('oportunidade/'+url);
    };


});
