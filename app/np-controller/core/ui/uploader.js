/* global uploader */

'use strict';

npUploaderCtrl.$inject = ['$scope', 'FileUploader', 'token', 'assets'];
function npUploaderCtrl($scope, FileUploader, token, assets) {
    var uploader = $scope.uploader = new FileUploader({
        method: 'POST',
        headers: token.getToken(),
        url: token.resolveUrl('images')
    });

    uploader.onBeforeUploadItem = function (item) {
        var additionals = _.clone($scope.additional);
        if ($scope.additional.gallery) {
            additionals.gallery = $scope.additional.gallery.id;
        }
        item.formData = [additionals];
    };

    uploader.onCompleteItem = function (item, res) {
        return assets.setAsset('images', res.item);
    };

}

npUploader.$inject = ['api', 'assets', 'config'];
function npUploader(api, assets, config) {
    return {
        controller: npUploaderCtrl,
        templateUrl: config.client_url + 'np-controller/templates/uploader.html',
        link: function (scope, elem, attr, ctrl) {
            scope.galleries = assets.getAsset('galleries');

            scope.pickGallery = function (gallery) {
                if (scope.additional) {
                    return scope.additional.gallery = gallery;
                }

                return scope.additional = {gallery: gallery};
            };

            scope.addGallery = function () {
                var gallery = prompt('Ime nove galerije', '');

                if (gallery !== null) {
                    api('galleries').add({name: gallery}).then(function (res) {
                        scope.galleries = assets.setAsset('galleries', res.item);
                        return scope.pickGallery(res.item);
                    });
                }
            };
        }
    };
}

angular.module('ninepixels.ui.uploader', [])
        .directive('npUploader', npUploader)
        .controller('npUploaderCtrl', npUploaderCtrl);