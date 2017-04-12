/* global _ */

'use strict';

npGalleryController.$inject = ['$scope', 'api', 'assets', 'config'];
function npGalleryController($scope, api, assets, config) {
    var self = this;

    $scope.images = assets.getAsset('images');
    $scope.galleries = assets.getAsset('galleries');
    $scope.server_url = config.server_url + 'uploads/thumbs/';
    $scope.galleryList = [];

    _.each($scope.galleries, function (item) {
        $scope.galleryList[item.id] = _.filter($scope.images, function (obj) {
            return obj.gallery && obj.gallery.id === item.id;
        });
    });

    this.pick = function (_gallery) {
        if (!_gallery) {
            return delete $scope.pickedGallery;
        }

        return $scope.pickedGallery = $scope.galleryList[_gallery.id];
    };

    this.delete = function (image) {
        image.active = 0;
        image = _.omit(image, 'gallery');

        return api('images').update(image).then(function (res) {
            if (res.status === 200) {
                $scope.images = assets.removeAsset('images', image);
            }
        });
    };

    this.update = function (pickedGallery) {
        return angular.forEach(pickedGallery, function (image) {
            image = _.omit(image, 'gallery');
            return api('images').update(image).then(function (res) {
                $scope.images = assets.updateAsset('images', res.item);
            });
        });
    };

    this.addVideo = function (_video) {
        _video.size = 'video';
        if (_video.gallery) {
            _video.gallery = _video.gallery.id;
        }
        return api('images').add(_video).then(function (res) {
            $scope.images = assets.setAsset('images', res.item);
        });
    };

    this.cancel = function () {
        if ($scope.pickedGallery) {
            return self.pick();
        }
        return $scope.$close();
    };
}

npLocalesController.$inject = ['$scope', 'api', 'modalDialog', 'assets', 'config'];
function npLocalesController($scope, api, modalDialog, assets, config) {
    this.localesManager = function () {
        $scope.locales = assets.getAsset('locales');
        $scope.view = 'list';
        $scope.edit = false;

        var params = {
            scope: $scope,
            templateUrl: config.client_url + 'np-controller/templates/locales-dialog.html'
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
}

npComponentController.$inject = ['$scope', 'api', 'modalDialog', 'assets', 'config'];
function npComponentController($scope, api, modalDialog, assets, config) {
    this.componentManager = function () {
        $scope.components = assets.getAsset('components');
        $scope.view = 'list';
        $scope.edit = false;

        var params = {
            scope: $scope,
            size: 'lg',
            templateUrl: config.client_url + 'np-controller/templates/component-dialog.html'
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

npAssetsController.$inject = ['modalDialog', 'config'];
function npAssetsController(modalDialog, config) {
    this.galleries = function () {
        return modalDialog.showModal({
            size: 'lg',
            controller: npGalleryController,
            controllerAs: 'galleryCtrl',
            bindToController: true,
            templateUrl: config.client_url + 'np-controller/templates/gallery-dialog.html'
        });
    };
    this.locales = function () {};
    this.components = function () {};
}

angular.module('ninepixels.controller')
        .controller('npAssetsCtrl', npAssetsController)
        .controller('npGalleryCtrl', npGalleryController)
        .controller('npLocalesCtrl', npLocalesController)
        .controller('npComponentCtrl', npComponentController);
