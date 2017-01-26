'use strict';

angular.module('ninepixels', [
    'angular-loading-bar',
    'ngCookies', 'ui.bootstrap',

    'ninepixels.toolbar',
    'ninepixels.editor',
    'ninepixels.assets',
    'ninepixels.blog',
    'ninepixels.products',

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
//    server_url: 'http://api.hotelcitysavoy.com/',
    server_url: 'http://localhost:8000/',
    client_url: 'http://localhost:8100/',
    client_id: '1_13mqjdwvnbmsscg0ocscowcwswgcggswwsckcs0c840sscgg4o',
    client_secret: '5dpvgqn50akgoo4o4o84swc0ss88kkwk44cow4s404g8g4wowo'

});