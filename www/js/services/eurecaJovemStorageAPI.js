/*
OK, i'm so happy by implementing this service. =D
It is an alternative to the rootscope that we are using in the controllers.
*/
angular.module("eurecaJovem").factory("eurecaJovemStorageAPI", function($window, $rootScope) {
    /*
    this shot an digest cycle to all scopes that are using this object key.
    Here is where the true magic happens! It is really cool!
    */
    angular.element($window).on('storage', function(event) {
        if (event.key === 'usuarioLogado') {
            $rootScope.$apply();
        }
    });
    return {
        setarUsuarioLogado: function(val) {
            $window.localStorage && $window.localStorage.setItem('usuarioLogado', JSON.stringify(val));
            return this;
        },
        pegarUsuarioLogado: function() {
            var p = $window.localStorage && $window.localStorage.getItem('usuarioLogado');
            return JSON.parse(p);
        },
        removerUsuarioLogado: function() {
            return $window.localStorage && $window.localStorage.removeItem('usuarioLogado');
        },
        setarChave: function(val) {
            $window.localStorage && $window.localStorage.setItem('authkey', val);
            return this;
        },
        pegarChave: function() {
            var p = $window.localStorage && $window.localStorage.getItem('authkey');
            return p;
        },
        removerChave: function() {
            return $window.localStorage && $window.localStorage.removeItem('authkey');
        },
        setarNecessarios: function(val) {
            $window.localStorage && $window.localStorage.setItem('necessarios', JSON.stringify(val));
            return this;
        },
        pegarNecessarios: function() {
            var p = $window.localStorage && $window.localStorage.getItem('necessarios');
            return JSON.parse(p);
        }
    };

});
