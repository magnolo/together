export function MainConfig($translateProvider){
    'ngInject';

    //
    //// angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'json/{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
}
