

    /** @ngInject */
    function EventFormDialogController($mdDialog, dialogData, locations, eventTypes)
    {
        var vm = this;

        // Data
        vm.dialogData = dialogData;
        vm.locations = locations;
        vm.eventTypes = eventTypes;
        vm.notifications = ['15 minutes before', '30 minutes before', '1 hour before'];

        // Methods
        vm.saveEvent = saveEvent;
        vm.removeEvent = removeEvent;
        vm.closeDialog = closeDialog;
        vm.setLocation = setLocation;
        vm.setType = setType;

        init();

        //////////

        /**
         * Initialize
         */
        function init()
        {


            // Figure out the title
            switch ( vm.dialogData.type )
            {
                case 'add' :
                    vm.dialogTitle = 'Neue Veranstaltung';
                    break;

                case 'edit' :
                    vm.dialogTitle = 'Veranstaltung ändern';
                    break;

                default:
                    break;
            }

            // Edit
            if ( vm.dialogData.calendarEvent )
            {
                // Clone the calendarEvent object before doing anything
                // to make sure we are not going to brake FullCalendar
                vm.calendarEvent = angular.copy(vm.dialogData.calendarEvent);

                // Convert moment.js dates to javascript date object
                if ( moment.isMoment(vm.calendarEvent.start) )
                {
                    vm.calendarEvent.start = vm.calendarEvent.start.toDate();
                }
                else{
                    vm.calendarEvent.start = moment(vm.calendarEvent.start).toDate();
                }

                if ( moment.isMoment(vm.calendarEvent.end) )
                {
                    vm.calendarEvent.end = vm.calendarEvent.end.toDate();
                }
                else{
                  vm.calendarEvent.end = moment(vm.calendarEvent.end).toDate();
                }

                console.log(vm.calendarEvent)
            }
            // Add
            else
            {
                // Convert moment.js dates to javascript date object
                if ( moment.isMoment(vm.dialogData.start) )
                {
                    vm.dialogData.start = vm.dialogData.start.toDate();
                }

                if ( moment.isMoment(vm.dialogData.end) )
                {
                    vm.dialogData.end = vm.dialogData.end.toDate();
                }

                vm.calendarEvent = {
                    start        : vm.dialogData.start,
                    end          : vm.dialogData.end,
                    allDay       : vm.dialogData.allDay,
                    location_id  : vm.dialogData.location_id,
                    type_id      : vm.dialogData.type_id,
                    public       : true
                };


            }
        }

        /**
         * Save the event
         */
        function saveEvent()
        {
            // Convert the javascript date objects back to the moment.js dates
            var dates = {
                start: moment.utc(vm.calendarEvent.start),
                end  : moment.utc(vm.calendarEvent.end)
            };
            vm.calendarEvent.start_at = moment(vm.calendarEvent.start).format('YYYY-MM-DD HH:mm:ss');
            vm.calendarEvent.end_at = moment(vm.calendarEvent.end).format('YYYY-MM-DD HH:mm:ss');

            var response = {
                type         : vm.dialogData.type,
                calendarEvent: angular.extend({}, vm.calendarEvent, dates)
            };

            $mdDialog.hide(response);
        }

        /**
         * Remove the event
         */
        function removeEvent()
        {
            var response = {
                type         : 'remove',
                calendarEvent: vm.calendarEvent
            };

            $mdDialog.hide(response);
        }

        /**
         * Close the dialog
         */
        function closeDialog()
        {
            $mdDialog.cancel();
        }


        function setLocation(){
          angular.forEach(vm.locations, (loc) => {
            if(loc.id == vm.calendarEvent.location_id){
              vm.calendarEvent.location = loc;
            }
          })
        }
        function setType(){

          angular.forEach(vm.eventTypes, (ty) => {
            if(ty.id == vm.calendarEvent.type_id){
              vm.calendarEvent.type = ty;
            }
          })
        }
    }

export { EventFormDialogController };
