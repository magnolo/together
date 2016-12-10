class LoginController {
    constructor($auth, $state, UserService) {
        'ngInject';

        this.$auth = $auth;
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
      if(this.$auth.getPayload()){
        this.$state.go('app.calendar');
      }
    }
    login(isValid) {
      let user = {
        email: this.form.email,
        password: this.form.password
      };
      this.UserService.login(user).then((response) => {
          if (response.errors) {
              this.loginError(response.errors);
          }
          else {
              this.loginSuccess(response.data.data.user);
          }
      });
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
