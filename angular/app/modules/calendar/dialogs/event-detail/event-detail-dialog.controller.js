

    /** @ngInject */
    function EventDetailDialogController($mdDialog, calendarEvent, showEventFormDialog, event)
    {
        var vm = this;

        // Data
        vm.calendarEvent = calendarEvent;

        // Methods
        vm.editEvent = editEvent;
        vm.closeDialog = closeDialog;

        //////////

        /**
         * Close the dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }

        /**
         * Edit the calendar event
         *
         * @param calendarEvent
         */
        function editEvent(calendarEvent)
        {
            let data;
            if(typeof calendarEvent.plain != "undefined"){
              data = calendarEvent.plain();
            }
            else{
              data = calendarEvent;
            }

            showEventFormDialog('edit', data, false, false, event);
        }
    }

export { EventDetailDialogController }
