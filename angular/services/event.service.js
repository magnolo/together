export class EventService {
    constructor(API, ToastService) {
        'ngInject';

        //
        this.API = API;
        this.ToastService = ToastService;
    }
    get(start, end, success, error) {
        return this.API.all('events').getList({start:start, end:end}).then((response) => {
            if (success)
                success(response);
            return response;
        }, (response) => {
            if (error)
                error(response);
            return response;
        })
    }
    getTypes(success, error) {
        return this.API.all('events/types').getList().then((response) => {
            if (success)
                success(response);
            return response;
        }, (response) => {
            if (error)
                error(response);
            return response;

        })
    }
    create(data, success, error) {
        return this.API.all('events').post(data).then((response) => {
            if (success) success(response);
        }, (response) => {
            if (error) error(response);
        });
    }

    update(id, data, success, error) {
        return this.API.one('events', id).customPUT(data).then((response) => {
            if (success) success(response);
            return this.ToastService.show('Änderung erfolgreich gespeichert!');
        }, (response) => {
            if (error) error(response);
            return this.ToastService.error('Ja Hoppala, das hat nicht funktioniert!');
        })
    }
    remove(id, success, error){
      return this.API.one('events', id).remove().then((response) => {
          if (success) success(response);
          return this.ToastService.show('Veranstaltung erfolgreich gelöscht!');
      }, (response) => {
          if (error) error(response);
          return this.ToastService.error('Ja Hoppala, das hat nicht funktioniert!');
      })
    }
}
