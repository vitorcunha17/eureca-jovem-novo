angular.module("eurecaJovem").controller("rankingCtrl", function (rankDisponivel, $sce, $scope, $rootScope, $routeParams, $location, $mdToast, eurecaJovemAPI, config) {

    //console.log("Ranking", rankDisponivel);

    $scope.ranking = {};

    $scope.ranking.rankeados = JSON.parse(rankDisponivel.data.rankeados);
    $scope.ranking.op = JSON.parse(rankDisponivel.data.oportunidade);
    $scope.ranking.meurank = JSON.parse(rankDisponivel.data.meurank);

});

