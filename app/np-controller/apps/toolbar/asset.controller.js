/* global _ */

'use strict';

npAssetController.$inject = ['$scope', 'api', 'modalDialog', 'assets', 'config'];
function npAssetController($scope, api, modalDialog, assets, config) {
    this.viewGallery = function () {
        $scope.images = assets.getAsset('images');
        $scope.server_url = config.server_url + 'uploads/';

        var params = {
            scope: $scope,
            size: 'lg',
            templateUrl: '/np-controller/templates/images-dialog.html'
        };

        var modal = modalDialog.showModal(params);

        $scope.delete = function (image) {
            image.active = 0;
            api('images').update(image).then(function (res) {
                if (res.status === 200) {
                    $scope.images = assets.removeAsset('images', image);
                }
            });
        };

        $scope.cancel = function () {
            modal.close();
        };
    };

    this.localesManager = function () {
        $scope.locales = assets.getAsset('locales');
        $scope.view = 'list';
        $scope.edit = false;

        var params = {
            scope: $scope,
            templateUrl: '/np-controller/templates/locales-dialog.html'
        };

        var modal = modalDialog.showModal(params);

        $scope._update = function (_locale) {
            $scope._locale = _locale;
            $scope.view = 'add';
            $scope.edit = true;
        };

        $scope._delete = function (_locale) {
            _locale.active = 0;
            api('locales').update(_locale).then(function (res) {
                if (res.status === 200) {
                    $scope.locales = assets.removeAsset('locales', _locale);
                }
            });
        };

        $scope.add = function () {
            $scope.view = 'add';
            $scope.edit = false;
        };

        $scope.save = function (_locale) {
            if (!$scope.edit) {
                api('locales').add(_locale).then(callback);
            } else {
                api('locales').update(_locale).then(callback);
            }

            function callback(res) {
                if (res.status === 201) {
                    $scope.locales = assets.setAsset('locales', res.item);
                } else if (res.status === 200) {
                    $scope.locales = assets.updateAsset('locales', res.item);
                }

                $scope.view = 'list';
                delete $scope._locale;
            }
        };

        $scope.cancel = function () {
            modal.close();
        };
    };

    this.componentManager = function () {
        $scope.components = assets.getAsset('components');
        $scope.view = 'list';
        $scope.edit = false;

        var params = {
            scope: $scope,
            size: 'lg',
            templateUrl: '/np-controller/templates/component-dialog.html'
        };

        var modal = modalDialog.showModal(params);

        $scope.add = function () {
            $scope.view = 'add';
            $scope.edit = false;
        };

        $scope.save = function (_component) {
            if (!$scope.edit) {
                api('components').add(_component).then(callback);
            } else {
                api('components').update(_component).then(callback);
            }

            function callback(res) {
                if (res.status === 201) {
                    $scope.components = assets.setAsset('components', res.item);
                } else if (res.status === 200) {
                    $scope.components = assets.updateAsset('components', res.item);
                }

                $scope.view = 'list';
                delete $scope._component;
            }
        };

        $scope._update = function (_component) {
            $scope._component = _component;
            $scope.view = 'add';
            $scope.edit = true;
        };

        $scope._delete = function (_component) {
            _component.active = 0;
            api('components').update(_component).then(function (res) {
                if (res.status === 200) {
                    $scope.components = assets.removeAsset('components', _component);
                }
            });
        };

        $scope.cancel = function () {
            if ($scope.view === 'list') {
                modal.close();
            } else {
                $scope.view = 'list';
                delete $scope._component;
            }
        };
    };
}

angular.module('ninepixels.toolbar')
        .controller('npAssetController', npAssetController);
