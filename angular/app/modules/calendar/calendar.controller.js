

/** @ngInject */
function CalendarController($mdDialog, $mdSidenav, $document, LocationService, CalenderFilters) {
    var vm = this;

    // Data
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    vm.events = [
        [{
            id: 1,
            title: 'All Day Event',
            start: new Date(y, m, 1),
            end: null,
            location: 'Lorenz',
            backgroundColor: 'green',
            borderColor: 'black'
        }, {
            id: 2,
            title: 'Long Event',
            start: new Date(y, m, d - 5),
            location: 'Lorenz',
            end: new Date(y, m, d - 2)
        }, {
            id: 3,
            title: 'Some Event',
            start: new Date(y, m, d - 3, 16, 0),
            location: 'Lorenz',
            end: null
        }, {
            id: 4,
            title: 'Repeating Event',
            start: new Date(y, m, d + 4, 16, 0),
            location: 'Lorenz',
            end: null
        }, {
            id: 5,
            title: 'Birthday Party',
            location: 'Lorenz',
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30)
        }, {
            id: 6,
            title: 'All Day Event',
            location: 'Lorenz',
            start: new Date(y, m, d + 8, 16, 0),
            end: null,
            allDay: true
        }, {
            id: 7,
            title: 'Long Event',
            location: 'Lorenz',
            start: new Date(y, m, d + 12, 16, 0),
            end: null
        }, {
            id: 8,
            title: 'Repeating Event',
            start: new Date(y, m, d + 14, 2, 0),
            location: 'Lorenz',
            end: null
        }, {
            id: 9,
            title: 'Repeating Event',
            start: new Date(y, m, d + 14, 4, 0),
            location: 'Lorenz',
            end: null
        }, {
            id: 10,
            title: 'Repeating Event',
            start: new Date(y, m, d + 14, 2, 0),
            location: 'Lorenz',
            end: null
        }, {
            id: 11,
            title: 'Repeating Event',
            start: new Date(y, m, d + 14, 4, 0),
            location: 'Lorenz',
            end: null
        }, {
            id: 12,
            title: 'Repeating Event',
            start: new Date(y, m, d + 14, 2, 0),
            location: 'Lorenz',
            end: null
        }, {
            id: 13,
            title: 'Repeating Event',
            start: new Date(y, m, d + 14, 4, 0),
            location: 'Lorenz',
            end: null
        }, {
            id: 14,
            title: 'Conference',
            start: new Date(y, m, d + 17, 4, 0),
            location: 'Lorenz',
            end: null
        }, {
            id: 15,
            title: 'Meeting',
            start: new Date(y, m, d + 22, 4, 0),
            location: 'Lorenz',
            end: new Date(y, m, d + 24, 4, 0)
        }]
    ];

    vm.calendarUiConfig = {
        calendar: {
            locale: 'de',
            lang: 'de',
            // weekNumbers:true,
            editable: true,
            eventLimit: true,
            header: '',
            handleWindowResize: true,
            firstDay: 1,
            aspectRatio: 1,
            dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            viewRender: function (view) {
                vm.calendarView = view;
                vm.calendar = vm.calendarView.calendar;
                vm.currentMonthShort = 'M'+vm.calendar.getDate().format('MM');
            },
            // columnFormat: {
            //     month: 'ddd',
            //     week: 'ddd D',
            //     day: 'ddd M'
            // },
            timeFormat: 'H:mm',
            eventRender: (event, element) => {
                if (event.location) {
                    element.find('div.fc-content').append('<span class="fc-location">' + event.location + '</span>');
                }

            },
            views: {
                agenda: {
                    minTime: '08:00:00',
                    maxTime: '22:00:00',
                    allDayText: 'ganztags',
                    slotLabelFormat: 'H:mm'
                }
            },
            eventClick: eventDetail,
            selectable: true,
            selectHelper: true,
            select: select
        }
    };

    // Methods
    vm.addEvent = addEvent;
    vm.next = next;
    vm.prev = prev;

    vm.toggleSidenav = toggleSidenav;
    vm.clearFilters = CalenderFilters.clear;
    vm.filteringIsOn = CalenderFilters.isOn;


    vm.sidenav = {
        sidenav: false,
        'filters-sidenav': false
    };

    activate();
    //////////
    function activate() {
        LocationService.all().then((data) => {
            vm.locations = data
        })
    }

    /**
     * Go to next on current view (week, month etc.)
     */
    function next() {
        vm.calendarView.calendar.next();
    }

    /**
     * Go to previous on current view (week, month etc.)
     */
    function prev() {
        vm.calendarView.calendar.prev();
    }

    /**
     * Show event detail
     *
     * @param calendarEvent
     * @param e
     */
    function eventDetail(calendarEvent, e) {
        showEventDetailDialog(calendarEvent, e);
    }

    /**
     * Add new event in between selected dates
     *
     * @param start
     * @param end
     * @param e
     */
    function select(start, end, e) {
        showEventFormDialog('add', false, start, end, e);
    }

    /**
     * Add event
     *
     * @param e
     */
    function addEvent(e) {
        var start = new Date(),
            end = new Date();

        showEventFormDialog('add', false, start, end, e);
    }

    /**
     * Show event detail dialog
     * @param calendarEvent
     * @param e
     */
    function showEventDetailDialog(calendarEvent, e) {
        $mdDialog.show({
            controller: 'EventDetailDialogController',
            controllerAs: 'vm',
            templateUrl: 'views/app/modules/calendar/dialogs/event-detail/event-detail-dialog.html',
            parent: angular.element($document.body),
            targetEvent: e,
            clickOutsideToClose: true,
            locals: {
                calendarEvent: calendarEvent,
                showEventFormDialog: showEventFormDialog,
                event: e
            }
        });
    }

    /**
     * Show event add/edit form dialog
     *
     * @param type
     * @param calendarEvent
     * @param start
     * @param end
     * @param e
     */
    function showEventFormDialog(type, calendarEvent, start, end, e) {
        var dialogData = {
            type: type,
            calendarEvent: calendarEvent,
            start: start,
            end: end
        };

        $mdDialog.show({
            controller: 'EventFormDialogController',
            controllerAs: 'vm',
            templateUrl: 'views/app/modules/calendar/dialogs/event-form/event-form-dialog.html',
            parent: angular.element($document.body),
            targetEvent: e,
            clickOutsideToClose: true,
            locals: {
                dialogData: dialogData
            }
        }).then(function (response) {
            switch (response.type) {
                case 'add':
                    // Add new
                    vm.events[0].push({
                        id: vm.events[0].length + 20,
                        title: response.calendarEvent.title,
                        start: response.calendarEvent.start,
                        end: response.calendarEvent.end
                    });
                    break;

                case 'edit':
                    // Edit
                    for (var i = 0; i < vm.events[0].length; i++) {
                        // Update
                        if (vm.events[0][i].id === response.calendarEvent.id) {
                            vm.events[0][i] = {
                                title: response.calendarEvent.title,
                                start: response.calendarEvent.start,
                                end: response.calendarEvent.end
                            };

                            break;
                        }
                    }
                    break;

                case 'remove':
                    // Remove
                    for (var j = 0; j < vm.events[0].length; j++) {
                        // Update
                        if (vm.events[0][j].id === response.calendarEvent.id) {
                            vm.events[0].splice(j, 1);

                            break;
                        }
                    }
                    break;
            }
        });


    }
    /**
     * Toggle sidenav
     *
     * @param sidenavId
     */
    function toggleSidenav(sidenavId) {
        vm.sidenav[sidenavId] = !vm.sidenav[sidenavId];
        $mdSidenav(sidenavId).toggle();
    }
}

export { CalendarController };
