export class UserService{

    
    constructor($auth, $state, $localStorage){
        'ngInject';

        this.$auth = $auth;
        this.$state = $state;
        this.$localStorage = $localStorage;
        this.currentUser = null;
    }
    getCurrentUser(){
        return this.currentUser;
    }
    setCurrentUser(user){
        this.$localStorage.user = user;
        return this.currentUser = user;
    }
    logout(){
       
        this.$auth.logout();
        delete this.$localStorage.user;
        
        this.$state.go('app.login');
        return this.currentUser = null;
    }
}

