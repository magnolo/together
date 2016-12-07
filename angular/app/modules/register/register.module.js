(function ()
{
    'use strict';

    angular
        .module('app.register', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.register', {
            url      : '/register',
            views    : {
                'main@'                          : {
                    templateUrl: 'views/app/modules/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.register': {
                    templateUrl: 'views/app/modules/register/register.html',
                    controller : 'RegisterV2Controller as vm'
                }
            },
            bodyClass: 'register-v2'
        });

        // Translate
        $translatePartialLoaderProvider.addPart('app/modules/register');

     
       
    }

})();