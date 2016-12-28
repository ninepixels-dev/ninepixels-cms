'use strict';

npEditor.$inject = [];
function npEditor() {
    return {
        scope: {
            itemID: '=item',
            pageID: '=page',
            identifier: '@',
            type: '@'
        },
        transclude: true,
        templateUrl: '/np-controller/templates/np-editor.html',
        link: function (scope, elem, attr, ctrl) {
            var floatingPanel = elem.find('.floating-panel');

            floatingPanel.appendTo(document.body);

            elem.on('mouseover', function (e) {
                floatingPanel.css({
                    position: 'absolute',
                    left: e.clientX,
                    top: e.clientY
                }).addClass('active');
            });

            elem.on('mouseleave', function () {
                floatingPanel.removeClass('active');
            });
        }
    };
}

angular.module('ninepixels.editor', [])
        .directive('npEditor', npEditor);