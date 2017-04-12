/* global _ */

'use strict';

assetService.$inject = ['api'];
function assetService(api) {
    var self = this;

    var assets = {};

    this.getAllAssets = function () {
        return assets;
    };

    this.getAsset = function (_asset) {
        return assets[_asset];
    };

    this.setAsset = function (_asset, value) {
        assets[_asset].push(value);
        localStorage.setItem(_asset, JSON.stringify(assets[_asset]));
        return assets[_asset];
    };

    this.updateAsset = function (_asset, value) {
        self.removeAsset(_asset, value);
        self.setAsset(_asset, value);
        localStorage.setItem(_asset, JSON.stringify(assets[_asset]));
        return assets[_asset];
    };

    this.removeAsset = function (_asset, value) {
        assets[_asset] = _.reject(assets[_asset], {id: value.id});
        localStorage.setItem(_asset, JSON.stringify(assets[_asset]));
        return assets[_asset];
    };

    this.initAsset = function (_asset, _path) {
        api(_path || _asset).fetch().then(function (asset) {
            assets[_asset] = asset;
            localStorage.setItem(_asset, JSON.stringify(asset));
        });
    };


    if (window.location.search.substr(1) !== "toolbar=false") {
        self.initAsset('pages');
        self.initAsset('items');
        self.initAsset('images');
        self.initAsset('components');
        self.initAsset('users');
        self.initAsset('galleries');
        self.initAsset('blogs');
        self.initAsset('products');
        self.initAsset('locales');
        self.initAsset('options');
    } else {
        var items = localStorage.getItem('items');
        assets['items'] = JSON.parse(items);
        var images = localStorage.getItem('images');
        assets['images'] = JSON.parse(images);
        var galleries = localStorage.getItem('galleries');
        assets['galleries'] = JSON.parse(galleries);
    }
}

angular.module('ninepixels.controller')
        .service('assets', assetService);
