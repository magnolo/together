import { LocationsController } from './locations/locations.controller';
import { LocationController } from './location/location.controller';

angular.module('app.locations')
    .controller('LocationsController', LocationsController)
    .controller('LocationController', LocationController)