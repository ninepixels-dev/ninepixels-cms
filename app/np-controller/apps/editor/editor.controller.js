/* global _ */

'use strict';

npEditorCtrl.$inject = ['$scope', 'api', 'modalDialog', 'assets', 'config'];
function npEditorCtrl($scope, api, modalDialog, assets, config) {
    var itemScope = $scope.$parent;

    this.modify = function (item) {
        $scope.edit = false;
        $scope.items = assets.getAsset('items');
        $scope.locales = assets.getAsset('locales');
        $scope.server_url = config.server_url + 'uploads/';

        if (item) {
            $scope.edit = true;
            $scope.item = _.findWhere($scope.items, {id: item});
        }

        var params = {
            scope: $scope,
            size: 'lg',
            templateUrl: config.client_url + 'np-controller/templates/editor-dialog.html'
        };

        var modal = modalDialog.showModal(params);

        $scope.save = function (_item) {
            if (_item.image) {
                _item.image = _item.image.id;
            } else {
                delete _item.image;
            }

            if ($scope.edit) {
                _item.page = _item.page.id;
                return api('items').update(_item).then(function (res) {
                    if (res.status === 200) {
                        assets.updateAsset('items', res.item);
                        document.location.reload();
                    }
                });
            }

            _.extend(_item, {
                page: itemScope.pageID,
                identifier: itemScope.identifier
            });

            return api('items').add(_item).then(function (res) {
                if (res.status === 201) {
                    assets.setAsset('items', res.item);
                    document.location.reload();
                }
            });
        };

        $scope.cancel = function () {
            modal.close();
        };
    };

    this.toggle = function (item) {
        $scope.items = assets.getAsset('items');
        item = _.findWhere($scope.items, {id: item});
        item['visible'] = !!item['visible'];
        item = _.omit(item, 'page');

        if (item.image) {
            item.image = item.image.id;
        } else {
            delete item.image;
        }

        api('items').update(item).then(function (res) {
            if (res.status === 200) {
                assets.updateAsset('items', res.item);
                document.location.reload();
            }
        });
    };

    this.delete = function (item) {
        $scope.items = assets.getAsset('items');
        item = _.findWhere($scope.items, {id: item});
        item.active = 0;
        item = _.omit(item, 'page');

        api('items').update(item).then(function (res) {
            if (res.status === 200) {
                assets.removeAsset('items', res.item);
                document.location.reload();
            }
        });
    };
}

angular.module('ninepixels.editor')
        .controller('npEditorCtrl', npEditorCtrl);