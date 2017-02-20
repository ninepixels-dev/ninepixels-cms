<?php

// Enable GZIP
ob_start("ob_gzhandler");

// Set defaults
$GLOBALS['SERVER_URL'] = 'http://localhost:8000/';
$GLOBALS['CLIENT_URL'] = 'http://localhost:8100/';
$GLOBALS['LOCALE'] = '';

$GLOBALS['WITHOUT_TOOLBAR'] = isset($_GET['toolbar']);

// If URL is np-admin, open administratin page
if (parseURL() === 'np-admin') {
    return $GLOBALS['page'] = (object) array('id' => '0', 'name' => 'login-page', 'title' => 'Login Page', 'description' => 'Login Page');
}

// Load assets
$assets = array(
    'pages' => json_decode(file_get_contents($GLOBALS['SERVER_URL'] . 'pages')) ?: array(),
    'locales' => json_decode(file_get_contents($GLOBALS['SERVER_URL'] . 'locales')) ?: array(),
    'blogs' => json_decode(file_get_contents($GLOBALS['SERVER_URL'] . 'blogs')) ?: array(),
    'products' => json_decode(file_get_contents($GLOBALS['SERVER_URL'] . 'products')) ?: array()
);

// Merge all page-type data
$pages = array_merge($assets['pages'], $assets['blogs'], $assets['products']);

// If there are no pages, return not found
if (empty($pages)) {
    return pageNotFound();
}

if (!empty($assets['locales'])) {
    $url = parseURL(true)[1];
    foreach ($assets['locales'] as $locale) {
        if ($locale->code === $url) {
            $GLOBALS['LOCALE'] = 'locales/' . $locale->id . '/';
            $GLOBALS['LOCALE_CODE'] = $locale->code;
            break;
        }
    }
}

foreach ($pages as $page) {
    $url = parseURL();
    if ($page->name === $url) {
        $GLOBALS['page'] = $page;
        break;
    }
    pageNotFound();
}

function parseURL($separated = false) {
    $explode = explode('?', $_SERVER['REQUEST_URI'], 2);
    $clean = substr($explode[0], 1);
    if (isset($GLOBALS['LOCALE_CODE'])) {
        $clean = str_replace($GLOBALS['LOCALE_CODE'] . '/', '', $clean);
    }
    if ($separated) {
        return explode('/', $explode[0]);
    }
    return empty($clean) ? 'homepage' : $clean;
}

function pageNotFound() {
    return $GLOBALS['page'] = (object) array('id' => '-1', 'name' => 'Not Found',
                'template' => 'error_404.php', 'title' => 'Page Not Found', 'description' => 'Page Not Found');
}

function npEditor($element, $class, $item, $withoutContent = false) {
    $classes = isset($item->classes) ? (empty($class) ? '' : ' ') . $item->classes : '';
    $visible = isset($item->visible) && $item->visible === 0 ? ' np-toggle-off' : '';

    echo '<' . $element . ' ';
    echo 'class="' . $class . $classes . $visible . '" ';
    if (isset($_COOKIE['user'])) {
        echo 'np-editor data-item="' . $item->id . '" data-identifier="' . $item->identifier . '" data-page="' . $GLOBALS['page']->id . '"';
    }
    echo '>';

    if (!$withoutContent) {
        echo $item->structure;
        echo '</' . $element . '>';
    }
}

function npImage($item, $classes = '', $thumbs = false) {
    if (isset($item->image)) {
        $thumbs = $thumbs ? 'uploads/' . $thumbs . '/' : 'uploads/';
        echo '<img class="' . $classes . '" src="' . $GLOBALS['SERVER_URL'] . $thumbs . $item->image->url . '" alt="' . $item->image->alt . '" title="' . $item->image->title . '">';
    }
}

function getContent($path) {
    $file = file_get_contents($GLOBALS['SERVER_URL'] . $GLOBALS['LOCALE'] . $path);
    $json = json_decode($file);
    if (!empty($json)) {
        return $json;
    } else {
        return [];
    }
}

function filterBy($items, $key, $value) {
    $array = array_filter($items, function($obj) use ($key, $value) {
        return $obj->{$key} === $value ? true : false;
    });


    if (empty($array) && isset($_COOKIE['user'])) {
        return array((object) array("id" => 0, "identifier" => $value, "structure" => '', "classes" => "np-item-holder"));
    }

    return $array;
}

// Set reusable data
$GLOBALS['PAGES'] = $assets['pages'];
setcookie("page", json_encode($GLOBALS['page']));
