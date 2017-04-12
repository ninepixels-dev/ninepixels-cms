<?php
if (count(get_included_files()) === 1) {
    require_once '../np-controller/server/controller.php';
    $page = getContent('pages/' . $_GET['page_id']);
} else {
    $page = $GLOBALS['page'];
}
?>

<div class="modal-body single-view-modal">
    <div class="close-button" data-dismiss="modal">
        <img src="/np-assets/images/close-button-dark.png" class="close-button" alt="close-button">
    </div>
    <div class="teaser-image"><?php echo npImage($page, '', false) ?></div>
    <div class="heading">
        <h2><?php echo $page->navigation ?></h2>
        <p><?php echo $page->description ?></p>
    </div>
    <div class="tabs-pane single-view-tabs">
        <ul class="nav nav-tabs">
            <?php
            $singleview_items = getContent('pages/' . $page->id . '/items');
            $tab_items = filterBy($singleview_items, 'identifier', 'tabs');
            foreach ($tab_items as $item) {
                echo '<li><a data-toggle="tab" href="#tab-' . $item->id . '">' . $item->classes . '</a></li>';
            }
            ?>
        </ul>
        <div class="tab-content">
            <?php
            foreach ($tab_items as $item) {
                echo npEditor('div id="tab-' . $item->id . '"', 'tab-pane fade', $item, true);
                echo npImage($item, '', 'gallery');
                echo isset($item->structure) ? $item->structure : '';

                // Print video
                if (property_exists($item, 'video')) {
                    echo '<a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/' . $item->video . '?autoplay=1">';
                    echo '<img src="http://img.youtube.com/vi/' . $item->video . '/0.jpg"/>';
                    echo '<span class="play-button"></span>';
                    echo '</a>';
                }

                // Print gallery
                if (property_exists($item, 'gallery')) {
                    echo '<div class="content-gallery"><div class="row">';
                    $gallery_items = getContent('galleries/' . $item->gallery->id . '/images');
                    foreach ($gallery_items as $gallery) {
                        echo '<div class="gallery-item">';
                        echo '<a class="fancybox" rel="item-gallery" href="' . $GLOBALS['SERVER_URL'] . 'uploads/' . $gallery->url . '">';
                        echo '<img src="' . $GLOBALS['SERVER_URL'] . 'uploads/thumbs/' . $gallery->url . '" alt="' . $gallery->alt . '">';
                        echo '</a>';
                        echo '</div>';
                    }
                    echo '</div></div>';
                }

                // Print dodatna oprema
                foreach (filterBy($singleview_items, 'identifier', 'dodatna-oprema-' . $item->id) as $additional) {
                    echo npEditor('div', 'oprema item', $additional, true);
                    echo '<span class="shadow"></span>';
                    echo '<div class="itemImage">';
                    echo npImage($additional, '', 'thumbs');
                    echo '</div>';
                    echo isset($additional->structure) ? $additional->structure : '';
                    echo '</div>';
                }
                echo '</div>';
            }
            ?>
        </div>
    </div>
</div>

<script>
    var el = document.getElementById('nav-header');
    if (el) {
        el.className += el.className ? ' dark-one' : 'dark-one';
    }
</script>
