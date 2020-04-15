  angular.module('eurecaJovem').controller('autoCompleteCidade', autoCompleteCidade);

  function autoCompleteCidade ($timeout, $q, eurecaECBrasil) {
    var self = this;

    // list of `cidade` value/display objects
    self.cidades       = loadAll();
    self.selectedItem  = null;
    self.searchText    = null;
    self.querySearch   = querySearch;

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for cidades... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.cidades.filter( createFilterFor(query) ) : self.cidades;
      var deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    };

    /**
     * Build `cidades` list of key/value pairs
     */
    function loadAll() {
      var cidades = eurecaECBrasil.filtrarCidadeTextoService();
      return cidades.split(/, +/g).map( function (cidade) {
        return {
          value: cidade.toLowerCase(),
          display: cidade
        };        
      });
    };

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(cidade) {
        return (cidade.value.indexOf(lowercaseQuery) === 0);
      };

    };

  };