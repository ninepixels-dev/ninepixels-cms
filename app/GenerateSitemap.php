<?php

$time = explode(" ", microtime());
$time = $time[1];

// include helper
include 'np-controller/server/controller.php';

// include class
include 'np-controller/server/SitemapGenerator.php';

// create object
$sitemap = new SitemapGenerator($GLOBALS['CLIENT_URL'], "");

// will create also compressed (gzipped) sitemap
$sitemap->createGZipFile = true;

// determine how many urls should be put into one file
$sitemap->maxURLsPerSitemap = 10000;

// sitemap file name
$sitemap->sitemapFileName = "sitemap.xml";

// sitemap index file name
$sitemap->sitemapIndexFileName = "sitemap-index.xml";

// robots file name
$sitemap->robotsFileName = "robots.txt";

// Fill URLS into array
$urls = array();
foreach ($GLOBALS['PAGES'] as $page) {
    array_push($urls, array($GLOBALS['CLIENT_URL'] . $page->name, date('c')));
}

// add many URLs at one time
$sitemap->addUrls($urls);

try {
    // create sitemap
    $sitemap->createSitemap();

    // write sitemap as file
    $sitemap->writeSitemap();

    // update robots.txt file
    $sitemap->updateRobots();

    // submit sitemaps to search engines
    $result = $sitemap->submitSitemap();

    // shows each search engine submitting status
    echo "<pre>";

    print_r($result);
    echo "</pre>";
} catch (Exception $exc) {
    echo $exc->getTraceAsString();
}

echo "Memory peak usage: " . number_format(memory_get_peak_usage() / (1024 * 1024), 2) . "MB";

$time2 = explode(" ", microtime());
$time2 = $time2[1];

echo "<br>Execution time: " . number_format($time2 - $time) . "s";
?>