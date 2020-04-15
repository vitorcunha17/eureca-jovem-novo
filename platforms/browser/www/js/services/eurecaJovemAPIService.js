angular.module("eurecaJovem").factory("eurecaJovemAPI", function($http, config) {

    var _login = function(user) {
        return $http.get(config.webServiceURL + "/usuario/login/" + user.nome + "/" + user.senha);
    };

    var _alterarsenha = function(id, senha) {
        return $http.post(config.webServiceURL + "/usuario/novaSenha", { idDoUsuario: id, hashvelho: senha.atual, novaSenha: senha.nova, confirmaSenha: senha.confirma });
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

    var _enviarEmail = function(pessoa) {
        return $http.post(config.webServiceURL + "/pessoa/enviarEmail", pessoa);
    };

    var _filtrarOportunidadesAbertas = function() {
        return $http.get(config.webServiceURL + "/oportunidade/filtrarAbertas");
    };

    var _buscarOportunidadePorUrl = function(url) {
        return $http.get(config.webServiceURL + "/oportunidade/buscarPorURL/" + url);
    };

    var _inscreverVaga = function(inscricao) {
        return $http.post(config.webServiceURL + "/inscricao/meinscrever", inscricao);
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
        enviarEmail: _enviarEmail,
        filtrarOportunidadesAbertasService: _filtrarOportunidadesAbertas,
        buscarOportunidadePorUrlService: _buscarOportunidadePorUrl,
        inscreverVagaService: _inscreverVaga

    }

});
