angular.module("eurecaJovem").config(function($stateProvider) {


    $stateProvider


    .state("login", {
        templateUrl: "view/login.html",
        replace: "true"
    })

    .state("home", {
        templateUrl: "view/home.html",
        replace: "true"
    })

    .state("dashboard", {
        templateUrl: "view/dashboard.html",
        replace: "true",
        controller: "dashboardCtrl"
    })

    .state("perfil", {
        templateUrl: "view/perfil.html",
        replace: "true",
        controller: "perfilCtrl"
    })

    .state("editarPerfil", {
        templateUrl: "view/perfilEdicao.html",
        replace: "true",
        controller: "perfilCtrl"
    })

    .state("contato", {
        templateUrl: "view/contato.html",
        replace: "true",
        controller: "contatoCtrl"
    })

    .state("cadastro", {
        templateUrl: "view/cadastro.html",
        replace: "true",
        controller: "cadastroCtrl"
    })

    .state("oportunidade/:url", {
        templateUrl: "view/oportunidade.html",
        replace: "true",
        controller: "oportunidadeCtrl",
        resolve: {
            oportunidade: function(eurecaJovemAPI, $route) {
                return eurecaJovemAPI.buscarOportunidadePorUrlService($route.current.params.url);
            }
        }
    })

    .state("qualificacaoCadastro", {
        templateUrl: "view/qualificacoesCadastro.html",
        replace: "true",
        controller: "perfilCtrl"
    })

    .state("oportunidades", {
        templateUrl: "view/oportunidades.html",
        replace: "true",
        controller: "participacaoCtrl"
    })

    .state("desafios", {
        templateUrl: "view/desafios.html",
        replace: "true",
        controller: "participacaoCtrl"
    })



    //Se não coincidir nenhuma rota fazer uma padrão
    $routeProvider.otherwise({ redirectTo: "/dashboard" })

})
