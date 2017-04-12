'use strict';

npController.$inject = ['$cookies', '$window', 'assets', 'config'];
function npController($cookies, $window, assets, config) {
    return {
        templateUrl: config.client_url + 'np-controller/templates/controller.html',
        link: function (scope) {
            scope.user = $cookies.getObject('user');

            scope.components = assets.getAsset('components');

            scope.logout = function () {
                $cookies.remove('token');
                $cookies.remove('user');
                $cookies.remove('page');
                $window.location.reload();
            };

            scope.reload = function () {
                $('#editor-iframe')[0].contentWindow.location.reload();
            };
        }
    };
}

angular.module('ninepixels.controller', [])
        .directive('npController', npController);