/* global _ */

'use strict';

assetService.$inject = ['api'];
function assetService(api) {
    var self = this;
    var assets = {
        pages: [],
        items: [],
        images: [],
        components: [],
        users: []
    };

    this.getAllAssets = function () {
        return assets;
    };

    this.getAsset = function (_asset) {
        return assets[_asset];
    };

    this.setAsset = function (_asset, value) {
        assets[_asset].push(value);
        return assets[_asset];
    };

    this.updateAsset = function (_asset, value) {
        self.removeAsset(_asset, value);
        self.setAsset(_asset, value);
        return assets[_asset];
    };

    this.removeAsset = function (_asset, value) {
        assets[_asset] = _.reject(assets[_asset], {id: value.id});
        return assets[_asset];
    };

    api('pages').fetch().then(function (pages) {
        assets['pages'] = pages;
    });

    api('items').fetch().then(function (items) {
        assets['items'] = items;
    });

    api('images').fetch().then(function (images) {
        assets['images'] = images;
    });

    api('components').fetch().then(function (components) {
        assets['components'] = components;
    });

    api('users').fetch().then(function (users) {
        assets['users'] = users;
    });
}

angular.module('ninepixels.assets', [])
        .service('assets', assetService);
