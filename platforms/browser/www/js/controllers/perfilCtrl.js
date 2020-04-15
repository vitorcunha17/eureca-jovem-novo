angular.module("eurecaJovem").controller("perfilCtrl", function($scope, $routeParams, $location, $mdToast, $mdSidenav, $rootScope, $sessionStorage, eurecaJovemAPI, eurecaJovemStorageAPI) {

    var self = this;

    self.hidden = false;
    self.isOpen = false;

    $scope.carregarPerfilPessoaSeNulo = function() {
        if (angular.isUndefined($rootScope.pessoa)) {
            $scope.carregarPerfil();
        }
    }

    $scope.salvarPerfil = function(pessoa) {
        /* acho que não precisa disso nao kkkk
        var dia = pessoa.aniversario.getDate();
        var mes = pessoa.aniversario.getMonth() + 1;
        var ano = pessoa.aniversario.getFullYear();
        pessoa.aniversario = dia + "/" + mes + "/" + ano;
        //console.log(pessoa);
        for (var i = 0; i < pessoa.qualificacoes.length; i++) {
            var inicio = pessoa.qualificacoes[i].inicio;
            var fim = pessoa.qualificacoes[i].fim;
            dia = inicio.getDate();
            mes = inicio.getMonth() + 1;
            ano = inicio.getFullYear();
            pessoa.qualificacoes[i].inicio = dia + "/" + mes + "/" + ano;
            dia = fim.getDate();
            mes = fim.getMonth() + 1;
            ano = fim.getFullYear();
            pessoa.qualificacoes[i].fim = dia + "/" + mes + "/" + ano;
        }
        //console.log(pessoa);*/
        if (pessoa != null) {
            eurecaJovemAPI.salvarPerfil(pessoa).then(function(resposta) {
                    if (resposta.status == 200) {
                        //$rootScope.pessoa.aniversario = new Date(ano, mes - 1, dia);
                        //$mdToast.show($mdToast.simple().textContent(resposta.data));
                        //var pessoa = resposta.data;
                        //$rootScope.pessoa = angular.copy(pessoa);
                        //$sessionStorage.userLogado = pessoa;
                        //eurecaJovemStorageAPI.setarUsuarioLogado(pessoa);
                    } else {
                        $scope.error = "Jovem não encontrado";
                        $mdToast.show($mdToast.simple().textContent($scope.error));
                    }
                }),
                function(resposta) {
                    $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
                };
        } else {
            var pessoa = {};
            pessoa.idJovem = idJovem;
            $rootScope.pessoa = angular.copy(pessoa);
        }
    };

    $scope.carregarPerfil = function() {
        //console.log("Carregar perfil");
        //$rootScope.pessoa = $sessionStorage.userLogado;
        var id = $sessionStorage.userLogado.id;
        eurecaJovemAPI.buscarPessoaPorIdService(id).then(function(resposta) {
            if (resposta.status == 200) {
                var pessoa = resposta.data;
                //$sessionStorage.userLogado.apresentacao = pessoa.apresentacao;
                //$sessionStorage.userLogado.genero = pessoa.genero;
                //$sessionStorage.userLogado.dataNascimento = pessoa.dataNascimento;
                //$sessionStorage.userLogado.enderecos = pessoa.enderecos;
                //$rootScope.pessoa = $sessionStorage.userLogado;
                ////console.log($rootScope.pessoa);
                if (pessoa.aniversario) {
                    //console.log("tem aniversario");
                    pessoa.aniversario = new Date(pessoa.aniversario);

                }
                if (pessoa.endereco) {
                    //console.log("tem endereco");
                    pessoa.endereco = JSON.parse(pessoa.endereco);
                }
                if (pessoa.qualificacoes) {
                    //console.log("tem qualificacoes");
                    //pessoa.qualificacoes = JSON.parse(pessoa.qualificacoes);
                } else {
                    pessoa.qualificacoes = [];
                }

                $rootScope.pessoa = angular.copy(pessoa);
                //console.log($rootScope.pessoa);

                /*
                var data = $rootScope.pessoa.aniversario.split("/");
                var dia = data[0];
                var mes = data[1];
                var ano = data[2];
                $rootScope.pessoa.aniversario = new Date(ano, mes - 1, dia);

                for (var i = 0; i < $rootScope.pessoa.qualificacoes.length; i++) {
                    var inicio = $rootScope.pessoa.qualificacoes[i].inicio;
                    var fim = $rootScope.pessoa.qualificacoes[i].fim;

                    inicio = inicio.split("/");
                    inicio = new Date(inicio[2], inicio[1] - 1, inicio[0]);

                    fim = fim.split("/");
                    fim = new Date(fim[2], fim[1] - 1, fim[0]);
                    $rootScope.pessoa.qualificacoes[i].inicio = inicio;
                    $rootScope.pessoa.qualificacoes[i].fim = fim;
                }*/

                ////console.log($rootScope.pessoa);
            } else {
                $scope.error = "Jovem não encontrado";
                $mdToast.show($mdToast.simple().textContent($scope.error));
            }
        });
        ////console.log($sessionStorage.userLogado);
        /*if (usuarioLogado != null) {
            eurecaJovemAPI.buscarPessoaPorIdService(usuarioLogado.data.id).then(function(resposta) {
                    if (resposta.status == 200) {
                        var pessoa = resposta.data;
                        $rootScope.pessoa = angular.copy(pessoa);
                    } else {
                        $scope.error = "Jovem não encontrado";
                        $mdToast.show($mdToast.simple().textContent($scope.error));
                    }
                }),
                function(resposta) {
                    $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
                };
        } else {
            var pessoa = {};
            $rootScope.pessoa = angular.copy(pessoa);
        }*/
    };

    //busca os dados de código postal a partir de um cep
    $scope.buscarCodigoPostal = function(codigoPostal) {
        //console.log("Método de CEP")
        var cep = codigoPostal;
        if (cep.length == 8) {
            eurecaJovemAPI.buscarCodigoPostalService(codigoPostal).then(function(resposta) {
                    //console.log(resposta);
                    if (resposta.status == 200) {
                        $scope.info = "Consulta realizada com sucesso";
                        //console.log(resposta.data);
                        $rootScope.pessoa.endereco = resposta.data;
                    } else {
                        $scope.info = resposta.status;
                    }
                    $mdToast.show($mdToast.simple().textContent($scope.info));
                }),
                function(resposta) {
                    $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
                };
        }
    };


    /* Início dos métodos de controle da formação */
    $scope.cadastrarQualificacao = function(qualificacao) {
        //trata a vaga existente
        if (qualificacao != null) {
            //alterando o tipo das datas
            if (qualificacao.inicio != null)
                qualificacao.inicio = new Date(qualificacao.inicio);
            if (qualificacao.fim != null)
                qualificacao.fim = new Date(qualificacao.fim);
            //if (qualificacao.curso)
            //    qualificacao.curso = JSON.parse(qualificacao.curso);
            //trata a nova vaga
            $rootScope.pessoa.qualificacao = qualificacao;
        } else {

            $rootScope.pessoa.qualificacao = {};
        }
        $location.path('/qualificacaoCadastro');
    };

    $scope.cancelarCadQualificacao = function() {
        delete $rootScope.pessoa.qualificacao;
        $location.path('/perfil');
    }


    this.isOpen = false;

    //grava os dados da e retorna a tela de oportunidade
    $scope.alterarQualificacao = function() {
        //trata o requesito quando for uma alteração
        if (!angular.isUndefined($rootScope.pessoa.qualificacao.idQualificacao)) {
            for (i = 0; i < $rootScope.pessoa.qualificacoes.length; i++) {
                if ($rootScope.pessoa.qualificacoes[i].idQualificacao == $rootScope.pessoa.qualificacao.idQualificacao) {
                    $rootScope.pessoa.qualificacoes[i] = angular.copy($rootScope.pessoa.qualificacao);
                    //console.log("Alterar Formação existe: ", $rootScope.pessoa.qualificacoes[i]);
                    $rootScope.pessoa.qualificacao = {};
                    break;

                }
            }

        }
        //trata o requesito quando for uma inclusão
        else {
            $rootScope.pessoa.qualificacao.idQualificacao = null;
            $rootScope.pessoa.qualificacoes.push(angular.copy($rootScope.pessoa.qualificacao));
        }
        $location.path('/perfil');
    };

    /* Fim dos métodos de controle da formação */

    //controles do select de Grupo Curso
    $scope.removeItemList = function(item, list) {
        var idx = list.indexOf(item);
        list.splice(idx, 1);
    };

    $scope.openMenu = function($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
    };


    //enuns
    $scope.generos = [{ valor: "0", descricao: "Não informado" },
        { valor: "1", descricao: "Masculino" },
        { valor: "2", descricao: "Feminino" }
    ];

    $scope.niveis = [
        { valor: "0", descricao: "Básico" },
        { valor: "1", descricao: "Intermediário" },
        { valor: "2", descricao: "Avançado" },
        { valor: "3", descricao: "Fluente" }
    ];

    $scope.cursos = [{ valor: "0", curso: "Administração em Comércio Exterior" },
        { valor: "1", curso: "Administração de Empresas" },
        { valor: "2", curso: "Administração Hospitalar" },
        { valor: "3", curso: "Administração Legislativa" },
        { valor: "4", curso: "Administração Pública" },
        { valor: "5", curso: "Administração Hospitalar" },
        { valor: "6", curso: "Administração Rural Agroindustrial" },
        { valor: "7", curso: "Administração em Gestão Organizacional" }
    ];

    $scope.tipoQualificacao = [{ valor: "0", descricao: "Formação acadêmica" },
        { valor: "1", descricao: "Experiência profissional" },
        { valor: "2", descricao: "Outros cursos" }
    ];

});
