<section id="cover-page">
    <div class="cover-mask"></div>
    <div class="cover-pixel">
        <svg id="weCollect" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="400px" height="60px" viewBox="0 0 1490.531 194.604" enable-background="new 0 0 1490.531 194.604"
             xml:space="preserve">
            <polyline fill="none" stroke="#FFFFFF" stroke-width="11" stroke-linejoin="bevel" stroke-miterlimit="10" points="33.103,31.881 
                      59.686,164.65 92.068,31.881 123.686,164.65 151.225,31.881 "/>
            <polyline fill="none" stroke="#FFFFFF" stroke-width="11" stroke-miterlimit="10" points="305.298,36.526 240.686,36.526 
                      240.686,159.526 305.298,159.526 "/>
            <line fill="none" stroke="#FFFFFF" stroke-width="11" stroke-miterlimit="10" x1="298.095" y1="96.026" x2="240.686" y2="96.026"/>
            <path fill="none" stroke="#FFFFFF" stroke-width="11" stroke-miterlimit="10" d="M549.186,70.454c0,0,3-35.928-31.75-35.428
                  s-34.75,33.5-34.75,34.25s-2.285,57.473,3,72.75s23,20.5,32.75,20s31.131-3.146,30.815-35.948"/>
            <path fill="none" stroke="#FFFFFF" stroke-width="11" stroke-miterlimit="10" d="M672.658,35.021c0,0,35.777,0.505,35.777,39.755
                  s0,55.5,0,55.5s-3.805,31.782-35.777,31.782s-36.473-26.032-36.473-48.282s0-39.5,0-39.5S636.381,35.021,672.658,35.021z"/>
            <polyline fill="none" stroke="#FFFFFF" stroke-width="11" stroke-miterlimit="10" points="801.936,31.881 801.936,159.359 
                      861.404,159.359 "/>
            <polyline fill="none" stroke="#FFFFFF" stroke-width="11" stroke-miterlimit="10" points="943.936,31.881 943.936,159.359 
                      1003.404,159.359 "/>
            <polyline fill="none" stroke="#FFFFFF" stroke-width="11" stroke-miterlimit="10" points="1151.175,36.526 1086.563,36.526 
                      1086.563,159.526 1151.175,159.526 "/>
            <line fill="none" stroke="#FFFFFF" stroke-width="11" stroke-miterlimit="10" x1="1143.972" y1="96.026" x2="1086.563" y2="96.026"/>
            <path fill="none" stroke="#FFFFFF" stroke-width="11" stroke-miterlimit="10" d="M1296.877,69.94c0,0,3-35.928-31.75-35.428
                  s-34.75,33.5-34.75,34.25s-2.285,57.473,3,72.75s23,20.5,32.75,20s31.131-3.146,30.815-35.948"/>
            <line fill="none" stroke="#FFFFFF" stroke-width="11" stroke-miterlimit="10" x1="1370.549" y1="36.776" x2="1455.627" y2="36.776"/>
            <line fill="none" stroke="#FFFFFF" stroke-width="11" stroke-miterlimit="10" x1="1413.088" y1="164.65" x2="1413.088" y2="36.776"/>
        </svg>
        <b>PIXELS</b>
        <span class="bring-to-life">and <b>BRING</b> them <b>TO LIFE</b></span> 
        <img class="scroll-animation" src="<?php echo $GLOBALS['CLIENT_URL'] ?>np-assets/images/scroll-animation.gif" alt="scroll animation" />
    </div>
</section>

<?php
foreach ($GLOBALS['PAGES'] as $page) {
    if ($page->name !== 'homepage' && $page->name !== 'blog' && !isset($page->parent)) {
        include 'np-templates/' . $page->template;
    }
}
?>