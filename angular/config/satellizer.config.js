export function SatellizerConfig($authProvider) {
    'ngInject';

    $authProvider.httpInterceptor = function() {
        return true;
    }

    $authProvider.facebook({
        clientId: '1700523083594884',
        url: '/api/auth/facebook'
    });

    $authProvider.loginUrl = '/api/auth/login';
    $authProvider.signupUrl = '/api/auth/register';
    $authProvider.tokenRoot = 'data'; //compensates success response macro

}