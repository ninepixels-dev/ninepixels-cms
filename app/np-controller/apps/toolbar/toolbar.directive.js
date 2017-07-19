'use strict';

npToolbar.$inject = [];
function npToolbar() {
    return {
        scope: {
            item: '=item',
            page: '=page',
            ident: '@identifier'
        },
        transclude: true,
        controller: 'npToolbarCtrl',
        controllerAs: 'ctrl',
        templateUrl: './np-controller/templates/np-toolbar.html',
        link: function (scope, elem, attr, ctrl) {
            var floatingPanel = elem.find('.np-floating-panel');

            floatingPanel.appendTo(document.body);

            elem.on('mouseover', function (e) {
                floatingPanel.css({
                    position: 'fixed',
                    left: e.clientX,
                    top: e.clientY
                }).show();
                elem.addClass('np-toolbar-active');
            });

            floatingPanel.on('mouseover', function () {
                elem.addClass('np-toolbar-active');
            });

            floatingPanel.on('mouseleave', function () {
                elem.removeClass('np-toolbar-active');
            });

            elem.on('mouseleave', function () {
                floatingPanel.hide();
                elem.removeClass('np-toolbar-active');
            });
        }
    };
}

angular.module('ninepixels.toolbar', [])
        .directive('npToolbar', npToolbar);