import {AppRootComponent} from './app/components/app-root/app-root.component';
import {AppShellComponent} from './app/components/app-shell/app-shell.component';

angular.module('app.components')
	.component('appRoot', AppRootComponent)
	.component('appShell', AppShellComponent);
