<?php require_once 'np-controller/server/controller.php' ?>
<!DOCTYPE html>
<html lang="en" ng-app="ninepixels" class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title><?php echo $GLOBALS['page']->title ?> | TE Cooling</title>
        <meta name="description" content="<?php echo isset($GLOBALS['page']->description) ? strip_tags($GLOBALS['page']->description) : $GLOBALS['OPTIONS'][2]->value ?>">
        <meta name="keywords" content="<?php echo isset($GLOBALS['OPTIONS'][3]->value) ? $GLOBALS['OPTIONS'][3]->value : '' ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#2db8b5">
        <meta name="author" content="TE Cooling">
        <meta property="og:title" content="<?php echo $GLOBALS['page']->title ?>" />
        <meta property="og:description" content="<?php echo isset($GLOBALS['page']->description) ? $GLOBALS['page']->description : $GLOBALS['OPTIONS'][2]->value ?>" />
        <meta property="og:image" content="<?php echo isset($GLOBALS['page']->image) ? $GLOBALS['page']->image->url : '/np-assets/images/logo-black.png' ?>" />

        <link rel="icon" type="image/png" href="/np-assets/images/favicon.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700,300&subset=latin,latin-ext" type="text/css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Work+Sans:400,300,500&subset=latin,latin-ext" type="text/css">

        <?php
        if (isset($_COOKIE['user']) || (isset($GLOBALS['page']->name) && $GLOBALS['page']->name === 'login-page')) {
            echo '<link rel="stylesheet" href="/np-assets/css/vendor.min.css">';
        }
        ?>
        <link rel="stylesheet" href="/np-assets/css/app.min.css?v1">
    </head>
    <body class="<?php echo str_replace(".php", "", $GLOBALS['page']->template) ?>">
        <?php
        if (isset($GLOBALS['page']->name) && $GLOBALS['page']->name === 'login-page') {
            echo '<div np-login></div>';
        } else {
            if (isset($_COOKIE['user']) && !$GLOBALS['WITHOUT_TOOLBAR']) {
                echo '<div class="site-controller" np-controller></div>';
                echo '<iframe id="editor-iframe" src="' . $_SERVER['REQUEST_URI'] . '?toolbar=false"></iframe>';
            } else {
                if (isset($GLOBALS['page']->show_header) || strrpos($GLOBALS['page']->name, 'news/') !== false) {
                    include_once 'np-templates/element_header.php';
                }

                include 'np-templates/' . $GLOBALS['page']->template;

                if (isset($GLOBALS['page']->show_footer) || strrpos($GLOBALS['page']->name, 'news/') !== false) {
                    include_once 'np-templates/element_footer.php';
                }
            }
        }

        echo '<script type="text/javascript" src="/np-assets/js/app.min.js"></script>';
        if (isset($_COOKIE['user']) || (isset($GLOBALS['page']->name) && $GLOBALS['page']->name === 'login-page')) {
            echo '<script type="text/javascript" src="/np-assets/js/vendor.min.js"></script>';
            echo '<script type="text/javascript" src="/np-assets/js/controller.min.js"></script>';
        }
        ?>
        <script async defer src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-53034ba001120275"></script>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZLBCwatqujVUps8V1aInlCTAs-2ktq0E&callback=initMap"></script>
        <script>
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                        m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-76942408-1', 'auto');
            ga('send', 'pageview');

        </script>
    </body>
</html>