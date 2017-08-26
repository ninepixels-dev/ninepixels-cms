<?php require_once 'np-controller/server/controller.php' ?>
<!DOCTYPE html>
<html <?php echo isLoggedIn() ? 'ng-app="ninepixels"' : '' ?> lang="<?php echo _isset($GLOBALS['LANGUAGE_CODE'], $GLOBALS['CONFIG']->language->code) ?>" class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="icon" type="image/png" href="/np-assets/images/favicon.png" />
        <title><?php echo $GLOBALS['CONFIG']->company . ': ' . _isset($GLOBALS['METADATA']->title, $GLOBALS['CONFIG']->title) ?></title>

        <!-- DefaultMeta -->
        <meta name="description" content="<?php echo _isset($GLOBALS['METADATA']->description, $GLOBALS['CONFIG']->description) ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="<?php echo $GLOBALS['CONFIG']->theme_color ?>">
        <meta name="author" content="Nine Pixels">
        <!-- DefaultMeta END -->

        <!-- OpenGraph -->
        <meta property="og:title" content="<?php echo _isset($GLOBALS['METADATA']->title, $GLOBALS['CONFIG']->title) ?>" />
        <meta property="og:description" content="<?php echo _isset($GLOBALS['METADATA']->description, $GLOBALS['CONFIG']->description) ?>" />
        <meta property="og:image" content="<?php echo $GLOBALS['CLIENT_URL'] . _isset($GLOBALS['PAGE']->image->url, 'np-assets/images/logo.png') ?>" />
        <meta property="og:url" content="<?php echo $GLOBALS['CLIENT_URL']; ?>">
        <meta property="og:site_name" content="<?php echo $GLOBALS['CONFIG']->company ?>">
        <meta property="fb:admins" content="">
        <meta property="og:type" content="website">
        <!-- OpenGraph END -->

        <!-- Twitter Card-->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="<?php echo $GLOBALS['CONFIG']->company ?>">
        <meta name="twitter:creator" content="Nine Pixels">
        <meta name="twitter:url" content="<?php echo $GLOBALS['CLIENT_URL']; ?>">
        <meta name="twitter:title" content="<?php echo _isset($GLOBALS['METADATA']->title, $GLOBALS['CONFIG']->title) ?>">
        <meta name="twitter:description" content="<?php echo _isset($GLOBALS['METADATA']->description, $GLOBALS['CONFIG']->description) ?>">
        <meta name="twitter:image" content="<?php echo $GLOBALS['CLIENT_URL'] . _isset($GLOBALS['PAGE']->image->url, 'np-assets/images/logo.png') ?>">
        <!-- Twitter Card END-->

        <?php
        // Without Caching for inside iframe
        if ($GLOBALS['WITHOUT_TOOLBAR']) {
            echo '<meta http-Equiv="Cache-Control" Content="no-cache" />';
            echo '<meta http-Equiv="Pragma" Content="no-cache" />';
            echo '<meta http-Equiv="Expires" Content="0" />';
        }

        // Print option tags head
        if (isset($GLOBALS['OPTIONS'])) {
            foreach (filterBy($GLOBALS['OPTIONS'], 'type', 'head', false) as $item) {
                echo $item->value;
            }
            foreach (filterBy($GLOBALS['OPTIONS'], 'type', 'styling', false) as $item) {
                echo '<style>' . $item->value . '</style>';
            }
        }
        ?>
    </head>
    <body class="<?php echo!$GLOBALS['WITHOUT_TOOLBAR'] && isLoggedIn(true) ? 'with-toolbar' : '' ?>">
        <?php
        if (isLoginPage()) {
            echo '<div np-login></div>';
        } else {
            if (isLoggedIn(true)) {
                echo '<div class="site-controller" np-controller></div>';
                echo '<iframe id="np-editor-iframe" src="' . $_SERVER['REQUEST_URI'] . '?toolbar=false"></iframe>';
            } else {
                if (isset($GLOBALS['PAGE']->page) && $GLOBALS['PAGE']->page->show_header || $GLOBALS['PAGE']->show_header) {
                    include 'np-templates/header.php';
                }

                include 'np-templates/' . $GLOBALS['PAGE']->template;

                if (isset($GLOBALS['PAGE']->page) && $GLOBALS['PAGE']->page->show_footer || $GLOBALS['PAGE']->show_footer) {
                    include 'np-templates/footer.php';
                }
            }
        }

        // Print option tags after-body
        if (isset($GLOBALS['OPTIONS'])) {
            foreach (filterBy($GLOBALS['OPTIONS'], 'type', 'after-body', false) as $item) {
                echo $item->value;
            }
        }

        echo '<link rel="stylesheet" href="/np-assets/css/app.min.css?v1" async>';
        echo '<script type="text/javascript" src="/np-assets/js/app.min.js"></script>';

        if (isLoggedIn()) {
            echo '<link rel="stylesheet" href="/np-assets/css/vendor.min.css">';
            echo '<script type="text/javascript" src="/np-assets/js/vendor.min.js"></script>';
            echo '<script type="text/javascript" src="/np-assets/js/controller.min.js"></script>';
        }
        ?>
    </body>
</html>