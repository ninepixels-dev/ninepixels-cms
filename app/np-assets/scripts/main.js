/* global _ */

$(document).ready(function () {
    // SET HEADER INITIALY
    setHeader(this);

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

    // CALCULATE FLOW POSITION OF SLIDER
    $("div.flow-description").each(function () {
        $(this).children(".flow-label").css({
            marginTop: ($(this).outerHeight() - ($(this).children(".flow-label").outerHeight() + $(this).children("ul").outerHeight())) / 2 - 40
        });
    });

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

    // SET TEXTBOX INDENT BECASE OF LABELS
    $('.contact-form input, .contact-form textarea').each(function () {
        $(this).css({'text-indent': $(this).siblings('label').outerWidth() + 10});
    });

    // OPEN REFERENCE
    $('.preview-reference').click(function (e) {
        e.preventDefault();

        var self = $(this);
        $('body').prepend('<div class="loader" style="opacity: 0"></div>');
        $('.loader').animate({opacity: 1}, 500, function () {
            return window.location.href = self.attr('data-url');
        });
    });

    // REFERENCE MOBILE HEADER
    $('.reference-mobile-header').click(function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $('.reference-description').toggleClass('active');
    });

    // CLOSE REFERENCE
    $('.close-reference').click(function (event) {
        event.preventDefault();
        $('body').prepend('<div class="loader" style="opacity: 0"></div>');

        $('.loader').animate({opacity: 1}, 500, function () {
            return history.back(1);
        });
    });

    // CONTACT FORM FUNCTIONALITY
    $('.contact-form').submit(function (e) {
        e.preventDefault();
        var data = $(this).serializeArray();
        $.ajax({
            type: 'POST',
            url: 'https://www.ninepixels.io/np-api/web/mailer/sendmail',
            data: {
                'subject': 'Nova poruka od: ' + data[0].value + ' ' + data[1].value,
                'from': data[2].value,
                'to': 'no-reply@ninepixels.rs',
                'body': data[4].value + '\n\nTelefon: ' + data[3].value
            }
        }).done(function (response) {
            if (response.status === 200) {
                $('.contact-form')[0].reset();
                $('.message.error').fadeOut(800);
                $('.message.errorMail').fadeOut(800);
                $('.info-wrapper, .message.success').fadeIn(800);
                setTimeout(function () {
                    $('.info-wrapper, .message.success').fadeOut(800);
                }, 4000);
            }
        });
    });
});

$(window).load(function () {
    return afterSiteLoades();
});

$(window).scroll(function () {
    var scrollPos = $(this).scrollTop();

    //Scroll and fade out the banner text
    $('.cover-pixel').css({
        'opacity': 0.8 - (scrollPos / 800)
    });

    setHeader(this);
});

function afterSiteLoades() {
    if ($("#weCollect").length) {
        var weCollect = new Vivus('weCollect', {
            type: 'oneByOne',
            start: 'manual',
            duration: 100
        }, function () {
            $('span.bring-to-life').fadeIn('1000', function () {
                $('img.scroll-animation').fadeIn('1000');
            }).css('display', 'block');
        });
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
    }

    // PIXELATE COVER PIXEL
    if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 590) {
        $('.cover-pixel').pixelate({squareSize: 75});

        setTimeout(function () {
            weCollect ? weCollect.play() : false;
        }, 2000);
    } else {
        weCollect ? weCollect.play() : false;
    }
}

function setHeader(element) {
    var coverPage = $('#cover-page'),
            header = $('header'),
            document = $(element);

    if (coverPage.length) {
        if (document.scrollTop() > coverPage.outerHeight() - header.outerHeight()) {
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }

    } else {
        header.addClass('fixed');
    }
}