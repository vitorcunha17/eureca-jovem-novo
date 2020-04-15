angular.module("eurecaJovem").config(function($routeProvider) {

    $routeProvider.when("/", {
        replace: "true",
        controller: "eurecaJovemCtrl"
    });

    $routeProvider.when("/login", {
        templateUrl: "view/login.html",
        replace: "true"
    });

    $routeProvider.when("/dashboard", {
        templateUrl: "pages/dashboard/dashboard.html",
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
        //controller: "cadastroCtrl"
    });

    $routeProvider.when("/oportunidade/:url", {
        templateUrl: "pages/oportunidade/oportunidade.html",
        replace: "true",
        controller: "oportunidadeCtrl"
    });

    $routeProvider.when("/qualificacaoCadastro", {
        templateUrl: "view/qualificacoesCadastro.html",
        replace: "true",
        controller: "perfilCtrl"
    });

    $routeProvider.when("/oportunidades", {
        templateUrl: "pages/oportunidades/oportunidades.html",
        replace: "true",
        controller: "oportunidadesCtrl"
    });

    $routeProvider.when("/obrigadoInscricao", {
        templateUrl: "view/obrigadoInscricao.html",
        replace: "true"
        
    });

    $routeProvider.when("/trilha/:url", {
        templateUrl: "pages/trilha/trilha.html",
        replace: "true",
        controller: "trilhaCtrl"
    });
   

    $routeProvider.when("/ranking/:url/:id", {
        templateUrl: "view/ranking.html",
        replace: "true",
        controller: "rankingCtrl",
        resolve: {
            rankDisponivel: function(eurecaJovemAPI, $route) {
                return eurecaJovemAPI.buscarRankingPorUrlService($route.current.params.url, $route.current.params.id);
            }
        }
    });


    //Se não coincidir nenhuma rota fazer uma padrão
    $routeProvider.otherwise({ redirectTo: "/dashboard" })

});
