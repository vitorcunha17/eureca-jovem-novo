  angular.module('eurecaJovem').controller('autoCompleteCurso', autoCompleteCurso);

  function autoCompleteCurso($timeout, $q, eurecaJovemAPI) {
      var self = this;

      // list of `curso` value/display objects
      self.cursos = loadAll();
      self.selectedItem = null;
      self.searchText = null;
      self.querySearch = querySearch;
      self.filterSelected = true;

      // ******************************
      // Internal methods
      // ******************************

      /**
       * Search for cursos... use $timeout to simulate
       * remote dataservice call.
       */
      function querySearch(query) {
          var results = query ? self.cursos.filter(createFilterFor(query)) : self.cursos;
          var deferred = $q.defer();
          $timeout(function() { deferred.resolve(results); }, Math.random() * 1000, false);
          return deferred.promise;
      };

      /**
       * Build `Cursos` list of key/value pairs
       */
      function loadAll() {
          var cursos = [];
          eurecaJovemAPI.filtrarCursosService().then(function(resposta) {
              if (resposta.status == 200) {
                  for (x = 0; x < resposta.data.length; x++) {
                      var objeto = {value: resposta.data[x].nome.toLowerCase(), display: resposta.data[x].nome};
                      cursos.push(objeto);
                  }
              }
          });
          //console.log(cursos);
          return cursos;
      };

      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);

          return function filterFn(curso) {
            //console.log("filterFn: " + curso);
              return (curso.value.indexOf(lowercaseQuery) === 0);
          };

      };

  };
