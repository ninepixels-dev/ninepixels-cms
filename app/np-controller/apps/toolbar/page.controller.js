/* global _ */

'use strict';

npPageController.$inject = ['$scope', '$cookies', 'api', 'modalDialog', 'assets', 'config'];
function npPageController($scope, $cookies, api, modalDialog, assets, config) {
    var self = this;

    this.manage = function (currentPage) {
        $scope.pages = assets.getAsset('pages');
        $scope.server_url = config.server_url + 'uploads/';
        $scope.edit = false;
        $scope.view = 'list';

        $scope.templates = {
            "Homepage": "homepage.php",
            "Content Page": "content.php",
            "Rooms List": "rooms-list.php",
            "Rooms Single": "rooms-single.php",
            "List View": "list-view.php",
            "Single View": "single-view.php",
            "News View": "news-view.php",
            "News List": "news-list.php",
            "Gallery List": "gallery-list.php",
            "Gallery Page": "gallery-single.php",
            "Contact": "contact.php"
        };

        var params = {
            scope: $scope,
            size: 'lg',
            templateUrl: '/np-controller/templates/page-dialog.html'
        };

        var modal = modalDialog.showModal(params);

        $scope.validate = function (value) {
            $scope.page.name = value.replace(/ /g, '-').toLowerCase();

            if ($scope.page.parent && $scope.page.name.indexOf($scope.page.parent.name + '/') === -1) {
                $scope.page.name = $scope.page.parent.name + '/' + value.replace(/ /g, '-').toLowerCase();
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
            } else {
                delete _page.image;
            }

            if (_page.image) {
                _page.image = _page.image.id;
            } else {
                delete _page.image;
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
                $scope.page = {};
            }
        };

        $scope.cancel = function () {
            if ($scope.view === 'list') {
                modal.close();
            } else {
                $scope.view = 'list';
                $scope.page = {};
            }
        };

        if (currentPage) {
            $scope._update(currentPage);
        }
    };

    this.manageCurrentPage = function () {
        var currentPage = $cookies.get('page').replace(/\+/g, ' ');
        self.manage(JSON.parse(currentPage));
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
