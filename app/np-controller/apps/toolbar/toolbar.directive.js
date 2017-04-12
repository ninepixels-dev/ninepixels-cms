'use strict';

npToolbar.$inject = ['config'];
function npToolbar(config) {
    return {
        scope: {
            itemID: '=item',
            pageID: '=page',
            identifier: '@',
            type: '@'
        },
        transclude: true,
        templateUrl: config.client_url + 'np-controller/templates/np-toolbar.html',
        link: function (scope, elem, attr, ctrl) {
            var floatingPanel = elem.find('.floating-panel');

            floatingPanel.appendTo(document.body);

            elem.on('mouseover', function (e) {
                floatingPanel.css({
                    position: 'fixed',
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

angular.module('ninepixels.toolbar', [])
        .directive('npToolbar', npToolbar);