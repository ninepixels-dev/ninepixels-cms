<div class="container single-view-teaser">
    <div class="row">
        <?php
        $listview_items = getContent('pages/' . $GLOBALS['page']->id . '/items');
        foreach (filterBy($listview_items, 'identifier', 'single-view-teaser') as $item) {
            echo npEditor('div', 'col-md-12', $item, true);
            echo npImage($item, '', false);
            echo $item->structure;
            echo '</div>';
        }
        ?>
    </div>
</div>

<div class="container single-view-items">
    <div class="row">
        <?php
        foreach (filterBy($GLOBALS['PAGES'], 'parent', $GLOBALS['page'], true) as $item) {
            echo '<div class="col-md-4">';
            echo npImage($item, '', 'thumbs');
            echo '<div class="detail-info">';
            echo '<h2>' . $item->navigation . '</h2>';
            echo '<p>' . $item->description . '</p>';
            echo isset($_COOKIE['user']) ?
                    '<a href="/' . $item->name . $GLOBALS['WITHOUT_TOOLBAR'] . '">Pročitaj više</a>' :
                    '<a href="javascript:seeSingle(' . $item->id . ')">Pročitaj više</a>';
            echo '</div></div>';
        }
        ?>
    </div>
</div>
<?php
$additional = filterBy($listview_items, 'identifier', 'dodatna-oprema');
$applications = filterBy($listview_items, 'identifier', 'primene');

if (count($additional) > 0 || count($applications) > 0 || isset($_COOKIE['user'])) {
    echo '<div class="container-fluid tabs-pane list-view-tabs"><div class="container">';
    echo '<ul class="nav nav-tabs">';
    echo count($additional) > 0 || isset($_COOKIE['user']) ? '<li><a data-toggle="tab" href="#dodatnaOprema">Dodatna oprema</a></li>' : '';
    echo count($applications) > 0 || isset($_COOKIE['user']) ? '<li><a data-toggle="tab" href="#primene">Primene</a></li>' : '';
    echo '</ul>';
    echo '<div class="tab-content">';

    if (count($additional) > 0 || isset($_COOKIE['user'])) {
        echo '<div id="dodatnaOprema" class="tab-pane fade">';
        foreach ($additional as $item) {
            echo npEditor('div', 'oprema item', $item, true);
            echo '<span class="shadow"></span>';
            echo '<div class="itemImage">';
            echo npImage($item, '', 'thumbs');
            echo '</div>';
            echo isset($item->structure) ? $item->structure : '';
            echo isset($item->link) ? '<a href="' . $item->link . '">Pročitaj više</a>' : '';
            echo '</div>';
        }
        echo '</div>';
    }

    if (count($applications) > 0 || isset($_COOKIE['user'])) {
        echo '<div id="primene" class="tab-pane fade">';
        foreach ($applications as $item) {
            echo npEditor('div', 'primena item', $item, true);
            echo '<span class="shadow"></span>';
            echo '<div class="itemImage">';
            echo npImage($item, '', 'gallery');
            echo '</div>';
            echo isset($item->structure) ? $item->structure : '';
            echo isset($item->link) ? '<a href="/' . $item->link . '">Pročitaj više</a>' : '';
            echo '</div>';
        }
        echo '</div>';
    }

    echo '</div>';
    echo '</div></div>';
}
?>

<div id="singleViewPage" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg modal-xlg">
        <div class="modal-content">
            <div class="loader">Loading...</div>
        </div>
    </div>
</div>

<script>
    var el = document.getElementById('nav-header');
    if (el) {
        el.className += el.className ? ' dark-one' : 'dark-one';
    }
</script>
