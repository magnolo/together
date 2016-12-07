class LoginFormController{
    constructor($auth){
        'ngInject';

        this.$auth = $auth;
    }

    $onInit(){
    }

    socialLogin(provider){
        this.$auth.authenticate(provider);
    }
}

export const LoginFormComponent = {
    templateUrl: './views/app/components/login-form/login-form.component.html',
    controller: LoginFormController,
    controllerAs: 'vm',
    bindings: {}
}
