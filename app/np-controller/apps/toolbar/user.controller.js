/* global _ */

'use strict';

npUsersController.$inject = ['$scope', 'api', 'modalDialog', 'assets'];
function npUsersController($scope, api, modalDialog, assets) {
    this.manage = function () {
        $scope.users = assets.getAsset('users');
        $scope.edit = false;
        $scope.view = 'list';

        var params = {
            scope: $scope,
            size: 'md',
            templateUrl: '/np-controller/templates/users-dialog.html'
        };

        var modal = modalDialog.showModal(params);

        $scope.add = function () {
            $scope.view = 'add';
            $scope.edit = false;
        };

        $scope.save = function (user) {
            var params = {
                username: user.username,
                email: user.email,
                password: user.password
            };

            api().register(params).then(function (res) {
                if (res.status === 201) {
                    $scope.users = assets.setAsset('users', res.item);
                }
                $scope.view = 'list';
                delete $scope.user;
            });
        };

        $scope.cancel = function () {
            if ($scope.view === 'list') {
                modal.close();
            } else {
                $scope.view = 'list';
                delete $scope.user;
            }
        };
    };

}

angular.module('ninepixels.toolbar')
        .controller('npUsersController', npUsersController);
