import {AppHeaderComponent} from './app/components/app-header/app-header.component';
import {AppRootComponent} from './app/components/app-root/app-root.component';
import {AppShellComponent} from './app/components/app-shell/app-shell.component';

angular.module('app.components')

	.component('appHeader', AppHeaderComponent)
	.component('appRoot', AppRootComponent)
	.component('appShell', AppShellComponent);
