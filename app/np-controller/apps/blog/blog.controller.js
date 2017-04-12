/* global _ */

'use strict';

npBlogCtrl.$inject = ['$scope', 'api', 'modalDialog', 'assets', 'config'];
function npBlogCtrl($scope, api, modalDialog, assets, config) {
    this.manage = function () {
        $scope.blogs = assets.getAsset('blogs');
        $scope.server_url = config.server_url + 'uploads/thumbs/';
        $scope.edit = false;
        $scope.view = 'list';

        $scope.templates = {
            "Blog Single": "blog-single.php"
        };

        var params = {
            scope: $scope,
            size: 'lg',
            templateUrl: config.client_url + 'np-controller/templates/blog-dialog.html'
        };

        var modal = modalDialog.showModal(params);

        $scope.validate = function (value) {
            $scope.blog.name = encodeURI(value.replace(/ /g, '-').toLowerCase());

            if ($scope.blog.name.indexOf('news/') === -1) {
                $scope.blog.name = 'news/' + $scope.blog.name;
            }
        };

        $scope._update = function (_blog) {
            $scope.blog = _blog;
            $scope.view = 'add';
            $scope.edit = true;
        };

        $scope._delete = function (_blog) {
            _blog.active = 0;
            api('blogs').update(_blog).then(function (res) {
                if (res.status === 200) {
                    $scope.blogs = assets.removeAsset('blogs', _blog);
                }
            });
        };

        $scope.addBlog = function () {
            $scope.view = 'add';
            $scope.edit = false;
            $scope.blog.template = $scope.templates[0];
        };

        $scope.save = function (_blog) {
            if (_blog.image) {
                _blog.image = _blog.image.id;
            } else {
                delete _blog.image;
            }

            if (!$scope.edit) {
                api('blogs').add(_blog).then(callback);
            } else {
                delete _blog.created;
                api('blogs').update(_blog).then(callback);
            }

            function callback(res) {
                if (res.status === 201) {
                    $scope.blogs = assets.setAsset('blogs', res.item);
                } else if (res.status === 200) {
                    $scope.blogs = assets.updateAsset('blogs', res.item);
                }
                $scope.view = 'list';
                $scope.blog = {};
            }
        };

        $scope.cancel = function () {
            if ($scope.view === 'list') {
                modal.close();
            } else {
                $scope.view = 'list';
                $scope.blog = {};
            }
        };
    };
}

angular.module('ninepixels.blog', [])
        .controller('npBlogCtrl', npBlogCtrl);