  angular
        .module('app.users',
            [

            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.users', {
            url      : '/users',
            views    : {
                'content@app': {
                    templateUrl: 'views/app/modules/users/users.html',
                    controller : 'UsersController as vm'
                }
            },
            bodyClass: 'users'

        });
        // Translation
        $translatePartialLoaderProvider.addPart('app/modules/users');

        // Navigation
        msNavigationServiceProvider.saveItem('users', {
            title : 'Benutzer',
            icon  : 'icon-account-box',
            state : 'app.users',
            weight: 1
        });

    }
