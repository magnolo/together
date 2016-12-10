class RegisterController {
    constructor(UserService, $auth, $state) {
        'ngInject';

        this.UserService = UserService;
        this.$auth = $auth;
        this.$state = $state;
    }

    $onInit() {
      if(this.$auth.getPayload()){
        this.$state.go('app.calendar');
      }
    }
    registerUser(isValid){
      //if(isValid){
        let user = {
          name:this.form.username,
          email:this.form.email,
          password: this.form.password
        };
        this.UserService.register(user);
    //  }
    }
}

export { RegisterController }
