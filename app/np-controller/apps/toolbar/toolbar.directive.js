'use strict';

npToolbar.$inject = ['$cookies', '$window', 'assets'];
function npToolbar($cookies, $window, assets) {
    return {
        templateUrl: '/np-controller/templates/toolbar.html',
        link: function (scope) {
            scope.user = $cookies.getObject('user');

            scope.components = assets.getAsset('components');

            scope.logout = function () {
                $cookies.remove('token');
                $cookies.remove('user');
                $window.location.reload();
            };
        }
    };
}

angular.module('ninepixels.toolbar', [])
        .directive('npToolbar', npToolbar);