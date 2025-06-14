jQuery.noConflict()(function ($) {

    "use strict";
    /*------------------------------------------------------------------

       Responsive Option

    ------------------------------------------------------------------*/
    jQuery(document).ready(function ($) {
        var desktop = '',
            tablet = '',
            mobile = '';
        $(".fl-vc--responsive").each(function () {
            var responsive_param = $(this).attr('data-responsive-param'),
                responsive_target = $(this).data('responsive-target'),
                temp_desktop = '',
                temp_tablet = '',
                temp_mobile = '';
            if (typeof responsive_param != "undefined" || responsive_param != null) {
                $.each($.parseJSON(responsive_param), function (i, v) {
                    var css_prop_function = i;
                    if (typeof v != "undefined" && v != null) {
                        var vals = v.split(";");
                        $.each(vals, function (i, vl) {
                            if (typeof vl != "undefined" || vl != null) {
                                var separator = vl.split(":");
                                switch (separator[0]) {
                                    case 'desktop':
                                        temp_desktop += css_prop_function + ":" + separator[1] + "!important;";
                                        break;
                                    case 'tablet':
                                        temp_tablet += css_prop_function + ":" + separator[1] + "!important;";
                                        break;
                                    case 'mobile':
                                        temp_mobile += css_prop_function + ":" + separator[1] + "!important;";
                                        break;
                                }
                            }
                        });
                    }
                });
            }
            if (temp_mobile != '') {
                mobile += '.' + responsive_target + '{' + temp_mobile + '}';
            }
            if (temp_tablet != '') {
                tablet += '.' + responsive_target + '{' + temp_tablet + '}';
            }
            if (temp_desktop != '') {
                desktop += '.' + responsive_target + '{' + temp_desktop + '}';
            }
        });
        var ResponsiveTextMedia = '<style>/**Responsive Media **/';
        ResponsiveTextMedia += "@media (max-width: 1199px) { " + desktop + "}";
        ResponsiveTextMedia += "@media (max-width: 991px)  { " + tablet + "}";
        ResponsiveTextMedia += "@media (max-width: 767px)  { " + mobile + "}";
        ResponsiveTextMedia += '</style>';
        $('head').append(ResponsiveTextMedia);


    });

    /*------------------------------------------------------------------

       Banner Button

    ------------------------------------------------------------------*/
    $(document).ready(function () {
        $('.fl_banner_button').each(function (index, element) {
            var fl_banner_btn_color = $(this).css("color");
            var fl_banner_btn_bg = $(this).css("background-color");
            var fl_banner_btn_border_color = $(this).css("border-color");
            $(element).hover(
                function () {
                    $(this).css({
                        'color': $(this).attr('data-text-hv'),
                        'background': $(this).attr('data-bg-hv'),
                        'border-color': $(this).attr('data-bg-hv')
                    });
                },
                function () {
                    $(this).css({
                        'color': fl_banner_btn_color,
                        'background': fl_banner_btn_bg,
                        'border-color': fl_banner_btn_border_color
                    });
                }
            );
        });
    });
    /*------------------------------------------------------------------

              Gif

    -------------------------------------------------------------------*/
    var fl_gif_hover = $(".fl-hover-gif img"),
        gif_src = fl_gif_hover.data('gif'),
        static_src = fl_gif_hover.data('static'),
        fl_gif_click = $(".fl-click-gif img"),
        gif_src_click = fl_gif_click.data('gif'),
        static_src_click = fl_gif_click.data('static');
    $(document).ready(function () {
        fl_gif_hover.hover(
            function () {
                $(this).attr("src", gif_src);
            },
            function () {
                $(this).attr("src", static_src);
            }
        );
        fl_gif_click.on("click", function () {
            var animate = $(this).attr("data-animate");
            if (animate === "gif") {
                $(this).attr("src", static_src_click);
                $(this).attr("data-animate", "static");
            }
            else if (animate === "static") {
                $(this).attr("src", gif_src_click);
                $(this).attr("data-animate", "gif");
            }
        });
    });
    /*------------------------------------------------------------------

         Fun box Shortcode

    -------------------------------------------------------------------*/
    $(".fl_fun_box_two").each(function () {
        var width = $(this).find('.fl_fun_text_one').width() + 20;
        $(this).find('.fl_fun_text_two').css({'width': 'calc(100% - ' + width + 'px)'});
    });
    /*------------------------------------------------------------------

       Alert shortcode

    -------------------------------------------------------------------*/
    $(".fl-alert_close").on('click', function () {
        $(this).parent('.fl-alert').addClass("fl_closed_alert");
        $(this).parent('.fl-alert').fadeOut(900);
    });
    /*------------------------------------------------------------------

       Accordion

    -------------------------------------------------------------------*/
    $('.fl_accordion_toggle').click(function (e) {
        e.preventDefault();

        var $this = $(this);

        if ($this.parent().hasClass('show')) {
            $this.parent().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('li').removeClass('show');
            $this.parent().parent().find('li .inner').removeClass('show');
            $this.parent().parent().find('li .inner').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
            $this.parent().addClass('show');
        }
    });
    /*------------------------------------------------------------------

    Progress Bar shortcode / counter

    -------------------------------------------------------------------*/
    var fl_progress_bar = $('.fl-progress-bar');
    $(window).load(function () {
        //Reset Visual Attribute
        if (!$("body").hasClass("compose-mode")) {
            var fl_number_mark = $('.fl-progress-number-mark');
            fl_number_mark.css('left', '0%');
            $('.fl-tracking-progress-bar__item').css('width', '0%');
        }

        fl_progress_bar.each(function () {
            var duration_progress = Number($(this).attr("data-duration"));
            $(this).one('inview', function () {
                $(this).find('.fl-tracking-progress-bar__item').animate({
                    width: $(this).attr('data-progress-width')
                }, duration_progress);
                $(this).find('.fl-progress-wrapper').animate(
                    {text: $(this).attr('data-progress-width')},
                    {
                        duration: duration_progress,
                        step: function (now) {
                            var data = Math.round(now);
                            $(this).find('.fl-progress-bar__number .fl-animated-number').html(data + '%');
                        }
                    });
            });
        });
    });

    /*------------------------------------------------------------------

           Counter shortcode

    -------------------------------------------------------------------*/
    var fl_counter = $('.fl-counter');
    fl_counter.each(function () {
        $(this).one('inview', function () {
            $(this).find('.counter-number').countTo();
        });
    });

    /*------------------------------------------------------------------

      Pie Chart

    -------------------------------------------------------------------*/
    function fl_pie_circle_progressbar() {

        $('.easy_circle_progressbar').each(function () {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if ($(this).attr('data-prefix')) {
                var pie_prefix = $(this).data('prefix');
            } else {
                pie_prefix = '';
            }
            if ($(this).attr('data-suffix')) {
                var pie_suffix = $(this).data('suffix');
            } else {
                pie_suffix = '';
            }
            if ($(this).attr('data-track-width')) {
                var pie_track_width = $(this).data('track-width');
            } else {
                pie_track_width = '';
            }
            if ($(this).attr('data-bar-color')) {
                var pie_bar_color = $(this).data('bar-color');
            } else {
                pie_bar_color = '';
            }
            if ($(this).attr('line-width')) {
                var pie_line_width = $(this).data('line-width');
            } else {
                pie_line_width = '';
            }
            if ($(this).attr('size')) {
                var pie_size = $(this).data('size');
            } else {
                pie_size = '';
            }
            if ($(this).attr('track-color')) {
                var pie_track_color = $(this).data('track-color')
            } else {
                pie_track_color = '';
            }
            if ($(this).attr('line-cap')) {
                var pie_line_cap = $(this).data('line-cap')
            } else {
                pie_line_cap = '';
            }
            if ($(this).attr('rotate-color')) {
                var pie_rotate_color = $(this).data('rotate-color')
            } else {
                pie_rotate_color = '';
            }
            if ($(this).attr('fontsize')) {
                var pie_font_size = $(this).data('fontsize')
            } else {
                pie_font_size = '';
            }

            var pie_animate = $(this).data('animate');

            /* If the object is completely visible in the window, fade it in */
            if (bottom_of_window > bottom_of_object) {
                $(this).easyPieChart({
                    scaleColor: '',
                    barColor: pie_bar_color,
                    lineWidth: pie_line_width,
                    size: pie_size,
                    trackColor: pie_track_color,
                    lineCap: pie_line_cap,
                    rotatecolor: pie_rotate_color,
                    prefix: pie_prefix,
                    font_size: pie_font_size,
                    suffix: pie_suffix,
                    trackWidth: pie_track_width,
                    easing: pie_animate,
                    animate: ({duration: $(this).data('duration'), enabled: true}),
                    onStep: function (from, to, percent) {
                        $(this.el).find(".percent ").text(pie_prefix + Math.round(percent) + pie_suffix);
                    }

                });
            }
        });

    }

    /*------------------------------------------------------------------

       Responsive Padding

    -------------------------------------------------------------------*/
    function fl_widget_maps() {
        var map_indeficator = $('#fl-contact-widget-map'),
            address = map_indeficator.data('address');
        if (map_indeficator.data('map-maker')) {
            var image = map_indeficator.data('map-maker');
        } else {
            image = '';
        }

        map_indeficator.gmap3({
            marker: {
                address: address,
                options: {
                    icon: image
                }
            },
            map: {
                options: {
                    styles: [{
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": [{"saturation": 36}, {"color": "#000000"}, {"lightness": 40}]
                    }, {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [{"visibility": "on"}, {"color": "#000000"}, {"lightness": 16}]
                    }, {
                        "featureType": "all",
                        "elementType": "labels.icon",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [{"color": "#000000"}, {"lightness": 20}]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]
                    }, {
                        "featureType": "administrative",
                        "elementType": "labels",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "administrative.country",
                        "elementType": "all",
                        "stylers": [{"visibility": "simplified"}]
                    }, {
                        "featureType": "administrative.country",
                        "elementType": "geometry",
                        "stylers": [{"visibility": "simplified"}]
                    }, {
                        "featureType": "administrative.country",
                        "elementType": "labels.text",
                        "stylers": [{"visibility": "simplified"}]
                    }, {
                        "featureType": "administrative.province",
                        "elementType": "all",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "administrative.locality",
                        "elementType": "all",
                        "stylers": [{"visibility": "simplified"}, {"saturation": "-100"}, {"lightness": "30"}]
                    }, {
                        "featureType": "administrative.neighborhood",
                        "elementType": "all",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "administrative.land_parcel",
                        "elementType": "all",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{"visibility": "simplified"}, {"gamma": "0.00"}, {"lightness": "74"}]
                    }, {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [{"color": "#000000"}, {"lightness": 20}]
                    }, {
                        "featureType": "landscape.man_made",
                        "elementType": "all",
                        "stylers": [{"lightness": "3"}]
                    }, {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [{"color": "#000000"}, {"lightness": 21}]
                    }, {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [{"visibility": "simplified"}]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [{"color": "#000000"}, {"lightness": 17}]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [{"color": "#000000"}, {"lightness": 29}, {"weight": 0.2}]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [{"color": "#000000"}, {"lightness": 18}]
                    }, {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [{"color": "#000000"}, {"lightness": 16}]
                    }, {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [{"color": "#000000"}, {"lightness": 19}]
                    }, {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{"color": "#000000"}, {"lightness": 17}]
                    }],
                    zoom: 14,
                    scrollwheel: false,
                    draggable: true,
                    mapTypeControl: false,
                    disableDefaultUI: true
                }
            }

        });

    }


    /*------------------------------------------------------------------

      Document Ready Function

    -------------------------------------------------------------------*/
    $(document).ready(function () {
        fl_pie_circle_progressbar();
        fl_widget_maps();
    });
    $(window).scroll(function () {
        fl_pie_circle_progressbar()
    });
    $(window).bind('resize', function () {
        setTimeout(function () {
            fl_pie_circle_progressbar();
        }, 100);
    });


    /*------------------------------------------------------------------

          Share

    -------------------------------------------------------------------*/



});



