class UsersController {
    constructor($auth, $state, UserService, $mdSidenav, msUtils, $mdDialog, $document) {
        'ngInject';

        this.$auth = $auth;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.UserService = UserService;
        this.users;
        this.$document = $document;

        //this.user = User.data;
        this.filterIds = null;
        this.listType = 'all';
        this.listOrder = 'name';
        this.listOrderAsc = false;
        this.selectedUsers = [];

        this.newGroupName = '';
        this.UserService.all().then((response) => {
            this.users = response.data.users;
        })

    }

    $onInit() {

        }
        //////////

    /**
     * Change Users List Filter
     * @param type
     */
    filterChange(type) {

        this.listType = type;

        if (type === 'all') {
            this.filterIds = null;
        } else if (type === 'frequent') {
            this.filterIds = this.user.frequentUsers;
        } else if (type === 'starred') {
            this.filterIds = this.user.starred;
        } else if (angular.isObject(type)) {
            this.filterIds = type.userIds;
        }

        this.selectedUsers = [];

    }

    /**
     * Open new user dialog
     *
     * @param ev
     * @param user
     */
    openUserDialog(ev, user) {
        this.$mdDialog.show({
            controller: 'UserDialogController',
            controllerAs: 'vm',
            templateUrl: 'views/app/modules/users/dialogs/user/user-dialog.html',
            parent: angular.element(this.$document.find('#content-container')),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                User: user,
                Users: this.users
            }
        });
    }

    /**
     * Delete User Confirm Dialog
     */
    deleteUserConfirm(user, ev) {
        var confirm = this.$mdDialog.confirm()
            .title('Are you sure want to delete the user?')
            .htmlContent('<b>' + user.name + ' ' + user.lastName + '</b>' + ' will be deleted.')
            .ariaLabel('delete user')
            .targetEvent(ev)
            .ok('OK')
            .cancel('CANCEL');

        this.$mdDialog.show(confirm).then(() => {

            this.deleteUser(user);
            this.selectedUsers = [];

        }, () => {

        });
    }

    /**
     * Delete User
     */
    deleteUser(user) {
        this.users.splice(this.users.indexOf(user), 1);
    }

    /**
     * Delete Selected Users
     */
    deleteSelectedUsers(ev) {
        var confirm = this.$mdDialog.confirm()
            .title('Are you sure want to delete the selected users?')
            .htmlContent('<b>' + this.selectedUsers.length + ' selected</b>' + ' will be deleted.')
            .ariaLabel('delete users')
            .targetEvent(ev)
            .ok('OK')
            .cancel('CANCEL');

        this.$mdDialog.show(confirm).then(() => {

            this.selectedUsers.forEach((user) => {
                this.deleteUser(user);
            });

            this.selectedUsers = [];

        });

    }

    /**
     * Toggle selected status of the user
     *
     * @param user
     * @param event
     */
    toggleSelectUser(user, event) {
        if (event) {
            event.stopPropagation();
        }

        if (this.selectedUsers.indexOf(user) > -1) {
            this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
        } else {
            this.selectedUsers.push(user);
        }
    }

    /**
     * Deselect users
     */
    deselectUsers() {
        this.selectedUsers = [];
    }

    /**
     * Sselect all users
     */
    selectAllUsers() {
        this.selectedUsers = $scope.filteredUsers;
    }

    /**
     *
     */
    addNewGroup() {
        if (this.newGroupName === '') {
            return;
        }

        var newGroup = {
            'id': this.msUtils.guidGenerator(),
            'name': this.newGroupName,
            'userIds': []
        };

        this.user.groups.push(newGroup);
        this.newGroupName = '';
    }

    /**
     * Delete Group
     */
    deleteGroup(ev) {
        var group = this.listType;

        var confirm = this.$mdDialog.confirm()
            .title('Are you sure want to delete the group?')
            .htmlContent('<b>' + group.name + '</b>' + ' will be deleted.')
            .ariaLabel('delete group')
            .targetEvent(ev)
            .ok('OK')
            .cancel('CANCEL');

        this.$mdDialog.show(confirm).then(() => {

            this.user.groups.splice(this.user.groups.indexOf(group), 1);

            this.filterChange('all');
        });

    }

    /**
     * Toggle sidenav
     *
     * @param sidenavId
     */
    toggleSidenav(sidenavId) {
        this.$mdSidenav(sidenavId).toggle();
    }

}

export {
    UsersController
}
