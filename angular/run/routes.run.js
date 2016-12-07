export function RoutesRun($rootScope, $window, $timeout, $state, $transitions, $auth) {
    'ngInject';

    let requiresAuthCriteria = {
        to: ($state) => $state.data && $state.data.auth
    };

    let redirectToLogin = () => {
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
    
    console.log($auth);
    console.log($auth.getPayload());
    console.log($window.localStorage.satellizer_token);
}
