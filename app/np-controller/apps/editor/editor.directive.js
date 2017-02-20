'use strict';

npEditor.$inject = ['config'];
function npEditor(config) {
    return {
        scope: {
            itemID: '=item',
            pageID: '=page',
            identifier: '@',
            type: '@'
        },
        transclude: true,
        templateUrl: config.client_url + 'np-controller/templates/np-editor.html',
        link: function (scope, elem, attr, ctrl) {
            var floatingPanel = elem.find('.floating-panel');

            floatingPanel.appendTo(document.body);

            elem.on('mouseover', function (e) {
                floatingPanel.css({
                    position: 'absolute',
                    left: e.pageX,
                    top: e.pageY
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