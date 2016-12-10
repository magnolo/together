export class LocationService{
    constructor(API){
        'ngInject';

        //
        this.API = API;
    }
    all(){
      return this.API.all('locations').getList().then((response) => {
        return response;
      });
    }
}
