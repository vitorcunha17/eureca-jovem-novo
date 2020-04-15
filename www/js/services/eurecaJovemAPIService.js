angular.module("eurecaJovem").factory("eurecaJovemAPI", function($http, config) {

    var _login = function(user) {
        return $http.get(config.webServiceURL + "/usuario/login/" + user.nome + "/" + user.senha + "/" + "user");
    };

    var _alterarsenha = function(id, senhas) {
        return $http.post(config.webServiceURL + "/usuario/novaSenha", { id: id, hashvelho: senhas.senhaAtual, novaSenha: senhas.novaSenha, confirmaSenha: senhas.confirmaSenha });
    };

    var _recuperarsenha = function(cpf) {
        return $http.post(config.webServiceURL + "/usuario/recuperarsenha", cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4"));
    };

    var _buscarCodigoPostal = function(codigoPostal) {
        return $http.get("https://viacep.com.br/ws/" + codigoPostal + "/json/");
    };

    var _filtrarClientes = function() {
        return $http.get(config.webServiceURL + "/cliente/filtrarTodos");
    };

    var _buscarClientePorId = function(idCliente) {
        return $http.get(config.webServiceURL + "/cliente/buscarPorId/" + idCliente);
    };

    var _salvarCliente = function(cliente) {
        return $http.post(config.webServiceURL + "/cliente/salvar", cliente);
    };

    var _filtrarOportunidades = function() {
        return $http.get(config.webServiceURL + "/oportunidade/filtrarTodos");
    };

    var _buscarOportunidadePorId = function(idCliente) {
        return $http.get(config.webServiceURL + "/oportunidade/buscarPorId/" + idCliente);
    };

    var _salvarOportunidade = function(cliente) {
        return $http.post(config.webServiceURL + "/oportunidade/salvar", cliente);
    };

    var _filtrarIdiomas = function() {
        return $http.get(config.webServiceURL + "/oportunidade/filtrarTodosIdiomas");
    };

    var _filtrarCursos = function() {
        return $http.get(config.webServiceURL + "/oportunidade/filtrarTodosCursos");
    };

    var _buscarPessoaPorId = function(idPessoa) {
        return $http.get(config.webServiceURL + "/pessoa/buscarPorId/" + idPessoa);
    };

    var _salvarPerfil = function(pessoa) {
        return $http.post(config.webServiceURL + "/pessoa/salvarPerfil", pessoa);
    };

    var _cadastrar = function(usuario) {
        return $http.post(config.webServiceURL + "/usuario/cadastrar", usuario);
    };

    var _enviarEmail = function(email) {
        return $http.post(config.webServiceURL + "/pessoa/enviarEmail", email);
    };

    var _filtrarOportunidadesAbertas = function(userId) {
        return $http.get(config.webServiceURL + "/oportunidade/filtrarAbertas/" + userId);
    };

    var _buscarOportunidadePorUrl = function(url) {
        return $http.get(config.webServiceURL + "/oportunidade/buscarPorURL/" + url);
    };

    var _inscreverVaga = function(inscricao) {
        return $http.post(config.webServiceURL + "/inscricao/meinscrever", inscricao);
    };

    var _buscarParticipacoes = function(pessoa) {
        return $http.get(config.webServiceURL + "/inscricao/buscarparticipacoes/" + pessoa);
    };

    var _passwordReset = function(email) {
        return $http.get(config.webServiceURL + "/usuario/recuperarsenha/" + email);
    };

    var _checarInscricao = function(idJovem,idOportunidade) {
        return $http.get(config.webServiceURL + "/inscricao/checainscrito/" + idJovem + "/" + idOportunidade);
    };

    var _buscarJovemDesafios = function(url,jovem) {
        return $http.get(config.webServiceURL + "/inscricao/buscarJovemDesafios/" + url + "/" + jovem);
    };

    var _buscarDesafiosEntregues = function(id, idOp) {
        return $http.get(config.webServiceURL + "/inscricao/buscarDesafiosEntregues/" + id + "/" + idOp);
    };

    var _enviarDesafioLink = function(envio) {
        return $http.post(config.webServiceURL + "/inscricao/enviarLink", envio);
    };

    var _buscarRankPorUrl = function(url, idUser) {
        return $http.get(config.webServiceURL + "/oportunidade/buscarRankURL/" + url+"/"+idUser);
    };

    var _filtrarTodasOpsEmail = function() {
        return $http.get(config.webServiceURL + "/pessoa/filtrarTodasOpsEmail");
    };

    var _perfilIdiomas = function(pessoa) {
        return $http.post(config.webServiceURL + "/amigos/idiomas", pessoa);
    };

    var _perfilHabilidades = function(pessoa) {
        return $http.post(config.webServiceURL + "/amigos/habilidades", pessoa);
    };

    var _perfilApreciacoes = function(pessoa) {
        return $http.post(config.webServiceURL + "/amigos/apreciacoes", pessoa);
    };

    var _perfilInfosPessoais = function(pessoa) {
        return $http.post(config.webServiceURL + "/amigos/infosp", pessoa);
    };

    var _perfilQualificacoes = function(pessoa) {
        return $http.post(config.webServiceURL + "/amigos/qualificacoes", pessoa);
    };

    return {
        loginService: _login,
        alterarSenhaService: _alterarsenha,
        recuperarSenhaService: _recuperarsenha,
        buscarCodigoPostalService: _buscarCodigoPostal,
        filtrarClientesService: _filtrarClientes,
        buscarClientePorIdService: _buscarClientePorId,
        salvarClienteService: _salvarCliente,
        filtrarOportunidadesService: _filtrarOportunidades,
        buscarOportunidadePorIdService: _buscarOportunidadePorId,
        salvarOportunidadeService: _salvarOportunidade,
        filtrarIdiomasService: _filtrarIdiomas,
        filtrarCursosService: _filtrarCursos,
        buscarPessoaPorIdService: _buscarPessoaPorId,
        salvarPerfil: _salvarPerfil,
        cadastrar: _cadastrar,
        enviarEmailService: _enviarEmail,
        filtrarOportunidadesAbertasService: _filtrarOportunidadesAbertas,
        buscarOportunidadePorUrlService: _buscarOportunidadePorUrl,
        inscreverVagaService: _inscreverVaga,
        buscarParticipacoesService: _buscarParticipacoes,
        passwordResetService: _passwordReset,
        checarInscricaoService: _checarInscricao,
        buscarJovemDesafiosService: _buscarJovemDesafios,
        buscarDesafiosEntreguesService: _buscarDesafiosEntregues,
        enviarDesafioLinkService: _enviarDesafioLink,
        buscarRankingPorUrlService: _buscarRankPorUrl,
        filtrarTodasOpsEmailService: _filtrarTodasOpsEmail,
        perfilIdiomasService: _perfilIdiomas,
        perfilApreciacoesService: _perfilApreciacoes,
        perfilHabilidadesService: _perfilHabilidades,
        perfilInfosPessoaisService: _perfilInfosPessoais,
        perfilQualificacoesService: _perfilQualificacoes

    }

});
