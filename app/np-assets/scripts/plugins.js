(function ($) {
    $.fn.pixelate = function (options) {
        var settings = $.extend({
            squareSize: 25,
            animationSpeed: 2000,
            animationDelay: 30,
            beforeAnimation: false,
            afterAnimation: false
        }, options);

        var pixelateCounter = $("*[class^='pixelate-container-']").length + 1;

        this.each(function () {
            // DEFINE ELEMENT
            var elem = $(this);

            // ELEMENT COLOR
            var boxBackgroundColor = elem.css("background-color");
            var boxOpacity = elem.css("opacity");

            // ELEMENT DATA
            elem.data({
                "pixelate-container": ".pixelate-container-" + pixelateCounter
            });

            // SET ELEMENT CSS
            elem.css({
                backgroundColor: "transparent",
                border: 0
            });

            // ELEMENT SIZE
            var boxWidth = 512;
            var boxHeight = 512;

            // ELEMENT POSITION
            var boxOffsetTop = elem.offset().top;
            var boxOffsetLeft = elem.offset().left;

            // FIND RIGHT SQUARE SIZE
            var squareSize = 64;

            // GENERATE CONTAINER WITH PIXELS
            var container = "<div class='pixelate-container-" + pixelateCounter + "'>";

            for (var i = 0; i < squareSize; i++) {
                container += "<span class='pixel'></span>";
            }
            container += "</div>";

            // ADD CONTAINER TO PAGE
            $("body").prepend(container);

            // CONTAINER STYLE
            $(".pixelate-container-" + pixelateCounter).css({
                position: "absolute",
                width: boxWidth + "px",
                height: boxHeight + "px",
                top: boxOffsetTop,
                left: boxOffsetLeft,
                fontSize: 0,
                lineHeight: 0
            });

            // EACH PIXEL STYLE
            $(".pixelate-container-" + pixelateCounter + " span.pixel").css({
                display: "inline-block",
                width: squareSize + "px",
                height: squareSize + "px",
                backgroundColor: boxBackgroundColor,
                zIndex: 99
            });

            // ADD EACH PIXEL FINAL POSITION AND RANDOM POSITION
            $(".pixelate-container-" + pixelateCounter + " span.pixel").each(function () {
                var randomLeft = Math.floor(Math.random() * 600) + (boxWidth / 2);
                randomLeft *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
                var randomTop = Math.floor(Math.random() * 600) + (boxHeight / 2);
                randomTop *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

                $(this).data('final', {
                    top: $(this).offset().top,
                    left: $(this).offset().left
                });

                $(this).css({
                    opacity: 0,
                    top: randomTop,
                    left: randomLeft
                });
            });

            // REMOVE CONTAINER STYLES AND SET PIXELS ABSOLUTE
            $(".pixelate-container-" + pixelateCounter).removeAttr("style");
            $(".pixelate-container-" + pixelateCounter + " span.pixel").css("position", "absolute");

            // START ANIMATION
            var delay = 0;
            $(".pixelate-container-" + pixelateCounter + " span.pixel").each(function (index) {
                $(this).delay(delay).animate({
                    opacity: boxOpacity,
                    top: $(this).data('final').top,
                    left: $(this).data('final').left
                }, settings.animationSpeed, function () {
                    if (index === i - 1) {
                        $(elem.data("pixelate-container")).remove();
                        elem.css("background-color", boxBackgroundColor);
                        settings.afterAnimation;
                    }
                });
                delay += settings.animationDelay;
            });

            // DEFINE NEXT PIXELATE COUNTER
            pixelateCounter++;
        });
    };

}(jQuery));