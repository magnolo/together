export function IndexController(fuseTheming)
{
    'ngInject';
    var vm = this;
    console.log(fuseTheming);
    // Data
    vm.themes = fuseTheming.themes;

    //////////
}
