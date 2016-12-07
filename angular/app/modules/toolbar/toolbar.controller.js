/** @ngInject */
class ToolbarController {

    constructor($rootScope, $q, $state, $timeout, $mdSidenav, $translate, $mdToast,UserService,msNavigationService) {


        // Data
        $rootScope.global = {
            search: ''
        };
        this.UserService = UserService;
        
        this.$state = $state;
        this.$q = $q;
        this.$timeout = $timeout;
        this.$mdToast = $mdToast;
        this.msNavigationService = msNavigationService;
        this.$translate = $translate;
        this.$mdSidenav = $mdSidenav;

        this.bodyEl = angular.element(document).find('body');
        this.userStatusOptions = [{
            'title': 'Online',
            'icon': 'icon-checkbox-marked-circle',
            'color': '#4CAF50'
        }, {
            'title': 'Away',
            'icon': 'icon-clock',
            'color': '#FFC107'
        }, {
            'title': 'Do not Disturb',
            'icon': 'icon-minus-circle',
            'color': '#F44336'
        }, {
            'title': 'Invisible',
            'icon': 'icon-checkbox-blank-circle-outline',
            'color': '#BDBDBD'
        }, {
            'title': 'Offline',
            'icon': 'icon-checkbox-blank-circle-outline',
            'color': '#616161'
        }];
        this.languages = {
            de: {
                'title': 'Deutsch',
                'translation': 'TOOLBAR.GERMAN',
                'code': 'de',
                'flag': 'de'
            },
            en: {
                'title': 'English',
                'translation': 'TOOLBAR.ENGLISH',
                'code': 'en',
                'flag': 'us'
            },
            es: {
                'title': 'Spanish',
                'translation': 'TOOLBAR.SPANISH',
                'code': 'es',
                'flag': 'es'
            },
            tr: {
                'title': 'Turkish',
                'translation': 'TOOLBAR.TURKISH',
                'code': 'tr',
                'flag': 'tr'
            }
        };

        // Methods


        //////////

        
    }
    /**
     * Initialize
     */
    $onInit() {
        // Select the first status as a default
        this.userStatus = this.userStatusOptions[0];

        this.user = this.UserService.getCurrentUser();
        // Get the selected language directly from angular-translate module setting
        this.selectedLanguage = this.languages[this.$translate.preferredLanguage()];
    }


    /**
     * Toggle sidenav
     *
     * @param sidenavId
     */
    toggleSidenav(sidenavId) {
        this.$mdSidenav(sidenavId).toggle();
    }

    /**
     * Sets User Status
     * @param status
     */
    setUserStatus(status) {
        this.userStatus = status;
    }

    /**
     * Logout Function
     */
    logout() {
        console.log('logout');
        this.UserService.logout();
    }

    /**
     * Change Language
     */
    changeLanguage(lang) {
        this.selectedLanguage = lang;

        /**
         * Show temporary message if user selects a language other than English
         *
         * angular-translate module will try to load language specific json files
         * as soon as you change the language. And because we don't have them, there
         * will be a lot of errors in the page potentially breaking couple functions
         * of the template.
         *
         * To prevent that from happening, we added a simple "return;" statement at the
         * end of this if block. If you have all the translation files, remove this if
         * block and the translations should work without any problems.
         */
        if (lang.code !== 'en' && lang.code !== 'de') {
            var message = 'Fuse supports translations through angular-translate module, but currently we do not have any translations other than English language. If you want to help us, send us a message through ThemeForest profile page.';

            this.$mdToast.show({
                template: '<md-toast id="language-message" layout="column" layout-align="center start"><div class="md-toast-content">' + message + '</div></md-toast>',
                hideDelay: 7000,
                position: 'top right',
                parent: '#content'
            });

            return;
        }

        // Change the language
        this.$translate.use(lang.code);
    }

    /**
     * Toggle horizontal mobile menu
     */
    toggleHorizontalMobileMenu() {
        this.bodyEl.toggleClass('ms-navigation-horizontal-mobile-menu-active');
    }

    /**
     * Toggle msNavigation folded
     */
    toggleMsNavigationFolded() {
        this.msNavigationService.toggleFolded();
    }

    /**
     * Search action
     *
     * @param query
     * @returns {Promise}
     */
    search(query) {
        var navigation = [],
            flatNavigation = this.msNavigationService.getFlatNavigation(),
            deferred = this.$q.defer();

        // Iterate through the navigation array and
        // make sure it doesn't have any groups or
        // none ui-sref items
        for (var x = 0; x < flatNavigation.length; x++) {
            if (flatNavigation[x].uisref) {
                navigation.push(flatNavigation[x]);
            }
        }

        // If there is a query, filter the navigation;
        // otherwise we will return the entire navigation
        // list. Not exactly a good thing to do but it's
        // for demo purposes.
        if (query) {
            navigation = navigation.filter(function (item) {
                if (angular.lowercase(item.title).search(angular.lowercase(query)) > -1) {
                    return true;
                }
            });
        }

        // Fake service delay
        this.$timeout(function () {
            this.deferred.resolve(navigation);
        }, 1000);

        return this.deferred.promise;
    }

    /**
     * Search result click action
     *
     * @param item
     */
    searchResultClick(item) {
        // If item has a link
        if (item.uisref) {
            // If there are state params,
            // use them...
            if (item.stateParams) {
                this.$state.go(item.state, item.stateParams);
            } else {
                this.$state.go(item.state);
            }
        }
    }
}

export {ToolbarController
}
