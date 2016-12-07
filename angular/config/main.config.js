export function MainConfig($translateProvider, tmhDynamicLocaleProvider){
    'ngInject';

    //
    //// angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'json/{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('de');
        $translateProvider.useSanitizeValueStrategy('sanitize');

        tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
}
