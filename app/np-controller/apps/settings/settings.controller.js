/* global _ */

'use strict';

npSettingsCtrl.$inject = ['$scope', 'api', 'modalDialog', 'assets', 'config'];
function npSettingsCtrl($scope, api, modalDialog, assets, config) {
    $scope.options = assets.getAsset('options');
    $scope.server_url = config.server_url + 'uploads/';

    this.manage = function () {
        $scope.modal = modalDialog.showModal({
            scope: $scope,
            controller: npSettingsCtrl,
            controllerAs: 'settings',
            size: 'lg',
            templateUrl: 'np-controller/templates/settings-dialog.html'
        });

    };

    this._save = function (_options) {
        return angular.forEach(_options, function (option) {
            return api('options').update(option).then(function (res) {
                $scope.options = assets.updateAsset('options', res.item);
            });
        });
    };

    this._addOption = function () {
        var option = prompt('Ime opcije', '');
        if (option !== null) {
            return api('options').add({name: option}).then(function (res) {
                $scope.options = assets.setAsset('options', res.item);
            });
        }
    };

    this._cancel = function () {
        return $scope.modal.close();
    };

}

angular.module('ninepixels.settings', [])
        .controller('npSettingsCtrl', npSettingsCtrl);