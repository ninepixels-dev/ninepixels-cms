'use strict';

angular.module('ninepixels', [
    'angular-loading-bar',
    'ngCookies', 'ui.bootstrap',

    'ninepixels.controller',
    'ninepixels.toolbar',
    'ninepixels.pages',
    'ninepixels.blog',
    'ninepixels.products',
    'ninepixels.settings',

    'ninepixels.authentification',
    'ninepixels.api',
    'ninepixels.api.token',
    'ninepixels.login',
    'ninepixels.notify',
    'ninepixels.ui',
    'ninepixels.ui.modalDialog',
    'ninepixels.ui.htmlEditor',
    'ninepixels.ui.typeahead',
    'ninepixels.ui.uploader'

]).constant('config', {
    server_url: 'http://te-cooling.rs/api/web/',
    client_url: 'http://te-cooling.rs/',
    client_id: '1_5596cpsi3qg4ogkccc8socoso4skwsgwkwg8gc0kkwsgwsgsk0',
    client_secret: '5ywcrv8et88wkc8s408kgskkc4s48gcw08g0ws0o8w48cw0gg4',
    templates: {
        "Homepage": "homepage.php",
        "Content Page": "content-page.php",
        "List View": "list-view.php",
        "Single View": "single-view.php",
        "Panel View": "panel-view.php",
        "Reference": "reference.php",
        "Gallery": "gallery.php",
        "Blog list": "blog-list.php"
    }
});
