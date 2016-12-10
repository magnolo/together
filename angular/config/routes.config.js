export function RoutesConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    let getView = (viewName) => {
        return `./views/app/pages/${viewName}/${viewName}.page.html`;
    };

    let $cookies;

    angular.injector(['ngCookies']).invoke([
        '$cookies', (_$cookies) => {
            $cookies = _$cookies;
        }
    ]);

    // Get active layout
    let layoutStyle = $cookies.get('layoutStyle') || 'verticalNavigation';

    let layouts = {
        verticalNavigation: {
            main: 'views/app/modules/core/layouts/vertical-navigation.html',
            toolbar: 'views/app/modules/toolbar/layouts/vertical-navigation/toolbar.html',
            navigation: 'views/app/modules/navigation/layouts/vertical-navigation/navigation.html'
        },
        verticalNavigationFullwidthToolbar: {
            main: 'views/app/modules/core/layouts/vertical-navigation-fullwidth-toolbar.html',
            toolbar: 'views/app/modules/toolbar/layouts/vertical-navigation-fullwidth-toolbar/toolbar.html',
            navigation: 'views/app/modules/navigation/layouts/vertical-navigation/navigation.html'
        },
        verticalNavigationFullwidthToolbar2: {
            main: 'views/app/modules/core/layouts/vertical-navigation-fullwidth-toolbar-2.html',
            toolbar: 'views/app/modules/toolbar/layouts/vertical-navigation-fullwidth-toolbar-2/toolbar.html',
            navigation: 'views/app/modules/navigation/layouts/vertical-navigation-fullwidth-toolbar-2/navigation.html'
        },
        horizontalNavigation: {
            main: 'views/app/modules/core/layouts/horizontal-navigation.html',
            toolbar: 'views/app/modules/toolbar/layouts/horizontal-navigation/toolbar.html',
            navigation: 'views/app/modules/navigation/layouts/horizontal-navigation/navigation.html'
        },
        contentOnly: {
            main: 'views/app/modules/core/layouts/content-only.html',
            toolbar: '',
            navigation: ''
        },
        contentWithToolbar: {
            main: 'views/app/modules/core/layouts/content-with-toolbar.html',
            toolbar: 'views/app/modules/toolbar/layouts/content-with-toolbar/toolbar.html',
            navigation: ''
        }
    };

    $urlRouterProvider.otherwise('/');

    /*
        data: {auth: true} would require JWT auth
        However you can't apply it to the abstract state
        or landing state because you'll enter a redirect loop
    */

    $stateProvider
        .state('app', {
            abstract: true,
            data: {},
            views: {

                'main@': {
                    templateUrl: layouts[layoutStyle].main,
                    controller: 'MainController as vm'
                },
                'toolbar@app': {
                    templateUrl: layouts[layoutStyle].toolbar,
                    controller: 'ToolbarController as vm'
                },
                'navigation@app': {
                    templateUrl: layouts[layoutStyle].navigation,
                    controller: 'NavigationController as vm'
                },
                // 'quickPanel@app': {
                //     templateUrl: 'views/app/modules/quick-panel/quick-panel.html',
                //     controller: 'QuickPanelController as vm'
                // }
            }
        });
}
