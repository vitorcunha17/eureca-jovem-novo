angular.module("eurecaJovem").config(function($routeProvider) {

    $routeProvider.when("/login", {
        templateUrl: "view/login.html",
        replace: "true"
    });

    $routeProvider.when("/dashboard", {
        templateUrl: "view/dashboard.html",
        replace: "true",
        controller: "dashboardCtrl"
    });

    $routeProvider.when("/perfil", {
        templateUrl: "view/perfil.html",
        replace: "true",
        controller: "perfilCtrl"
    });

    $routeProvider.when("/contato", {
        templateUrl: "view/contato.html",
        replace: "true",
        controller: "contatoCtrl"
    });

    $routeProvider.when("/cadastro", {
        templateUrl: "view/cadastro.html",
        replace: "true",
        controller: "cadastroCtrl"
    });

     $routeProvider.when("/oportunidade/:url", {
        templateUrl: "view/oportunidade.html",
        replace: "true",
        controller: "oportunidadeCtrl",
        resolve: {
            oportunidade: function(eurecaJovemAPI, $route) {
                return eurecaJovemAPI.buscarOportunidadePorUrlService($route.current.params.url);
            }
        }
    });

      $routeProvider.when("/qualificacaoCadastro", {
        templateUrl: "view/qualificacoesCadastro.html",
        replace: "true",
        controller: "perfilCtrl"
    });



    //Se não coincidir nenhuma rota fazer uma padrão
    $routeProvider.otherwise({ redirectTo: "/dashboard" })
});
