/* global _ */

'use strict';

npPageList.$inject = ['config'];
function npPageList(config) {
    return {
        scope: {
            list: '=',
            parent: '=',
            filter: '=',
            update: '=',
            toggle: '=',
            remove: '='
        },
        templateUrl: './np-controller/templates/page-list.html',
        link: function (scope) {
            scope._update = function (page) {
                return scope.update(page);
            };
            scope._delete = function (page) {
                return scope.remove(page);
            };
            scope._toggle = function (page, asset) {
                return scope.toggle(page, asset);
            };
        }
    };
}

angular.module('ninepixels.pages')
        .directive('npPageList', npPageList);