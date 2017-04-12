/* global _ */

'use strict';

npPickImage.$inject = ['assets', 'modalDialog', 'config'];
function npPickImage(assets, modalDialog, config) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModel) {
            scope.openModal = function () {
                var modalScope = scope.$new();
                modalScope.filteredGallery = [];

                var params = {
                    scope: modalScope,
                    size: 'lg',
                    templateUrl: config.client_url + 'np-controller/templates/image-picker.html'
                };

                modalScope.galleries = assets.getAsset('galleries');
                modalScope.images = assets.getAsset('images');
                modalScope.server_url = config.server_url + 'uploads/thumbs/';

                var imageModal = modalDialog.showModal(params);

                _.each(modalScope.galleries, function (item) {
                    modalScope.filteredGallery[item.id] = _.filter(modalScope.images, function (obj) {
                        return obj.gallery && obj.gallery.id === item.id;
                    });
                });

                modalScope.pickGallery = function (gallery) {
                    if (!gallery) {
                        return delete modalScope.galleryItems;
                    }

                    return modalScope.galleryItems = modalScope.filteredGallery[gallery.id];
                };

                modalScope.choose = function (img) {
                    ngModel.$setViewValue(img);
                    imageModal.close();
                };

                modalScope.cancel = function () {
                    imageModal.close();
                };
            };
        }
    };
}

angular.module('ninepixels.toolbar')
        .directive('npPickImage', npPickImage);