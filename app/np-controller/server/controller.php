<?php

$GLOBALS['server_url'] = 'http://localhost:8000/';
$GLOBALS['webpage_url'] = 'http://localhost:8100/';

$requestURI = $_SERVER['REQUEST_URI'];
$cleanURL = explode('?', $requestURI, 2);
$parseURL = substr($cleanURL[0], 1);

if ($parseURL === 'np-admin') {
    return $GLOBALS['page'] = (object) array(
                'id' => '0',
                'name' => 'login-page',
                'title' => 'Login Page',
                'description' => 'Login Page'
    );
}

if (!$parseURL) {
    $parseURL = 'homepage';
}

$pages = json_decode(file_get_contents($GLOBALS['server_url'] . 'pages'));

if (empty($pages)) {
    return pageNotFound();
}

foreach ($pages as $page) {
    if ($page->name === $parseURL) {
        $GLOBALS['page'] = $page;
        break;
    }

    pageNotFound();
}

function pageNotFound() {
    return $GLOBALS['page'] = (object) array(
                'id' => '-1',
                'name' => 'Not Found',
                'template' => 'error_404.php',
                'title' => 'Page Not Found',
                'description' => 'Page Not Found'
    );
}

function npEditor($element, $class, $item) {
    $classes = isset($item->classes) ? (empty($class) ? '' : ' ') . $item->classes : '';
    $visible = isset($item->visible) && $item->visible === 0 ? ' np-toggle-off' : '';

    echo '<' . $element . ' ';
    echo 'class="' . $class . $classes . $visible . '" ';
    if (isset($_COOKIE['user'])) {
        echo 'np-editor data-item="' . $item->id . '" data-identifier="' . $item->identifier . '" data-page="' . $GLOBALS['page']->id . '"';
    }
    echo '>' . $item->structure;
    echo '</' . $element . '>';
}

function getContent($path) {
    $file = file_get_contents('http://localhost:8000/' . $path);
    return json_decode($file);
}

setcookie("page", json_encode($GLOBALS['page']));
