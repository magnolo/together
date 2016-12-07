export function MainConfig($translateProvider){
    'ngInject';

    //
    //// angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'json/{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('de');
        $translateProvider.useSanitizeValueStrategy('sanitize');
}
