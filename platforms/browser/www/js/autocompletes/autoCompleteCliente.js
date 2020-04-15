  angular.module('eurecaJovem').controller('autoCompleteCliente', autoCompleteCliente);

  function autoCompleteCliente($timeout, $q, eurecaJovemAPI) {
      var self = this;

      // list of `cliente` value/display objects
      self.clientes = loadAll();
      self.selectedItem = null;
      self.searchText = null;
      self.querySearch = querySearch;

      // ******************************
      // Internal methods
      // ******************************

      /**
       * Search for clientes... use $timeout to simulate
       * remote dataservice call.
       */
      function querySearch(query) {
          var results = query ? self.clientes.filter(createFilterFor(query)) : self.clientes;
          var deferred = $q.defer();
          $timeout(function() { deferred.resolve(results); }, Math.random() * 1000, false);
          return deferred.promise;
      };

      /**
       * Build `clientes` list of key/value pairs
       */
      function loadAll() {
          var clientes = [];
          eurecaJovemAPI.filtrarClientesService().then(function(resposta) {
              if (resposta.status == 200) {
                  for (x = 0; x < resposta.data.length; x++) {
                      var objeto = {value: resposta.data[x].nome.toLowerCase(), display: resposta.data[x].nome};
                      clientes.push(objeto);
                  }
              }
          });
          return clientes;
      };

      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);

          return function filterFn(cliente) {
              return (cliente.value.indexOf(lowercaseQuery) === 0);
          };

      };

  };
