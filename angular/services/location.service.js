export class LocationService {
    constructor(API) {
        'ngInject';

        //
        this.API = API;
    }
    get(id, success, error) {
        return this.API.one('locations', id).get().then((response) => {
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
        return this.API.all('locations').all('types').getList().then((response) => {
            if (success)
                success(response);
            return response;
        }, (response) => {
            if (error)
                error(response);
            return response;
        })
    }

    all() {
        return this.API.all('locations').getList().then((response) => {
            return response;
        });
    }
}