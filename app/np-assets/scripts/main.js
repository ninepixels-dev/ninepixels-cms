$(window).load(function () {
    return playVideo();
});

$(window).scroll(function () {
    if ($('.content-teaser').length) {
        var contentTeaser = $('.content-teaser').outerHeight();

        if (contentTeaser < $(document).scrollTop()) {
            $('.container-fluid.header').addClass('dark-one');
        } else {
            $('.container-fluid.header').removeClass('dark-one');
        }
    }
    if ($('.home-slider').length) {
        var homeSlider = $('.home-slider').outerHeight();
        var sliderMask = $('.home-slider-mask').outerHeight();

        if ((homeSlider - sliderMask) < $(document).scrollTop()) {
            $('.container-fluid.header').addClass('dark-one');
        } else {
            $('.container-fluid.header').removeClass('dark-one');
        }
    }
});

$(document).ready(function () {
    // Start animation when in viewport
    if ($('.tecooling-animation').length) {
        $(window).scroll(function () {
            if ($(window).scrollTop() >= $('.tecooling-animation-container').offset().top - 300) {
                $('.tecooling-animation-container *').css({
                    '-webkit-animation-play-state': 'running',
                    'animation-play-state': 'running'
                });
            }
        });

        calcAnimationSize();

        $(window).resize(function () {
            calcAnimationSize();
        });

        function calcAnimationSize() {
            var windowSize = $(window).width();
            var zoomProperty = $(window).width() / 1200;

            if (zoomProperty > 1) {
                zoomProperty = 1;
            }

            if (windowSize <= 1200) {
                $('.tecooling-animation-container').css({
                    'zoom': zoomProperty,
                    '-moz-transform': 'scale(' + zoomProperty + ')'
                });
            }
        }
    }

    $('.mobile-navigation a[href="#"]').click(function (e) {
        var self = $(this);

        $('.mobile-main-navigation').animate({
            scrollTop: self.position().top
        }, 1000);

        e.preventDefault();
    });

    $('.mobile-nav-button').click(function () {
        $(this).parent().toggleClass('active');
    });

    $('.meta-nav-button').click(function () {
        $('.container-fluid.header').toggleClass('meta-menu');
    });

    $('.single-view-teaser').find('blockquote').each(function () {
        $(this).css({
            left: '50%',
            marginLeft: -$(this).outerWidth() / 2
        });
    });


    $('.floating-contact-button').mouseover(function () {
        $(this).stop().animate({
            width: "300px",
            padding: "25px 85px 25px 25px",
            "font-size": "17px"
        }, 300);
    }).mouseout(function () {
        $(this).stop().animate({
            width: "85px",
            padding: "25px 25px 25px 25px",
            "font-size": "0px"
        }, 300);
    });

    $(".fancybox").fancybox();

    $('div.floating-contact-button').click(function () {
        var target = $('.footer-map');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
            return false;
        }
    });

    // Contact form
    $("#contact-form input, #contact-form textarea").focus(function () {
        $(this).siblings('label').hide();
    });
    $("#contact-form input, #contact-form textarea").blur(function () {
        if ($(this).val() === "") {
            $(this).siblings('label').show();
        }
    });

    $('.contact-form').submit(function (e) {
        e.preventDefault();
        var data = $(this).serializeArray();
        var body = 'Vrsta objekta: ' + data[4].value + '\n';
        body += 'Veličina objekta: ' + data[5].value + '\n\n';
        body += 'Poruka: ' + data[6].value + '\n';

        $.ajax({
            type: 'POST',
            url: 'http://te-cooling.rs/api/web/mailer/sendmail',
            data: {
                'subject': 'Nova poruka od: ' + data[0].value,
                'from': data[2].value,
                'to': 'info@te-cooling.rs',
                'body': body
            }
        }).done(function (response) {
            if (response.status === 200) {
                $('.contact-form')[0].reset();
                $('.contact-form').find('input, textarea').siblings('label').show();
                $('.contact-form').find('.message.error').fadeOut(800);
                $('.contact-form').find('.message.errorMail').fadeOut(800);
                $('.contact-form').find('.info-wrapper, .message.success').fadeIn(800);
                setTimeout(function () {
                    $('.contact-form').find('.info-wrapper, .message.success').fadeOut(800);
                }, 4000);
            }
        });
    });

    // Active tab
    if ($('.tabs-pane')) {
        $('.tabs-pane .nav-tabs > li:first-of-type').addClass('active');
        $('.tabs-pane .tab-content > .tab-pane:first-of-type').addClass('active in');
    }
});

function seeSingle(page) {
    $('#singleViewPage .modal-content').html('<div class="loader">Loading...</div>');
    $('#singleViewPage').modal('show');
    $.ajax({
        url: "/np-templates/single-view.php",
        data: {page_id: page}
    }).done(function (response) {
        $('#singleViewPage .modal-content').html(response);
        if ($('.tabs-pane')) {
            $('.tabs-pane .nav-tabs > li:first-of-type').addClass('active');
            $('.tabs-pane .tab-content > .tab-pane:first-of-type').addClass('active in');
        }
    });
}
