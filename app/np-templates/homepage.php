<div class="container-fluid home-slider">
    <a class="fancybox fancybox.iframe" href="https://www.youtube.com/embed/uNWB5N-Sq9Q?autoplay=1">
        <span class="play-button"></span>
    </a>
    <div class="videoContainer">
        <div id="videoPlayer"></div>
    </div>
    <?php
    $homepage_items = getContent('pages/' . $GLOBALS['page']->id . '/items');
    foreach (filterBy($homepage_items, 'identifier', 'home-slider') as $item) {
        echo npEditor('div', 'row', $item, true);
        if (property_exists($item, 'image')) {
            echo '<span class="teaser_image" style="background-image:url(' . $GLOBALS['SERVER_URL'] . 'uploads/' . $item->image->url . ')"></span>';
        }
        echo '<span class="teaser">' . $item->structure . '</span>';
        echo '</div>';
    }
    ?>
    <div class="home-slider-mask"></div>
</div>

<div class="container home-teaser">
    <div class="row">
        <?php
        foreach (filterBy($GLOBALS['PAGES'], 'parent', $GLOBALS['page'], true) as $s_page) {
            echo '<div class="col-md-4"><a href="/' . $s_page->name . $GLOBALS['WITHOUT_TOOLBAR'] . '">';
            echo '<h2>' . $s_page->navigation . '</h2>';
            echo '<p>' . $s_page->description . '</p>';
            echo npImage($s_page, '', 'gallery');
            echo '</a></div>';
        }
        ?>
    </div>
</div>

<div class="container home-cooperate">
    <?php
    foreach (filterBy($homepage_items, 'identifier', 'home-cooperate', false, 'position') as $item) {
        echo '<div class="row">';
        echo npEditor('div', 'col-md-12', $item, true);
        echo $item->structure;
        if (property_exists($item, 'gallery')) {
            echo '<div class="home-logos"><div class="row">';
            $gallery_items = getContent('galleries/' . $item->gallery->id . '/images');
            foreach ($gallery_items as $gallery) {
                echo '<div class="col-md-2">';
                echo '<a href="' . $gallery->description . '" target="_blank">';
                echo '<img src="' . $GLOBALS['SERVER_URL'] . 'uploads/thumbs/' . $gallery->url . '" alt="' . $gallery->alt . '">';
                echo '</a>';
                echo '</div>';
            }
            echo '</div></div>';
        }
        echo '</div>';
        echo '</div>';
    }
    ?>
</div>
