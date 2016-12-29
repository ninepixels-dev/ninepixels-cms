'use strict';

npPickImage.$inject = ['assets', 'modalDialog', 'server_url'];
function npPickImage(assets, modalDialog, server_url) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModel) {
            scope.openModal = function () {
                var modalScope = scope.$new();

                var params = {
                    scope: modalScope,
                    size: 'lg',
                    templateUrl: '/np-controller/templates/image-picker.html'
                };

                modalScope.images = assets.getAsset('images');
                modalScope.server_url = server_url + 'uploads/';

                var imageModal = modalDialog.showModal(params);

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

angular.module('ninepixels.editor')
        .directive('npPickImage', npPickImage);