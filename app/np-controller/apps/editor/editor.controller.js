/* global _ */

'use strict';

npEditorCtrl.$inject = ['$scope', '$window', 'api', 'modalDialog', 'assets'];
function npEditorCtrl($scope, $window, api, modalDialog, assets) {
    var itemScope = $scope.$parent;

    this.modify = function (item) {
        $scope.edit = false;
        $scope.items = assets.getAsset('items');

        if (item) {
            $scope.edit = true;
            $scope.item = _.findWhere($scope.items, {id: item});
        }

        var params = {
            scope: $scope,
            size: 'lg',
            templateUrl: '/np-controller/templates/editor-dialog.html'
        };

        var modal = modalDialog.showModal(params);

        $scope.save = function (_item) {
            if ($scope.edit) {
                _item.page = _item.page.id;

                return api('items').update(_item).then(function (res) {
                    if (res.status === 200) {
                        $window.location.reload();
                    }
                });
            }

            _.extend(_item, {
                page: itemScope.pageID,
                identifier: itemScope.identifier
            });

            return api('items').add(_item).then(function (res) {
                if (res.status === 201) {
                    $window.location.reload();
                }
            });
        };

        $scope.cancel = function () {
            modal.close();
        };
    };

    this.toggle = function (item) {
        item = _.findWhere($scope.items, {id: item});
        item['visible'] = item['visible'] === 1 ? 0 : 1;
        item = _.omit(item, 'page');

        api('items').update(item).then(function (res) {
            if (res.status === 200) {
                $window.location.reload();
            }
        });
    };

    this.delete = function (item) {
        item = _.findWhere($scope.items, {id: item});
        item.active = 0;
        item = _.omit(item, 'page');

        api('items').update(item).then(function (res) {
            if (res.status === 200) {
                $window.location.reload();
            }
        });
    };
}

angular.module('ninepixels.editor')
        .controller('npEditorCtrl', npEditorCtrl);