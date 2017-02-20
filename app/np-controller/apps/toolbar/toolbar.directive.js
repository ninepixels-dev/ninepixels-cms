'use strict';

npToolbar.$inject = ['$cookies', '$window', 'assets', 'config'];
function npToolbar($cookies, $window, assets, config) {
    return {
        templateUrl: config.client_url + 'np-controller/templates/toolbar.html',
        link: function (scope) {
            scope.user = $cookies.getObject('user');

            scope.components = assets.getAsset('components');

            scope.logout = function () {
                $cookies.remove('token');
                $cookies.remove('user');
                $cookies.remove('page');
                $window.location.reload();
            };
        }
    };
}

angular.module('ninepixels.toolbar', [])
        .directive('npToolbar', npToolbar);