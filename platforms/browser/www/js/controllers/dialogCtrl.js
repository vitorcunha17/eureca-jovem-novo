angular.module('eurecaJovem')

.controller('dialogCtrl', function($scope, $rootScope, $mdDialog) {
    $scope.status = '  ';
    $scope.customFullscreen = false;

    //$scope.theBestVideo = 'Hd0B-L3s2-Y';

    $scope.showDialog = function(ev, anexo) {
        $scope.video = anexo.link;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'view/dialog.html',
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

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {

            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
});
