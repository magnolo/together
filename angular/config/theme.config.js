export function ThemeConfig($mdThemingProvider) {
	'ngInject';

	var fuseThemes = {
			default  : {
					primary   : {
							name: 'fuse-paleblue',
							hues: {
									'default': '700',
									'hue-1'  : '500',
									'hue-2'  : '600',
									'hue-3'  : '400'
							}
					},
					accent    : {
							name: 'light-blue',
							hues: {
									'default': '600',
									'hue-1'  : '400',
									'hue-2'  : '700',
									'hue-3'  : 'A100'
							}
					},
					warn      : {
							name: 'red'
					},
					background: {
							name: 'grey',
							hues: {
									'default': 'A100',
									'hue-1'  : 'A100',
									'hue-2'  : '100',
									'hue-3'  : '300'
							}
					}
			},
			'pinkTheme': {
					primary   : {
							name: 'blue-grey',
							hues: {
									'default': '800',
									'hue-1'  : '600',
									'hue-2'  : '400',
									'hue-3'  : 'A100'
							}
					},
					accent    : {
							name: 'pink',
							hues: {
									'default': '400',
									'hue-1'  : '300',
									'hue-2'  : '600',
									'hue-3'  : 'A100'
							}
					},
					warn      : {
							name: 'blue'
					},
					background: {
							name: 'grey',
							hues: {
									'default': 'A100',
									'hue-1'  : 'A100',
									'hue-2'  : '100',
									'hue-3'  : '300'
							}
					}
			},
			'tealTheme': {
					primary   : {
							name: 'fuse-blue',
							hues: {
									'default': '900',
									'hue-1'  : '600',
									'hue-2'  : '500',
									'hue-3'  : 'A100'
							}
					},
					accent    : {
							name: 'teal',
							hues: {
									'default': '500',
									'hue-1'  : '400',
									'hue-2'  : '600',
									'hue-3'  : 'A100'
							}
					},
					warn      : {
							name: 'deep-orange'
					},
					background: {
							name: 'grey',
							hues: {
									'default': 'A100',
									'hue-1'  : 'A100',
									'hue-2'  : '100',
									'hue-3'  : '300'
							}
					}
			}
	};
	var fusePalettes = [
        {
            name: 'fuse-blue',
            options: {
                '50': '#ebf1fa',
                '100': '#c2d4ef',
                '200': '#9ab8e5',
                '300': '#78a0dc',
                '400': '#5688d3',
                '500': '#3470ca',
                '600': '#2e62b1',
                '700': '#275498',
                '800': '#21467e',
                '900': '#1a3865',
                'A100': '#c2d4ef',
                'A200': '#9ab8e5',
                'A400': '#5688d3',
                'A700': '#275498',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': '50 100 200 A100',
                'contrastStrongLightColors': '300 400'
            }
        },
        {
            name: 'fuse-paleblue',
            options: {
                '50': '#ececee',
                '100': '#c5c6cb',
                '200': '#9ea1a9',
                '300': '#7d818c',
                '400': '#5c616f',
                '500': '#3c4252',
                '600': '#353a48',
                '700': '#2d323e',
                '800': '#262933',
                '900': '#1e2129',
                'A100': '#c5c6cb',
                'A200': '#9ea1a9',
                'A400': '#5c616f',
                'A700': '#2d323e',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': '50 100 200 A100',
                'contrastStrongLightColors': '300 400'
            }
        }
    ];
		angular.forEach(fusePalettes,  (palette) =>
			{
					$mdThemingProvider.definePalette(palette.name, palette.options);
			});

	// Register custom themes
        angular.forEach(fuseThemes,  (theme, themeName) =>
        {
            $mdThemingProvider.theme(themeName)
                .primaryPalette(theme.primary.name, theme.primary.hues)
                .accentPalette(theme.accent.name, theme.accent.hues)
                .warnPalette(theme.warn.name, theme.warn.hues)
                .backgroundPalette(theme.background.name, theme.background.hues);
        });
	/* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
	// $mdThemingProvider.theme('default')
	// 	.primaryPalette('light-blue', {
  //           default: '600'
  //       })
	// 	.accentPalette('grey')
	// 	.warnPalette('red');
	//
  //   $mdThemingProvider.theme('warn');
}
