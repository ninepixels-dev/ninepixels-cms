/* global _ */

'use strict';

npImagePicker.$inject = ['assets', 'modalDialog', 'config'];
function npImagePicker(assets, modalDialog, config) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModel) {
            var modalScope = scope.$new();

            modalScope.galleries = assets.getAsset('gallery/images');
            modalScope.server_url = config.server_url + config.images.thumbs;

            scope.manage = function () {
                return scope.modal = modalDialog.showModal({
                    scope: modalScope,
                    size: 'lg',
                    templateUrl: './np-controller/templates/imagepicker.html'
                });
            };

            modalScope.select = function (gallery) {
                if (!gallery)
                    return delete modalScope.selected;

                return modalScope.selected = gallery.images;
            };

            modalScope.pick = function (image) {
                ngModel.$setViewValue(image);
                delete modalScope.selected;

                return scope.modal.close();
            };

            modalScope.cancel = function () {
                return scope.modal.close();
            };
        }
    };
}

angular.module('ninepixels.ui')
        .directive('npImagePicker', npImagePicker);