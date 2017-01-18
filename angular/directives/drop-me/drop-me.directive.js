export function DropMeDirective() {
    return {

         restrict: 'A',
        link: function(scope, element, attrs, controllers) {
            //
            element.data('event', {
                title: $.trim($(element).text()), // use the element's text as the event title
                stick: true // maintain when user navigates (see docs on the renderEvent method)
            });
            element.draggable({
                zIndex: 999,
                revert: true, // will cause the event to go back to its
                revertDuration: 0 //  original position after the drag
            });
        }
    }
}
