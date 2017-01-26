/* global _ */

'use strict';

npProductsCtrl.$inject = ['$scope', '$window', 'api', 'modalDialog', 'assets', 'config'];
function npProductsCtrl($scope, $window, api, modalDialog, assets, config) {
    this.manage = function () {
        $scope.products = assets.getAsset('products');
        $scope.server_url = config.server_url + 'uploads/';
        $scope.edit = false;
        $scope.view = 'list';

        $scope.templates = {
            "News Single": "news-single.php"
        };

        var params = {
            scope: $scope,
            size: 'lg',
            templateUrl: '/np-controller/templates/products-dialog.html'
        };

        var modal = modalDialog.showModal(params);

        $scope.validate = function (value) {
            $scope.product.name = value.replace(/ /g, '-').toLowerCase();

            if ($scope.product.name.indexOf('products/') === -1) {
                $scope.product.name = 'products/' + value.replace(/ /g, '-').toLowerCase();
            }
        };

        $scope._update = function (_product) {
            $scope.product = _product;
            $scope.view = 'add';
            $scope.edit = true;
        };

        $scope._delete = function (_product) {
            _product.active = 0;
            api('products').update(_product).then(function (res) {
                if (res.status === 200) {
                    $scope.products = assets.removeAsset('products', _product);
                }
            });
        };

        $scope.addProduct = function () {
            $scope.view = 'add';
            $scope.edit = false;
        };

        $scope.save = function (_product) {
            if (_product.image) {
                _product.image = _product.image.id;
            } else {
                delete _product.image;
            }

            if (!$scope.edit) {
                api('products').add(_product).then(callback);
            } else {
                api('products').update(_product).then(callback);
            }

            function callback(res) {
                if (res.status === 201) {
                    $scope.products = assets.setAsset('products', res.item);
                } else if (res.status === 200) {
                    $scope.products = assets.updateAsset('products', res.item);
                }
                $scope.view = 'list';
                $scope.product = {};
            }
        };

        $scope.cancel = function () {
            if ($scope.view === 'list') {
                modal.close();
            } else {
                $scope.view = 'list';
                $scope.product = {};
            }
        };
    };
}

angular.module('ninepixels.products', [])
        .controller('npProductsCtrl', npProductsCtrl);