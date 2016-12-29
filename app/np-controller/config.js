'use strict';

angular.module('ninepixels', [
    'ngCookies', 'ui.bootstrap',
    'angular-loading-bar',

    'ninepixels.toolbar',
    'ninepixels.editor',
    'ninepixels.assets',

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

]).constant('server_url', 'http://localhost:8000/');