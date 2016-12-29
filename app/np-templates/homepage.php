Homepage
<?php
foreach (getContent('items') as $item) {
    if (isset($item->image)) {
        echo '<img src="' . $GLOBALS['server_url'] . 'uploads/' . $item->image->url . '" />';
    }
    echo npEditor('div', '', $item);
}

