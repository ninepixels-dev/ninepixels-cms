'use strict';
npMultiImageUpload.$inject = ['$rootScope'];
function npMultiImageUpload($rootScope) {
    return {
        templateUrl: '/np-controller/templates/multi-upload-image.html',
        scope: {upload: '='},
        controller: 'npUploaderController',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch('upload', function (item) {
                if (!item)
                    return;
                scope.uploader.uploadAll();
            });
            scope.uploader.onCompleteItem = function (fileItem, response) {
                $rootScope.$broadcast('item-uploaded', response.file);
            };
            scope.uploader.onCompleteAll = function () {
                $rootScope.$broadcast('upload-completed');
            };
        }
    };
}

npSingleImageUpload.$inject = ['$rootScope'];
function npSingleImageUpload($rootScope) {
    return {
        templateUrl: '/np-controller/templates/single-upload-image.html',
        scope: {upload: '='},
        controller: 'npUploaderController',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch('upload', function (item) {
                if (!item)
                    return;
                scope.uploader.uploadAll();
            });
            scope.uploader.onCompleteItem = function (fileItem, response) {
                $rootScope.$broadcast('upload-completed', response.file);
            };
        }
    };
}

npUploaderThumb.$inject = ['$window'];
function npUploaderThumb($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function (item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function (file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };
    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function (scope, element, attributes) {
            if (!helper.support)
                return;
            var params = scope.$eval(attributes.npUploaderThumb);
            if (!helper.isFile(params.file))
                return;
            if (!helper.isImage(params.file))
                return;
            var canvas = element.find('canvas');
            var reader = new FileReader();
            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);
            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({width: width, height: height});
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }

        }
    };
}

npUploaderController.$inject = ['$scope', 'FileUploader', '$rootScope'];
function npUploaderController($scope, FileUploader, $rootScope) {
    var uploader = $scope.uploader = new FileUploader({
        url: '../server/np-upload.php'
    });

    // CALLBACKS
    uploader.onBeforeUploadItem = function (item) {
        Array.prototype.push.apply(item.formData, [{width: $scope.resolution}]);
        $rootScope.$broadcast('upload-started');
    };
}

angular.module('ninepixels.uploader', [])
        .directive('npMultiImageUpload', npMultiImageUpload)
        .directive('npSingleImageUpload', npSingleImageUpload)
        .directive('npUploaderThumb', npUploaderThumb)
        .controller('npUploaderController', npUploaderController);