  angular
        .module('app.login',
            [
          
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.login', {
            url      : '/login',
            views    : {
                'main@': {
                    templateUrl: 'views/app/modules/core/layouts/content-only.html',
                    controller: 'MainController as vm'
                },
                'content@app.login': {
                    templateUrl: 'views/app/modules/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'locations'

        });
        // Translation
        $translatePartialLoaderProvider.addPart('app/modules/login');

        
    }