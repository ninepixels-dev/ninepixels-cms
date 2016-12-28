/* global _ */

'use strict';

npPageController.$inject = ['$scope', '$cookies', 'api', 'modalDialog', 'assets'];
function npPageController($scope, $cookies, api, modalDialog, assets) {
    var self = this;

    this.manage = function (currentPage) {
        $scope.pages = assets.getAsset('pages');
        $scope.edit = false;
        $scope.view = 'list';

        $scope.templates = {
            "Homepage": "homepage.php",
            "List View": "list-view.php",
            "Rooms": "rooms.php",
            "Single View": "single-view.php",
            "Content Page": "content.php",
            "Gallery Page": "gallery-page.php",
            "Contact": "contact.php"
        };

        var params = {
            scope: $scope,
            size: 'lg',
            templateUrl: '/np-controller/templates/page-dialog.html'
        };

        var modal = modalDialog.showModal(params);

        $scope.validate = function (value) {
            $scope.page.name = value.replace(' ', '-').toLowerCase();

            if ($scope.page.parent && $scope.page.name.indexOf($scope.page.parent.name + '/') === -1) {
                $scope.page.name = $scope.page.parent.name + '/' + value.replace(' ', '-').toLowerCase();
            }
        };

        $scope._toggle = function (obj, value) {
            obj[value] = obj[value] === 1 ? 0 : 1;
            obj = _.omit(obj, 'parent');

            api('pages').update(obj).then(function (res) {
                if (res.status !== 200) {
                    return obj[value] = obj[value] === 1 ? 0 : 1;
                }
                $scope.pages = assets.updateAsset('pages', res.item);
            });
        };

        $scope._update = function (_page) {
            $scope.page = _page;
            $scope.view = 'add';
            $scope.edit = true;
        };

        $scope._delete = function (_page) {
            _page.active = 0;
            _page = _.omit(_page, 'parent');
            api('pages').update(_page).then(function (res) {
                if (res.status === 200) {
                    $scope.pages = assets.removeAsset('pages', _page);
                }
            });
        };

        $scope.addPage = function () {
            $scope.view = 'add';
            $scope.edit = false;
        };

        $scope.save = function (_page) {
            if (_page.parent) {
                _page.parent = _page.parent.id;
            }

            if (!$scope.edit) {
                api('pages').add(_page).then(callback);
            } else {
                api('pages').update(_page).then(callback);
            }

            function callback(res) {
                if (res.status === 201) {
                    $scope.pages = assets.setAsset('pages', res.item);
                } else if (res.status === 200) {
                    $scope.pages = assets.updateAsset('pages', res.item);
                }
                $scope.view = 'list';
                delete $scope.page;
            }
        };

        $scope.cancel = function () {
            if ($scope.view === 'list') {
                modal.close();
            } else {
                $scope.view = 'list';
                delete $scope.page;
            }
        };

        if (currentPage) {
            $scope._update(currentPage);
        }
    };

    this.manageCurrentPage = function () {
        var currentPage = $cookies.getObject('page');
        self.manage(currentPage);
    };
}

parentFilter.$inject = [];
function parentFilter() {
    return function (input, page) {
        var out = [];

        _.each(input, function (obj) {
            if (!obj.parent && !page) {
                out.push(obj);
            } else if (obj.parent && page && obj.parent.id === page) {
                out.push(obj);
            }
        });

        return out;
    };
}

angular.module('ninepixels.toolbar')
        .filter('parent', parentFilter)
        .controller('npPageController', npPageController);
