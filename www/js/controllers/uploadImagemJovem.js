angular.module("eurecaJovem").controller("uploadImagemJovem", function ($scope, $routeParams, $location, $mdToast, $rootScope, eurecaJovemStorageAPI, FileUploader, $http, $sessionStorage) {

    var encodedString = eurecaJovemStorageAPI.pegarChave();

    var uploader = $scope.uploaderAvatar = new FileUploader({
        //url: 'http://localhost:8080/eureca/ws/arquivos/enviarAvatar',
        url: 'https://back.eureca.me/ws/arquivos/enviarAvatar',
        headers: { 'Authorization': 'Basic ' + encodedString }

    });

    // FILTERS

    // a sync filter
    uploader.filters.push({
        name: 'syncFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            //console.log('syncFilter');
            return this.queue.length < 10;
        }
    });

    // an async filter
    uploader.filters.push({
        name: 'asyncFilter',
        fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
            //console.log('asyncFilter');
            setTimeout(deferred.resolve, 1e3);
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
        //console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function (fileItem) {
        //console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function (addedFileItems) {
        //console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function (item) {
        //console.log("before upload");
        item.formData.push({ jovem: $rootScope.usuarioLogado.id });
        //console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function (fileItem, progress) {
        //console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function (progress) {
        //console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        //console.info('onSuccessItem', fileItem, response, status, headers);
        $rootScope.pessoa.imagem = response.imagem;

    };
    uploader.onErrorItem = function (fileItem, response, status, headers) {
        //console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function (fileItem, response, status, headers) {
        //console.info('onCancelItem', fileItem, response, status, headers);

    };
    uploader.onCompleteItem = function (fileItem, response, status, headers) {
        //console.info('onCompleteItem', fileItem, response, status, headers);
        /*if ($location.path().split(/[\s/]+/).pop() == "oportunidadeCadastro") {
            $scope.adicionaListaAnexo(response, $rootScope.oportunidade.anexos);
        }*/
    };
    uploader.onCompleteAll = function () {
        //console.info('onCompleteAll');
    };


    //adicionando as imagens na coleção durante o envio.
    $scope.adicionaListaAnexo = function (item, list) {
        var idx = list.indexOf(item);
        list.push(item);
    };

    ////console.info('uploader', uploader);

});
