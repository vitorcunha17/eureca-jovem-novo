angular.module("eurecaJovem").controller("perfilCtrl", function ($mdDialog, $sce, $http, $scope, $routeParams, $location, $mdToast, $mdSidenav, $rootScope, $sessionStorage, eurecaJovemAPI, eurecaJovemStorageAPI) {

    console.log("Perfil controler");
    $scope.querAlterarImagem = 0;
    var self = this;

    self.hidden = false;
    self.isOpen = false;

    //setando variaveis para atender o combinado
    $rootScope.passoDaJornada = 0;
    $rootScope.statusPreenchido = {};


    $scope.alterarImagem = function () {
        //console.log("alterar imagem");
        $scope.querAlterarImagem = 1;
    }

    $rootScope.habilidades = [];

    $scope.carregarPerfilPessoaSeNulo = function () {
        if (angular.isUndefined($rootScope.pessoa)) {
            ////console.log("TA ENTRANDO AQUI");
            $scope.carregarPerfil();
            $scope.buscarIdiomas();
        }
    };

    //Se não houver oportunidade selecionada direciona pra lista de oportunidades
    if ($location.path() == '/editarPerfil') {
        if (angular.isUndefined($rootScope.pessoa)) {
            $scope.info = "Seu tempo de edição esgotou.";
            $mdToast.show($mdToast.simple().textContent($scope.info));
            $location.path('/perfil');
        }

    };

    //Se não houver oportunidade selecionada direciona pra lista de oportunidades
    if ($location.path() == '/perfil') {
        if (angular.isUndefined($rootScope.pessoa)) {
            $scope.carregarPerfilPessoaSeNulo();
            $location.path('/perfil');
        }

    };

    $scope.salvarPerfil = function (pessoa) {
        //pessoa.apreciacoes.push(pessoa.apreciacao);
        if (pessoa != null) {
            //console.log(pessoa);
            eurecaJovemAPI.salvarPerfil(pessoa).then(function (resposta) {
                if (resposta.status == 200) {
                    $location.path("perfil");
                } else {
                    $scope.error = "Jovem não encontrado";
                    $mdToast.show($mdToast.simple().textContent($scope.error));
                }
            }),
                function (resposta) {
                    $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
                };
        } else {
            var pessoa = {};
            pessoa.idJovem = idJovem;
            $rootScope.pessoa = angular.copy(pessoa);
        }
    };

    $scope.carregarPerfil = function () {
        console.log("Carregar perfil");
        var id = $rootScope.usuarioLogado.id;
        eurecaJovemAPI.buscarPessoaPorIdService($rootScope.pessoa.id).then(function (resposta) {
            if (resposta.status == 200) {
                console.log("resposta carrega perfil", resposta.data);
                var pessoa = resposta.data;
                if (pessoa.aniversario) {
                    pessoa.aniversario = new Date(pessoa.aniversario);
                    $rootScope.statusPreenchido.perfil = true;
                    console.log("tem aniversario: ", $rootScope.statusPreenchido.perfil);

                } else {
                    $rootScope.statusPreenchido.perfil = false;
                }
                if (pessoa.qualificacoes.length > 0) {
                    $rootScope.statusPreenchido.qualificacao = true;
                    console.log("tem qualificacao: ", $rootScope.statusPreenchido.qualificacao);
                    //pessoa.qualificacoes = JSON.parse(pessoa.qualificacoes);
                } else {
                    pessoa.qualificacoes = [];
                    $rootScope.statusPreenchido.qualificacao = false;
                }
                if (pessoa.idiomas.lenght > 0) {
                    $rootScope.statusPreenchido.idioma = true;
                    console.log("tem idioma: ", $rootScope.statusPreenchido.idioma);
                    //pessoa.idiomas = JSON.parse(pessoa.idiomas);
                } else {
                    $rootScope.statusPreenchido.idioma = false;
                    pessoa.idiomas = [];
                }
                if (pessoa.habilidades.length > 0) {
                    $rootScope.statusPreenchido.habilidade = true;
                    console.log("tem habilidades: ", $rootScope.statusPreenchido.habilidade);
                } else {
                    $rootScope.statusPreenchido.habilidade = false;
                }
                if (pessoa.apresentacao != null) {
                    $rootScope.statusPreenchido.apresentacao = true;
                    console.log("tem apresentacao: ", $rootScope.statusPreenchido.apresentacao);
                } else {
                    $rootScope.statusPreenchido.apresentacao = false;
                }
                console.log("Apreciacoes: ", pessoa.apreciacoes.lenght);
                if (pessoa.apreciacoes.lenght > 0) {
                    $rootScope.statusPreenchido.apreciacao = true;

                } else {
                    $rootScope.statusPreenchido.apreciacao = false;
                }
                console.log("tem apreciacao: ", $rootScope.statusPreenchido.apreciacao);
                $rootScope.pessoa = angular.copy(pessoa);
                $rootScope.habilidades = pessoa.habilidades;
                //console.log($rootScope.pessoa);
            } else {
                $scope.error = "Jovem não encontrado";
                $mdToast.show($mdToast.simple().textContent($scope.error));
            }
        });

    };

    $scope.cancelarEdicaoPerfil = function () {
        $location.path("perfil");
    }

    $scope.novaHabilidade = function ($chip) {
        var habilidade = { nome: $chip };
        $rootScope.pessoa.habilidades.push(habilidade);
        return {
            nome: $chip
        }
    }

    $scope.cadastrarApreciacao = function (apreciacao) {
        if (apreciacao != null) {
            $rootScope.pessoa.apreciacao = apreciacao;
        } else {
            $rootScope.pessoa.apreciacao = {};
        }
        $mdSidenav('sideApreciacao').open();
    }

    $scope.cadastrarInfopessoal = function (infopessoal) {
        ////console.log(infopessoal);
        if (infopessoal != null) {
            $rootScope.pessoa.infopessoal = infopessoal;
        } else {
            var infopessoal = {};
            $rootScope.pessoa.infopessoal = angular.copy(infopessoal);
        }
        ////console.log($rootScope.pessoa.infopessoal);
        $mdSidenav('sideInfopessoal').open();
    }

    $scope.cadastrarIdioma = function () {
        if (angular.isUndefined($rootScope.idiomasDisponiveis)) {
            console.log("buscando idiomas");
            $scope.buscarIdiomas();
        }
        $mdSidenav('sideIdiomas').open();
    }

    $scope.cadastrarExperiencia = function () {
        var experiencia = {};
        $rootScope.pessoa.experiencia = angular.copy(experiencia);
        $mdSidenav('sideExperiencia').open();
    }

    $scope.abrirDialogLink = function () {
        $mdSidenav('sideLink').open();
    }

    $scope.cadastrarHabilidade = function () {
        $mdSidenav('sideHabilidade').open();
    }

    $scope.removerApreciacao = function (apreciacao) {
        $rootScope.pessoa.apreciacao = apreciacao;
        $rootScope.pessoa.apreciacao.removido = true;
        this.removeItemList(apreciacao, $rootScope.pessoa.apreciacoes);
        //console.log($rootScope.pessoa);
    }

    $scope.alterarApreciacao = function () {
        if (!angular.isUndefined($rootScope.pessoa.apreciacao.id)) {
            for (i = 0; i < $rootScope.pessoa.apreciacoes.length; i++) {
                if ($rootScope.pessoa.apreciacoes[i].id == $rootScope.pessoa.apreciacao.id) {
                    $rootScope.pessoa.apreciacoes[i] = angular.copy($rootScope.pessoa.apreciacao);
                    break;
                }
            }

        } else {
            $rootScope.pessoa.apreciacoes.push(angular.copy($rootScope.pessoa.apreciacao));
        }
        //console.log($rootScope.pessoa.apreciacoes);
        $mdSidenav('sideApreciacao').close();
    }

    //busca os dados de código postal a partir de um cep
    $scope.buscarCodigoPostal = function (codigoPostal) {
        //console.log("Método de CEP")
        var cep = codigoPostal;
        if (cep.length == 8) {
            eurecaJovemAPI.buscarCodigoPostalService(codigoPostal).then(function (resposta) {
                if (resposta.status == 200) {
                    $rootScope.pessoa.endereco = resposta.data;
                }
            }),
                function (resposta) {
                    $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
                };
        }
    };


    /* Início dos métodos de controle da formação */
    $scope.cadastrarQualificacao = function (qualificacao) {
        if (qualificacao != null) {
            if (qualificacao.inicio != null)
                qualificacao.inicio = new Date(qualificacao.inicio);
            if (qualificacao.fim != null)
                qualificacao.fim = new Date(qualificacao.fim);
            $rootScope.pessoa.qualificacao = qualificacao;
        } else {
            $rootScope.pessoa.qualificacao = {};
        }
        $mdSidenav('sideExperiencia').open();
    };

    $scope.cancelarCadQualificacao = function () {
        delete $rootScope.pessoa.qualificacao;
        $location.path('/editarPerfil');
    }


    this.isOpen = false;

    //grava os dados da e retorna a tela de oportunidade
    $scope.alterarQualificacao = function () {
        //console.log($rootScope.pessoa);
        //trata o requesito quando for uma alteração
        if (!angular.isUndefined($rootScope.pessoa.qualificacao.id)) {
            for (i = 0; i < $rootScope.pessoa.qualificacoes.length; i++) {
                if ($rootScope.pessoa.qualificacoes[i].id == $rootScope.pessoa.qualificacao.id) {
                    $rootScope.pessoa.qualificacoes[i] = angular.copy($rootScope.pessoa.qualificacao);
                    //console.log("Alterar Formação existe: ", $rootScope.pessoa.qualificacoes[i]);
                    $rootScope.pessoa.qualificacao = {};
                    break;

                }
            }

        }
        //trata o requesito quando for uma inclusão
        else {
            $rootScope.pessoa.qualificacao.id = null;
            $rootScope.pessoa.qualificacoes.push(angular.copy($rootScope.pessoa.qualificacao));
        }
        $location.path('/editarPerfil');
    };

    /* Fim dos métodos de controle da formação */

    $scope.editarHabilidades = function () {
        $mdSidenav('sideHabilidade').open();
    }

    //controles do select de Grupo Curso
    $scope.removeItemList = function (item, list) {
        var idx = list.indexOf(item);
        list.splice(idx, 1);
    };

    $scope.openMenu = function ($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
    };


    $scope.buscarIdiomas = function () {
        eurecaJovemAPI.filtrarIdiomasService().then(function (resposta) {
            if (resposta.status == 200) {
                for (var i = 0; i < resposta.data.length; i++) {
                    resposta.data[i].nivel = {};
                }
                $rootScope.idiomasDisponiveis = resposta.data;
            } else {
                $scope.info = resposta.status;
            }
            $mdToast.show($mdToast.simple().textContent($scope.info));
        }),
            function (resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };
    };

    $scope.alterarIdioma = function () {
        if (!angular.isUndefined($rootScope.pessoa.idioma.idIdioma)) {
            //console.log("aqui",$rootScope.pessoa.idioma);
            for (i = 0; i < $rootScope.pessoa.idiomas.length; i++) {
                if ($rootScope.pessoa.idiomas[i].idIdioma == $rootScope.pessoa.idioma.idIdioma) {
                    $rootScope.pessoa.idiomas[i] = angular.copy($rootScope.pessoa.idioma);
                    $rootScope.pessoa.idioma = {};
                    break;
                }
            }

        } else {
            //console.log("Era nova", $rootScope.pessoa.idioma);
            $rootScope.pessoa.idioma.idIdioma = null;
            $rootScope.pessoa.idiomas.push(angular.copy($rootScope.pessoa.idioma));
            $rootScope.pessoa.idioma = {};
        }
    };

    $scope.editarIdioma = function (idioma) {
        $rootScope.pessoa.idioma = idioma;
    }

    $scope.editarPerfil = function () {
        $scope.buscarIdiomas();
        $location.path("editarPerfil");
    }


    $scope.printCurriculo = function () {
        //console.log("Método de impressão");
        $scope.curriculo = {};
        $scope.curriculo = $rootScope.pessoa;
        $scope.curriculo.qualiGradu = [];
        $scope.curriculo.qualiProf = [];
        $scope.curriculo.qualiOutros = [];
        for (i = 0; i < $scope.curriculo.qualificacoes.length; i++) {
            //console.log("Qualificação de teste", $scope.curriculo.qualificacoes[i]);
            if ($scope.curriculo.qualificacoes[i].tipo == 0) {
                //console.log("É de graduação");
                if (!angular.isUndefined($scope.curriculo.qualificacoes[i].inicio)) {
                    $scope.curriculo.qualificacoes[i].inicio = $scope.curriculo.qualificacoes[i].inicio.substring(0, 4);
                } else {
                    $scope.curriculo.qualificacoes[i].inicio = "";
                }
                if (!angular.isUndefined($scope.curriculo.qualificacoes[i].fim)) {
                    $scope.curriculo.qualificacoes[i].fim = $scope.curriculo.qualificacoes[i].fim.substring(0, 4);
                } else {
                    $scope.curriculo.qualificacoes[i].fim = "";
                }
                $scope.curriculo.qualiGradu.push(angular.copy($scope.curriculo.qualificacoes[i]));
            }
            if ($scope.curriculo.qualificacoes[i].tipo == 1) {
                //console.log("É profissional");
                if (!angular.isUndefined($scope.curriculo.qualificacoes[i].inicio)) {
                    $scope.curriculo.qualificacoes[i].inicio = $scope.curriculo.qualificacoes[i].inicio.substring(0, 4);
                    //console.log("tem data inicio");
                } else {
                    $scope.curriculo.qualificacoes[i].inicio = "";
                    //console.log("não tem data inicio");
                }
                if (!angular.isUndefined($scope.curriculo.qualificacoes[i].fim)) {
                    $scope.curriculo.qualificacoes[i].fim = $scope.curriculo.qualificacoes[i].fim.substring(0, 4);
                    //console.log("tem data fim");
                } else {
                    $scope.curriculo.qualificacoes[i].fim = "";
                    //console.log("nao tem data fim");
                }
                $scope.curriculo.qualiProf.push(angular.copy($scope.curriculo.qualificacoes[i]));
                //console.log("Lista prof", $scope.curriculo.qualiProf);
            }
            if ($scope.curriculo.qualificacoes[i].tipo == 2) {
                //console.log("É de graduação");
                if (!angular.isUndefined($scope.curriculo.qualificacoes[i].inicio)) {
                    $scope.curriculo.qualificacoes[i].inicio = $scope.curriculo.qualificacoes[i].inicio.substring(0, 4);
                } else {
                    $scope.curriculo.qualificacoes[i].inicio = "";
                }
                if (!angular.isUndefined($scope.curriculo.qualificacoes[i].fim)) {
                    $scope.curriculo.qualificacoes[i].fim = $scope.curriculo.qualificacoes[i].fim.substring(0, 4);
                } else {
                    $scope.curriculo.qualificacoes[i].fim = "";
                }
                $scope.curriculo.qualiOutros.push(angular.copy($scope.curriculo.qualificacoes[i]));
            }
        }
        //console.log("vou passar isso:", $scope.curriculo);
        //$scope.printGenerico($scope.curriculo, 'HJmahhp_W').then(function (result) {
            $scope.printGenerico($scope.curriculo, 'SyKsD3vhZ').then(function(result) {
            var file = new Blob([result.data], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(file);
            $scope.content = $sce.trustAsResourceUrl(fileURL);
            //console.log("resultado impressao:", $scope.content);
            $scope.showDialogReport();
        });

    };

    $scope.printGenerico = function (infos, shortid) {
        //console.log("Dados enviados pro relatório", infos);
        //var reportUrl = "https://gutem.jsreportonline.net/api/report";
        var reportUrl = "http://anga-reports.jelasticlw.com.br/api/report";
        var reportParameters = { "template": { "shortid": shortid }, "data": { "curriculo": infos } };
        return $http.post(reportUrl, reportParameters, { responseType: 'arraybuffer' }).then(function (response) {
            return response;
        });

    };

    $scope.showDialogReport = function () {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'view/dialogImpressao.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,  // do not forget this if use parent scope
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

    //enuns
    $scope.generos = [{ valor: "0", descricao: "Não informado" },
    { valor: "1", descricao: "Masculino" },
    { valor: "2", descricao: "Feminino" }
    ];

    $scope.niveis = [
        { valor: "1", descricao: "Básico" },
        { valor: "2", descricao: "Intermediário" },
        { valor: "3", descricao: "Avançado" },
        { valor: "4", descricao: "Fluente" }
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
    { valor: "2", descricao: "Outros cursos" },
    { valor: "3", descricao: "Outras" }
    ];



    /*métodos do novo perfil */
    $scope.salvarIdiomas = function () {
        var jovemEdit = {};
        jovemEdit.id_pessoa = $rootScope.pessoa.id;
        jovemEdit.idiomas = [];
        jovemEdit.idiomas = $rootScope.pessoa.idiomas;
        eurecaJovemAPI.perfilIdiomasService(jovemEdit).then(function (resposta) {
            if (resposta.status == 200) {
                //$location.path("perfil");
                $mdToast.show($mdToast.simple().textContent(resposta.data));
                $mdSidenav('sideIdiomas').close();
                $rootScope.statusPreenchido.idioma = true;
                $scope.checaPorcentagem();
            } else {
                $mdToast.show($mdToast.simple().textContent(resposta.data));
            }
        }),
            function (resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };

    }


    $scope.salvarHabilidades = function () {
        var jovemEdit = {};
        jovemEdit.id_pessoa = $rootScope.pessoa.id;
        jovemEdit.habilidades = [];
        jovemEdit.habilidades = $rootScope.pessoa.habilidades;
        eurecaJovemAPI.perfilHabilidadesService(jovemEdit).then(function (resposta) {
            if (resposta.status == 200) {
                //$location.path("perfil");
                $mdToast.show($mdToast.simple().textContent(resposta.data));
                $mdSidenav('sideHabilidade').close();
                $rootScope.statusPreenchido.habilidade = true;
                $scope.checaPorcentagem();
            } else {
                $mdToast.show($mdToast.simple().textContent(resposta.data));
            }
        }),
            function (resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };

    }

    $scope.salvarApreciacoes = function () {
        if (!$rootScope.pessoa.apreciacao.id) {
            $rootScope.pessoa.apreciacoes.push($rootScope.pessoa.apreciacao);
        }
        var jovemEdit = {};
        jovemEdit.id_pessoa = $rootScope.pessoa.id;
        jovemEdit.apreciacoes = [];
        jovemEdit.apreciacoes = $rootScope.pessoa.apreciacoes;
        eurecaJovemAPI.perfilApreciacoesService(jovemEdit).then(function (resposta) {
            if (resposta.status == 200) {
                //$location.path("perfil");
                $mdToast.show($mdToast.simple().textContent(resposta.data));
                $mdSidenav('sideApreciacao').close();
                $rootScope.statusPreenchido.apreciacao = true;
                $scope.checaPorcentagem();
            } else {
                $mdToast.show($mdToast.simple().textContent(resposta.data));
            }
        }),
            function (resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };

    }


    $scope.salvarInfosPessoais = function () {
        var jovemEdit = {};
        jovemEdit = $rootScope.pessoa;
        jovemEdit.id_pessoa = $rootScope.pessoa.id;
        eurecaJovemAPI.perfilInfosPessoaisService(jovemEdit).then(function (resposta) {
            if (resposta.status == 200) {
                //$location.path("perfil");
                $mdToast.show($mdToast.simple().textContent(resposta.data));
                $mdSidenav('sideInfopessoal').close();
                $rootScope.statusPreenchido.perfil = true;
                $scope.checaPorcentagem();
            } else {
                $mdToast.show($mdToast.simple().textContent(resposta.data));
            }
        }),
            function (resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };

    }

    $scope.salvarQualificacao = function () {
        if (!$rootScope.pessoa.qualificacao.id) {
            $rootScope.pessoa.qualificacoes.push($rootScope.pessoa.qualificacao);
        }
        var jovemEdit = {};
        jovemEdit.id_pessoa = $rootScope.pessoa.id;
        jovemEdit.qualificacoes = [];
        jovemEdit.qualificacoes = $rootScope.pessoa.qualificacoes;
        eurecaJovemAPI.perfilQualificacoesService(jovemEdit).then(function (resposta) {
            if (resposta.status == 200) {
                //$location.path("perfil");
                delete $rootScope.pessoa.qualificacao;
                $mdToast.show($mdToast.simple().textContent(resposta.data));
                $mdSidenav('sideExperiencia').close();
                $rootScope.statusPreenchido.qualificacao = true;
                $scope.checaPorcentagem();
            } else {
                $mdToast.show($mdToast.simple().textContent(resposta.data));
            }
        }),
            function (resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };

    }

    $scope.removerQualificacao = function (q) {
        if (q != null) {
            $scope.removeItemList(q, $rootScope.pessoa.qualificacoes);
        }
        var jovemEdit = {};
        jovemEdit.id_pessoa = $rootScope.pessoa.id;
        jovemEdit.qualificacoes = [];
        jovemEdit.qualificacoes = $rootScope.pessoa.qualificacoes;
        eurecaJovemAPI.perfilQualificacoesService(jovemEdit).then(function (resposta) {
            if (resposta.status == 200) {
                //$location.path("perfil");
                $mdToast.show($mdToast.simple().textContent(resposta.data));
                $mdSidenav('sideExperiencia').close();
            } else {
                $mdToast.show($mdToast.simple().textContent(resposta.data));
            }
        }),
            function (resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };

    }

    $scope.removerApreciacao = function (q) {
        if (q != null) {
            $scope.removeItemList(q, $rootScope.pessoa.apreciacoes);
        }
        var jovemEdit = {};
        jovemEdit.id_pessoa = $rootScope.pessoa.id;
        jovemEdit.apreciacoes = [];
        jovemEdit.apreciacoes = $rootScope.pessoa.apreciacoes;
        eurecaJovemAPI.perfilApreciacoesService(jovemEdit).then(function (resposta) {
            if (resposta.status == 200) {
                //$location.path("perfil");
                $mdToast.show($mdToast.simple().textContent(resposta.data));
                $mdSidenav('sideApreciacao').close();
            } else {
                $mdToast.show($mdToast.simple().textContent(resposta.data));
            }
        }),
            function (resposta) {
                $mdToast.show($mdToast.simple().textContent("Falha de conexão com o Servidor"));
            };

    }


    $scope.checaPorcentagem = function () {
        console.log("atualizando porcentagem", $rootScope.pessoa.percentPerfil);
        var porcentagem = 10;
        if ($rootScope.pessoa.percentPerfil < 90) {
            if ($rootScope.statusPreenchido.perfil = true) {
                porcentagem = porcentagem + 10;
            }
            if ($rootScope.statusPreenchido.idioma = true) {
                porcentagem = porcentagem + 10;
            }
            if ($rootScope.statusPreenchido.qualificacao = true) {
                porcentagem = porcentagem + 10;
            }
            if ($rootScope.statusPreenchido.habilidade = true) {
                porcentagem = porcentagem + 10;
            }
            if ($rootScope.statusPreenchido.apreciacao = true) {
                porcentagem = porcentagem + 10;
            }
            $rootScope.pessoa.percentPerfil = $rootScope.pessoa.percentPerfil + porcentagem;
        } else {
            $rootScope.passoDaJornada = 1;
        }
    };


    $scope.salvarEval = function() {
        $rootScope.passoDaJornada = 2;
    }

    $scope.enviaLink = function() {
        $rootScope.passoDaJornada = 3;
    }

});
