(function ()
{
    'use strict';

    angular
        .module('app.calendar')
        .controller('FiltersSidenavController', FiltersSidenavController);

    /** @ngInject */
    function FiltersSidenavController(msUtils, CalenderFilters)
    {
        var vm = this;

        // Data
      //  vm.board = BoardService.data;
        vm.calendarFilters = CalenderFilters;
        //vm.labels = vm.board.labels;
        //vm.members = vm.board.members;
        vm.selectedMenu = 'Settings';

        // Methods
        vm.exists = msUtils.exists;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.clearFilters = CalenderFilters.clear;
        vm.filteringIsOn = CalenderFilters.isOn;

        ////////
    }
})();
