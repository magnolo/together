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
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_register-v2': {
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