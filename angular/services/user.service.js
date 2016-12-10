export class UserService{


    constructor($auth, $state, $localStorage, API, ToastService){
        'ngInject';

        this.$auth = $auth;
        this.$state = $state;
        this.$localStorage = $localStorage;
        this.currentUser = null;
        this.API = API;
        this.ToastService = ToastService;
    }
    fetchCurrentUser(){
       this.API.one('auth/me').get().then((response) => {
         this.setCurrentUser(response.user);
       });
    }
    getCurrentUser(){
        return this.currentUser;
    }
    setCurrentUser(user){
        this.$localStorage.user = user;
        return this.currentUser = user;
    }
    login(credentials){
      return this.$auth.login(credentials).then((response) => {
        this.ToastService.show('Hey ' + response.data.data.user.display_name + ', lasses uns tun!');
        return response;
      }).catch((response) => {

        return this.ToastService.error(response.data.errors.message[0]);
      });
    }
    register(user){
       return this.$auth.signup(user).then((response) => {
         this.ToastService.show('Hey ' + response.data.data.user.display_name + ', alles klar. Du hast Post!');

         return response;
       }).catch((response) => {
         return this.ToastService.error(response.data.errors.message[0]);
       });
    }
    logout(){
      this.ToastService.show('Baba ' + this.$localStorage.user.display_name);

        this.$auth.logout();
        delete this.$localStorage.user;

        this.$state.go('app.login');
        return this.currentUser = null;
    }
    all(){
      return this.API.all('users').getList().then((response) => {
        return response;
      });
    }
}
