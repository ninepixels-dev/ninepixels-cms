/* global _ */

var siteLoaded = false;

try {
    var loader = new Vivus('loader', {
        type: 'delayed',
        start: 'autostart',
        duration: 75
    }, function () {
        setTimeout(function () {
            if (siteLoaded) {
                return afterSiteLoades();
            }
            loader.reset().play();
        }, 500);
    });
} catch (err) {
}

$(document).ready(function () {
    // DEFINE VIVUS ELEMENTS
    try {
        var globe = new Vivus('globe', {
            type: 'delayed',
            start: 'inViewport',
            duration: 150
        });
        var design = new Vivus('design', {
            type: 'delayed',
            start: 'inViewport',
            duration: 150
        });
        var diamond = new Vivus('diamond', {
            type: 'delayed',
            start: 'inViewport',
            duration: 150
        });
    } catch (err) {
    }

    // FLOW SLIDER
    var flowSlider = $(".flow-slider").owlCarousel({
        items: 1,
        mouseDrag: false,
        touchDrag: true,
        pullDrag: false,
        freeDrag: false,
        smartSpeed: 1000,
        onTranslated: function () {
            $(".flow-slider .owl-item.active").addClass("dimmed");
        },
        onInitialized: function () {
            $(".flow-slider .owl-item.active").addClass("dimmed");
        }
    });

    // FLOW NAVIGATION AND ANIMATION
    $(".flow-navigation.left").click(function () {
        return flowNavigatePrev();
    });
    $(".flow-navigation.right, button.flow-start").click(function () {
        return flowNavigateNext();
    });

    function flowNavigateNext() {
        $(".owl-item.active").removeClass("dimmed");
        setTimeout(function () {
            flowSlider.trigger('next.owl.carousel');
        }, 1200);
    }

    function flowNavigatePrev() {
        $(".owl-item.active").removeClass("dimmed");
        setTimeout(function () {
            flowSlider.trigger('prev.owl.carousel');
        }, 1200);
    }

    // CALL SLIDER FOR QUOTES
    $(".quotes-slider").owlCarousel({
        items: 1,
        loop: true,
        autoHeight: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 1500,
        autoplayHoverPause: true
    });

    // CALL SLIDER FOR REFERENCES
    $(".reference-slider").owlCarousel({
        items: 3,
        stagePadding: 150,
        startPosition: 1,
        loop: true,
        responsive: {
            1580: {items: 3, stagePadding: 150},
            1366: {items: 3, stagePadding: 80},
            960: {items: 2, stagePadding: 80},
            800: {items: 2, stagePadding: 30},
            620: {items: 1, stagePadding: 100},
            480: {items: 1, stagePadding: 50},
            0: {items: 1, stagePadding: 30}
        }
    });

    // SET TEXTBOX INSEAT BECASE OF LABELS
    $('.contact-form input, .contact-form textarea').each(function () {
        $(this).css({'text-indent': $(this).siblings('label').outerWidth() + 10});
    });
});

$(window).load(function () {
    return siteLoaded = true;
});

$(window).scroll(function () {
    var coverPage = $('#cover-page'),
            header = $('header'),
            document = $(this);

    if (document.scrollTop() > coverPage.outerHeight() - header.outerHeight()) {
        header.addClass('fixed');
    } else {
        header.removeClass('fixed');
    }
});

function afterSiteLoades() {
    $('.loader svg').animate({opacity: 0}, 500);
    $('.loader .left-side').animate({left: '-200vw'}, 1000);
    $('.loader .right-side').animate({right: '-200vw'}, 1000, function () {
        $('.loader').remove();

        var weCollect = new Vivus('weCollect', {
            type: 'oneByOne',
            start: 'manual',
            duration: 100
        }, function () {
            $('span.bring-to-life').fadeIn('1000', function () {
                $('img.scroll-animation').fadeIn('1000');
            }).css('display', 'block');
        });

        // PIXELATE COVER PIXEL
        if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 590) {
            $('.cover-pixel').pixelate({squareSize: 75});
            setTimeout(function () {
                weCollect.play();
            }, 2000);
        } else {
            weCollect.play();
        }

        // CALCULATE HOW-WE-DO POSITION OF SLIDER
        $("div.flow-description").each(function () {
            $(this).children(".flow-label").css({
                marginTop: ($(this).outerHeight() - ($(this).children(".flow-label").outerHeight() + $(this).children("ul").outerHeight())) / 2 - 40
            });
        });
    });
}