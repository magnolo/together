  angular
      .module('app.locations', [
          'wipImageZoom',
          'datatables',
          'flow',
          // 'nvd3',
          'textAngular',
          //'uiGmapgoogle-maps',
          'xeditable'
      ])
      .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
      // State
      $stateProvider
          .state('app.locations', {
              data: {
                  auth: true
              },
              url: '/locations',
              views: {
                  'content@app': {
                      templateUrl: 'views/app/modules/locations/locations/locations.html',
                      controller: 'LocationsController as vm'
                  }
              },
              bodyClass: 'locations'
          })
          .state('app.locations.add', {
              url: '/add',
              views: {
                  'content@app': {
                      templateUrl: 'views/app/modules/locations/location/location.html',
                      controller: 'LocationController as vm'
                  }
              },
              bodyClass: 'locations'
          })
          .state('app.locations.detail', {
              url: '/:id',
              views: {
                  'content@app': {
                      templateUrl: 'views/app/modules/locations/location/location.html',
                      controller: 'LocationController as vm'
                  }
              },
              bodyClass: 'locations'
          });

      // Translation
      $translatePartialLoaderProvider.addPart('app/modules/locations');

      // Navigation
      msNavigationServiceProvider.saveItem('locations', {
          title: 'Orte',
          icon: 'icon-map-marker',
          weight: 0
      });

      msNavigationServiceProvider.saveItem('locations.locations', {
          title: 'Locations',
          state: 'app.locations',
      });

      msNavigationServiceProvider.saveItem('locations.types', {
          title: 'Type',
          state: 'app.locations.types'
      });

  }