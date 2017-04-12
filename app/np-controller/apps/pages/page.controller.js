/* global _ */

'use strict';

npPageController.$inject = ['$scope', 'api', 'modalDialog', 'assets', 'config'];
function npPageController($scope, api, modalDialog, assets, config) {
    var self = this;
    $scope.modal;
    $scope.pages = assets.getAsset('pages');
    $scope.galleries = assets.getAsset('galleries');
    $scope.server_url = config.server_url + 'uploads/thumbs/';

    $scope.templates = config.templates;

    this.manage = function (currentPage) {
        $scope.edit = false;
        $scope.view = 'list';

        var params = {
            scope: $scope,
            controller: npPageController,
            controllerAs: 'pageCtrl',
            size: 'lg',
            templateUrl: config.client_url + 'np-controller/templates/page-dialog.html'
        };

        $scope.modal = modalDialog.showModal(params);

        if (currentPage) {
            self._update(currentPage);
        }
    };

    this.validate = function (value) {
        $scope.page.name = encodeURI(value.replace(/ /g, '-').toLowerCase());

        if ($scope.page.parent && $scope.page.name.indexOf($scope.page.parent.name + '/') === -1) {
            $scope.page.name = $scope.page.parent.name + '/' + encodeURI(value.replace(/ /g, '-').toLowerCase());
        }
    };

    this._toggle = function (obj, value) {
        obj[value] = obj[value] === 1 ? 0 : 1;
        obj = _.omit(obj, 'parent');

        if (obj.image) {
            obj.image = obj.image.id;
        }

        return api('pages').update(obj).then(function (res) {
            if (res.status !== 200) {
                return obj[value] = obj[value] === 1 ? 0 : 1;
            }
            $scope.pages = assets.updateAsset('pages', res.item);
        });
    };

    this._update = function (_page) {
        $scope.page = _page;
        $scope.view = 'add';
        $scope.edit = true;
    };

    this._delete = function (_page) {
        _page.active = 0;
        _page = _.omit(_page, 'parent');

        return api('pages').update(_page).then(function (res) {
            if (res.status === 200) {
                $scope.pages = assets.removeAsset('pages', _page);
            }
        });
    };

    this._printPageName = function (page) {
        var pageName = page.navigation;
        while (page.parent) {
            pageName = page.parent.navigation + ' -> ' + pageName;
            page = page.parent;
        }

        return pageName;
    };

    this.addPage = function () {
        $scope.view = 'add';
        $scope.edit = false;

        $scope.page = {
            show_header: 1,
            show_navigation: 1,
            show_footer: 1,
            show_in_navigation: 1,
            visible: 1
        };
    };

    this.save = function (_page) {
        if (_page.parent) {
            _page.parent = _page.parent.id;
        }

        if (_page.image) {
            _page.image = _page.image.id;
        }

        if (_page.gallery) {
            _page.gallery = _page.gallery.id;
        }

        if ($scope.edit) {
            return api('pages').update(_page).then(callback);
        }

        return api('pages').add(_page).then(callback);

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

    this.cancel = function () {
        if ($scope.view === 'list') {
            return $scope.modal.close();
        }

        $scope.view = 'list';
        $scope.page = {};
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

angular.module('ninepixels.pages', [])
        .filter('parent', parentFilter)
        .controller('npPageController', npPageController);
