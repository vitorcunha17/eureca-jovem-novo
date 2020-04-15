//colchetes - Importação de módulos que você quer usar, você tras diretiva, filtros e outras coisas atráves disso
angular.module("eurecaJovem", ["ngMessages", "ngRoute", "ngMaterial", "ngMaterialDatePicker", "angular-timeline", "youtube-embed", "ngStorage", "angularFileUpload", "slick", "angular-input-stars", "ngSanitize", "ui.knob", "truncate", "ui.mask", "angularTypeform"]).config(function($mdThemingProvider, $mdIconProvider) {
    $mdThemingProvider.theme('default')
    $mdThemingProvider.theme('default')
        .primaryPalette('light-blue', {
            'default': '800', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '200', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '500', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': '900' // use shade A100 for the <code>md-hue-3</code> class
        })
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('red', {
            'default': '500', // use shade 200 for default, and keep all other shades the same
        });

});
