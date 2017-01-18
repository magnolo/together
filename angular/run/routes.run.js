export function RoutesRun($rootScope, $window, $timeout, $state, $mdSidenav, $transitions, $auth, UserService) {
    'ngInject';

    let requiresAuthCriteria = {
        to: ($state) => $state.data && $state.data.auth
    };

    let redirectToLogin = () => {
        'ngInject';
        if (!$auth.isAuthenticated()) {
            return $state.target('app.login', undefined, { location: false });
        }
        $rootScope.loadingProgress = true;
    };

    // De-activate loading indicator

    let stateChangeSuccessEvent = $transitions.onSuccess({}, () => {
        $timeout(() => {
            $rootScope.loadingProgress = false;
            $mdSidenav('navigation').close();
        });
    });

    // Store state in the root scope for easy access
    $rootScope.state = $state;

    // Cleanup
    $rootScope.$on('$destroy', () => {
        stateChangeStartEvent();
        stateChangeSuccessEvent();
    });

    let stateChangeStartEvent = $transitions.onBefore(requiresAuthCriteria, redirectToLogin, { priority: 10 });

    if($auth.getPayload()){
      UserService.fetchCurrentUser();
    }
}
