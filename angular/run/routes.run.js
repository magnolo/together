export function RoutesRun($rootScope, $timeout, $state, $transitions, $auth) {
    'ngInject';

    let requiresAuthCriteria = {
        to: ($state) => $state.data && $state.data.auth
    };

    let redirectToLogin = ($auth) => {
        'ngInject';
        if (!$auth.isAuthenticated()) {
            return $state.target('app.login', undefined, { location: false });
        }
    };
    let stateChangeStartEvent = $rootScope.$on('$stateChangeStart', () => {
        $rootScope.loadingProgress = true;
    });

    // De-activate loading indicator
    let stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', () => {
        $timeout(() => {
            $rootScope.loadingProgress = false;
        });
    });

    // Store state in the root scope for easy access
    $rootScope.state = $state;

    // Cleanup
    $rootScope.$on('$destroy', () => {
        stateChangeStartEvent();
        stateChangeSuccessEvent();
    });
    $transitions.onBefore(requiresAuthCriteria, redirectToLogin, { priority: 10 });

}
