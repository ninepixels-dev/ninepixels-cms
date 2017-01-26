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
        users: [],
        galleries: [],
        blogs: [],
        products: [],
        locales: []
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

    this.initAsset = function (_asset) {
        api(_asset).fetch().then(function (asset) {
            assets[_asset] = asset;
        });
    };

    self.initAsset('pages');
    self.initAsset('items');
    self.initAsset('images');
    self.initAsset('components');
    self.initAsset('users');
    self.initAsset('galleries');
    self.initAsset('blogs');
    self.initAsset('products');
    self.initAsset('locales');
}

angular.module('ninepixels.assets', [])
        .service('assets', assetService);
