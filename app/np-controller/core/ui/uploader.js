/* global uploader */

'use strict';

npUploaderCtrl.$inject = ['$scope', 'FileUploader', 'token'];
function npUploaderCtrl($scope, FileUploader, token) {
    var uploader = $scope.uploader = new FileUploader({
        method: 'POST',
        headers: token.getToken(),
        url: token.resolveUrl('images')
    });

    uploader.onBeforeUploadItem = function (item) {
        item.formData = [$scope.additional];
    };
}

npUploader.$inject = [];
function npUploader() {
    return {
        controller: npUploaderCtrl,
        templateUrl: '/np-controller/templates/uploader.html'
    };
}

angular.module('ninepixels.ui.uploader', [])
        .directive('npUploader', npUploader)
        .controller('npUploaderCtrl', npUploaderCtrl);