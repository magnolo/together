(function () {
    'use strict';

    angular
        .module('app.calendar')
        .directive('infiniteCalendar', infiniteCalendar);

    
    /** @ngInject */
    function infiniteCalendar() {
        return {
            link: function (scope, elem, attrs, ngModel) {
                console.log("before bind");
                console.log(scope, elem, attrs, ngModel);
                $(".fc-scroller:nth-child(1)").bind('scroll', function (event) {
                    console.log($(this).scrollLeft() + " --- " + $(this).innerWidth() + " --- " + $(this)[0].scrollWidth);
                    if ($(this).scrollLeft() <= 0) {
                        //left scroll : end reached
                        scope.vm.calendar.next();
                    }
                    if ($(this).scrollLeft() + $(this).innerWidth() >= $(this)[0].scrollWidth) {
                        //right scroll : end reached
                        scope.vm.calendar.next();
                    }
                });
                console.log("after bind");
            }
        };
    }
})();