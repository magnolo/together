class LocationsController{
    constructor(LocationService){
      'ngInject';

      this.LocationService = LocationService;

      this.locations =[];

      this.LocationService.all().then((data) => {
        this.locations = data;
      })
    }
}

export { LocationsController };
