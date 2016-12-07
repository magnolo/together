import  {EventFormDialogController}  from './dialogs/event-form/event-form-dialog.controller';
import  {EventDetailDialogController}  from './dialogs/event-detail/event-detail-dialog.controller';
import  {CalendarController}  from './calendar.controller';

angular.module('app.calendar')
    .controller('EventFormDialogController', EventFormDialogController)
      .controller('EventDetailDialogController', EventDetailDialogController)
      .controller('CalendarController', CalendarController);
