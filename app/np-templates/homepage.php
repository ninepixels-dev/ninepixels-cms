Homepage
<?php
foreach (getContent('items') as $item) {
    echo npEditor('div', '', $item);
}

