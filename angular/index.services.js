import {EventService} from './services/event.service';
import {LocationService} from './services/location.service';
import {UserService} from './services/user.service';
import {ComponentConfigService} from './services/component-config.service';
import {APIService} from './services/API.service';
import {DialogService} from './services/dialog.service';
import {ToastService} from './services/toast.service';

angular.module('app.services')
	.service('EventService', EventService)
	.service('LocationService', LocationService)
	.service('UserService', UserService)
	.service('ComponentConfigService', ComponentConfigService)
	.service('API', APIService)
	.service('DialogService', DialogService)
	.service('ToastService', ToastService)
