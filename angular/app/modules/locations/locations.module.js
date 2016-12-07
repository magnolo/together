  angular
        .module('app.locations',
            [
          
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.locations', {
            data:{
                auth:true
            },
            url      : '/locations',
            views    : {
                'content@app': {
                    templateUrl: 'views/app/modules/locations/locations.html',
                    controller : 'LocationsController as vm'
                }
            },
            bodyClass: 'locations'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/modules/locations');

        // Navigation
        msNavigationServiceProvider.saveItem('locations', {
            title : 'Locations',
            icon  : 'icon-map-marker',
            state : 'app.locations',
            weight: 0
        });
    }