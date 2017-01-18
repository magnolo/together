

    angular
        .module('app.calendar',
            [
                // 3rd Party Dependencies
                'ui.calendar',
                'ngDragDrop',
                 'mdPickers'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.calendar', {
            data    :{
                auth:true,
            },
            url      : '/calendar',
            views    : {
                'content@app': {
                    templateUrl: 'views/app/modules/calendar/calendar.html',
                    controller : 'CalendarController as vm'
                }
            },
            bodyClass: 'calendar'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/modules/calendar');


        msNavigationServiceProvider.saveItem('events', {
            title : 'Events',
            group: true,
            weight: 0
        });
        // Navigation
        msNavigationServiceProvider.saveItem('events.calendar', {
            title : 'Calendar',
            icon  : 'icon-calendar-today',
            state : 'app.calendar',
            weight: 0
        });
    }
