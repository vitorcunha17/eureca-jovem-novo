  angular.module('eurecaJovem').controller('autoCompleteIdioma', autoCompleteIdioma);

  function autoCompleteIdioma($timeout, $q, eurecaJovemAPI) {
      var self = this;

      // list of `idioma` value/display objects
      self.idiomas = loadAll();
      self.selectedItem = null;
      self.searchText = null;
      self.querySearch = querySearch;

      // ******************************
      // Internal methods
      // ******************************

      /**
       * Search for idiomas... use $timeout to simulate
       * remote dataservice call.
       */
      function querySearch(query) {
          var results = query ? self.idiomas.filter(createFilterFor(query)) : self.idiomas;
          var deferred = $q.defer();
          $timeout(function() { deferred.resolve(results); }, Math.random() * 1000, false);
          return deferred.promise;
      };

      /**
       * Build `idiomas` list of key/value pairs
       */
      function loadAll() {
          var idiomas = [];
          eurecaJovemAPI.filtrarIdiomasService().then(function(resposta) {
              if (resposta.status == 200) {
                  for (x = 0; x < resposta.data.length; x++) {
                      var objeto = {value: resposta.data[x].nome.toLowerCase(), display: resposta.data[x].nome};
                      idiomas.push(objeto);
                  }
              }
          });
          //console.log(idiomas);
          return idiomas;
      };

      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);

          return function filterFn(idioma) {
            //console.log("filterFn: " + idioma);
              return (idioma.value.indexOf(lowercaseQuery) === 0);
          };

      };

  };
