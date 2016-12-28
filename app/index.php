<?php require_once 'np-controller/server/controller.php' ?>
<!DOCTYPE html>
<html lang="en" ng-app="ninepixels" class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Ninepixels Seed Application</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="assets/images/favicon.png" />
        <?php
        if (isset($_COOKIE['user']) || (isset($GLOBALS['page']->name) && $GLOBALS['page']->name === 'login-page')) {
            echo '<link rel="stylesheet" href="/np-assets/css/vendor.min.css">';
        }
        ?>
        <link rel="stylesheet" href="/np-assets/css/app.min.css">
    </head>
    <body>
        <?php
        if (isset($_COOKIE['user'])) {
            echo '<div class="site-controller" np-toolbar></div>';
        }

        if (isset($GLOBALS['page']->name) && $GLOBALS['page']->name === 'login-page') {
            echo '<div np-login></div>';
        } else {
            include 'np-templates/' . $GLOBALS['page']->template;
        }
        ?>

        <script src="<?php echo $GLOBALS['webpage_url'] ?>/np-assets/js/app.min.js"></script>

        <?php
        if (isset($_COOKIE['user']) || (isset($GLOBALS['page']->name) && $GLOBALS['page']->name === 'login-page')) {
            echo '<script src="/np-assets/js/vendor.min.js"></script>';
            echo '<script src="/np-assets/js/controller.min.js"></script>';
        }
        ?>
    </body>
</html>