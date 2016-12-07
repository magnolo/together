class LoginController {
    constructor($auth, $state, UserService) {
        'ngInject';

        this.$auth = $auth;
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {

    }
    login(credentials) {

    }
    socialLogin(provider) {
        this.$auth.authenticate(provider).then((response) => {
            if (response.errors) {
                this.loginError(response.errors);
            }
            else {
                this.loginSuccess(response.data.data.user);
            }
        });
    }
    loginSuccess(user) {
        this.UserService.setCurrentUser(user);
        this.$state.go('app.calendar');
    }
    loginError(error){

    }
}

export { LoginController }