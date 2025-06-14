jQuery.noConflict()(function($) {

    "use strict";

    var $doc = $(document);
    var self = this;
    var TweenMax = window.TweenMax;
    var fl_theme = window.fl_theme || {};
    /*------------------------------------------------------------------

       Nav Scroll

    -------------------------------------------------------------------*/
    function fl_nav_scroll(){
        var d, currentScrollTop = 0,
            navbar = $('.fl--header'),
            menu_autohide = $('.fl_auto_hide_menu');
        $(window).scroll(function () {
            var a = $(window).scrollTop(),
                w = $(window).innerWidth(),
                f = navbar.height(),
                c = menu_autohide.height();
            currentScrollTop = a;
            if($('.fl--header').hasClass('fl_auto_hide_menu')){
                if (w >= 767) {
                    if (currentScrollTop <= 0) {
                        navbar.removeClass("fl--nav-fixed");
                    } else {
                        if (d < currentScrollTop) {
                            navbar.addClass("fl--nav-fixed");
                        }
                    }
                    if (d < currentScrollTop && a > c + c * 3 + 200) {
                        menu_autohide.addClass("fl-scrollUp");
                    } else if (d > currentScrollTop && !(a <= c)) {
                        menu_autohide.removeClass("fl-scrollUp");
                    }
                }
            }

            d = currentScrollTop;
        });
    }
/*------------------------------------------------------------------

   SideBar Sticky

 -------------------------------------------------------------------*/
    function fl_sidebar_sticky(){
        var sidebar_sticky = $('.sidebar-sticky');
        if (sidebar_sticky.length) {
            sidebar_sticky.theiaStickySidebar({
                additionalMarginTop: 30,
                additionalMarginBottom: 30
            });
        }
    }
/*------------------------------------------------------------------

    WOW Animation

-------------------------------------------------------------------*/
    function fl_wow_animation(){
        var wow = new WOW(
            {
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 90,
                mobile: false,
                live: true
            }
        );
        wow.init();
    }
/*------------------------------------------------------------------

 Share modal

 -------------------------------------------------------------------*/
function fl_share_button(){

    $("#fl-share-buttons-contain").on('click', function() {

        if($(this).children('.fl-share-buttons-contain').hasClass('active')){
            $(this).children('.fl-share-buttons-contain').removeClass('active');

        }else {
            $(this).children('.fl-share-buttons-contain').addClass('active');
        }

    });

}

/*------------------------------------------------------------------

    Custom Video Player

-------------------------------------------------------------------*/
    function fl_custom_video_player() {

        const video_youtube = new Plyr('#video_youtube', {
            type: 'video'
        });

        const video_vimeo = new Plyr('#video_vimeo', {
            type: 'video'
        });

        const audio = new Plyr('#audio', {
            type: 'audio'
        });

        if($(".fl-post--video .plyr").hasClass("plyr--playing")){

            $('.fl-post--video').siblings('.fl-post-category-standard').hide();

        }else{

            $('.fl-post--video').siblings('.fl-post-category-standard').show();

        }
    }

/*------------------------------------------------------------------

    Custom Audio Player

-------------------------------------------------------------------*/
    function fl_custom_audio_player(){
        var audio_payer = $('.fl_post_player'),
            audio = audio_payer.find('audio'),
            duration = $('.fl-track-duration'),
            currentTime = $('.fl-track-current-time'),
            progressBar = $('.fl-track-progress span'),
            mouseDown = false,
            rewind, showCurrentTime;

        function secsToMins(time) {
            var int = Math.floor(time),
                mins = Math.floor(int / 60),
                secs = int % 60,
                newTime = mins + ':' + ('0' + secs).slice(-2);

            return newTime;
        }

        function getCurrentTime() {
            var currentTimeFormatted = secsToMins(audio[0].currentTime),
                currentTimePercentage = audio[0].currentTime / audio[0].duration * 100;

            currentTime.text(currentTimeFormatted);
            progressBar.css('width', currentTimePercentage + '%');

            if (audio_payer.hasClass('playing')) {
                showCurrentTime = requestAnimationFrame(getCurrentTime);
            } else {
                cancelAnimationFrame(showCurrentTime);
            }
        }

        var buttonicon = $('.fl--play-button i');

        audio.on('loadedmetadata', function () {
            var durationFormatted = secsToMins(audio[0].duration);
            duration.text(durationFormatted);
        }).on('ended', function () {
            audio_payer.removeClass('playing').addClass('paused');
            buttonicon.removeClass('fa-pause').addClass('fa-play');
            audio[0].currentTime = 0;
        });

        $('.fl--play-button').on('click', function () {
            var self = $(this);
            if (self.hasClass('play-pause') && audio_payer.hasClass('paused')) {
                audio_payer.removeClass('paused').addClass('playing');
                buttonicon.removeClass('fa-play').addClass('fa-pause');
                audio[0].play();
                getCurrentTime();
            } else if (self.hasClass('play-pause') && audio_payer.hasClass('playing')) {
                audio_payer.removeClass('playing').addClass('paused');
                buttonicon.removeClass('fa-pause').addClass('fa-play');
                audio[0].pause();

            }

        });
        audio_payer.on('mousedown mouseup', function () {
            mouseDown = !mouseDown;
        });
        progressBar.parent().on('click mousemove', function (e) {
            var self = $(this),
                totalWidth = self.width(),
                offsetX = e.offsetX,
                offsetPercentage = offsetX / totalWidth;

            if (mouseDown || e.type === 'click') {
                audio[0].currentTime = audio[0].duration * offsetPercentage;
                if (audio_payer.hasClass('paused')) {
                    progressBar.css('width', offsetPercentage * 100 + '%');
                }
            }
        });
}
/*------------------------------------------------------------------

      Jarallax Selector

-------------------------------------------------------------------*/
    function fl_jarallax_selector(){
        var jarallax = $('.fl-jarallax'),
            android_animate = jarallax.data('android-parallax'),
            ios_animate = jarallax.data('ios-parallax');
        jarallax .jarallax({
            noAndroid: android_animate,
            noIos: ios_animate
        });

        $('.jarallax').jarallax({
            speed: 0.7
        });
    }

/*------------------------------------------------------------------

      Blog Grid

-------------------------------------------------------------------*/




    function fl_blog_grid_selector() {
        var $blog_grid = $('.fl-grid--blog--post'),
            $blog_filter_btn = $('.fl-filter--btn'),
            $blog_btn_group = $('.fl-filter-blog--group');

        $blog_grid.isotope({
            itemSelector: '.fl-blog-grid--item',
            isAnimated: true,
            percentPosition: true,
            masonry: {
                columnWidth: '.fl-blog-grid--item',
                gutter: '.gutter-sizer'
            }
        });

        $blog_filter_btn.each(function () {
            $blog_filter_btn.on('click', function () {
                $blog_btn_group.find('.active').removeClass('active');
                $(this).addClass('active');
            });
        });
        // filter items on button click
        $blog_filter_btn.on('click', function () {
            var filterValue = $(this).attr('data-filter');
            $blog_grid.isotope({filter: filterValue});
        });

        $blog_grid.imagesLoaded().progress(function () {
            $blog_grid.isotope('layout');
        });

        if ($(window).width() > 868) {
            setTimeout(function () {
//Magic Line
                var menu_active = $('.fl-filter-style-one ul.filter-ul li');

                if (menu_active.length > 0) {
                    $('.fl-filter-style-one ul.filter-ul li.active').after('<span class="magic-line"></span>');
                    var menu_active_child = $('.fl-filter-style-one ul.filter-ul li.active span'),
                        menu_left = menu_active_child.position().left,
                        menu_child_left = parseInt(menu_active_child.css('padding-left')),
                        magic = $('.magic-line');
                    magic.width(menu_active_child.width()).css("left", Math.round(menu_child_left + menu_left)).data('magic-width', magic.width()).data('magic-left', magic.position().left);
                }
                menu_active.on({
                    'mouseenter': function () {
                        var elem = $(this).find('>span'),
                            new_width = elem.width(),
                            parent_left = elem.parent().position().left,
                            left = parseInt(elem.css('padding-left'));
                        if (!magic.data('magic-left')) {
                            magic.css('left', Math.round(parent_left + left));
                            magic.data('magic-left', 'auto');
                        }
                        magic.stop().animate({
                            left: Math.round(parent_left + left),
                            width: new_width
                        });
                    },
                    'mouseleave': function () {
                        var menu_active_item = $('.fl-filter-style-one ul.filter-ul li.active span');
                        magic.stop().animate({
                            left: menu_active_item.position().left,
                            width: menu_active_item.width()
                        });
                    }
                });
            }, 200);
        }
    }
/*------------------------------------------------------------------

     Image popups

-------------------------------------------------------------------*/
    function fl_image_popup(){
        $('.fl-gallery-image-popup').magnificPopup({
            delegate: 'a',
            type: 'image',
            removalDelay: 500,
            image: {
                markup: '<div class="mfp-figure">'+
                '<div class="mfp-img"></div>'+
                '<div class="mfp-bottom-bar">'+
                '<div class="mfp-title"></div>'+
                '</div>'+
                '</div>'+
                '<div class="mfp-close"></div>'+
                '<div class="mfp-counter"></div>'
            },
            callbacks: {
                beforeOpen: function() {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = 'fl-zoom-in-popup-animation';
                }
            },
            closeOnContentClick: true,
            midClick: true,
            gallery: {
                enabled: true,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%">' +
                '<svg viewBox="0 0 40 40">'+
                '<path d="M10,20 L30,20 M22,12 L30,20 L22,28"></path>'+
                '</svg>'+
                '</button>', // markup of an arrow button

                tPrev: 'Previous', // title for left button
                tNext: 'Next', // title for right button

                tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
            }
        });
    }
/*------------------------------------------------------------------

       Popup Gallery

-------------------------------------------------------------------*/
    fl_theme.initGalleryPopup = function(){
        $('.fl-magic-popup').each(function() {
            var popup_gallery_custom_class = $(this).attr('data-custom-class'),
                gallery_enable = true,
                popup_type = 'image';
            if($(this).hasClass('fl-single-popup')){
                gallery_enable = false;
                popup_gallery_custom_class = 'fl-single-popup';
            } else if ($(this).hasClass('fl-video-popup')) {
                popup_type = 'iframe';
                gallery_enable = false;
                popup_gallery_custom_class = 'fl-video-popup';
            }

            $("." + popup_gallery_custom_class).magnificPopup({
                delegate: 'a',
                type: popup_type,
                gallery: {
                    enabled: gallery_enable,
                    tPrev: 'Previous',
                    tNext: 'Next',
                    tCounter: '<span class="mfp-counter">%curr% / %total%</span>' // markup of counter
                },
                image: {
                    markup:
                        '<div class="mfp-figure">'+
                        '<div class="mfp-img"></div>'+
                        '</div>'+
                        '<div class="mfp-close"></div>'+
                        '<div class="mfp-bottom-bar">'+
                        '<div class="mfp-title"></div>'+
                        '<div class="mfp-counter"></div>' +
                        '</div>'
                },
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">'+
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                        '</div>'+
                        '<div class="mfp-close"></div>'
                },
                mainClass: 'mfp-zoom-in',
                removalDelay: 300,
                callbacks: {
                    open: function () {
                        $.magnificPopup.instance.next = function () {
                            var self = this;
                            self.wrap.removeClass('mfp-image-loaded');
                            setTimeout(function () {
                                $.magnificPopup.proto.next.call(self);
                            }, 120);
                        };
                        $.magnificPopup.instance.prev = function () {
                            var self = this;
                            self.wrap.removeClass('mfp-image-loaded');
                            setTimeout(function () {
                                $.magnificPopup.proto.prev.call(self);
                            }, 120);
                        }
                    },
                    imageLoadComplete: function () {
                        var self = this;
                        setTimeout(function () {
                            self.wrap.addClass('mfp-image-loaded');
                        }, 16);
                    }
                }
            });

        });
    };
/*------------------------------------------------------------------

  Widget Category

-------------------------------------------------------------------*/
    function fl_widget_category(){
        $('.widget.widget_categories .children').parent('.cat-item').addClass('category-hast-children');
    }
/*------------------------------------------------------------------

  Search Form Navigatop

-------------------------------------------------------------------*/
    function fl_fullscreenSearchOpenClose() {
        var $SearchForm = $('.fl-full-width-search-form');
        var OpenSearchForm = void 0;
        var search_form = $('form.search_global');
        var search_form_text = $('.fl-form-bottom-text');
        var $searchformicon =  $('.fl--search-icon-menu');



        self.toggleFullscreenSearchForm = function () {
            self[OpenSearchForm ? 'closeFullscreenSearchForm' : 'openFullscreenSearchForm']();
        };




        self.openFullscreenSearchForm = function () {
            if (OpenSearchForm || !$SearchForm.length) {
                return;
            }
            OpenSearchForm = 1;
            //Default
            // Search form Wrapper
            TweenMax.set($SearchForm, {
                opacity: 0,
                y: '-100%',
                force3D: true
            });
            // Search form search_form
            TweenMax.set(search_form, {
                opacity: 0,
                y: '-100%',
                force3D: true
            });
            // Search form text search_form_text
            TweenMax.set(search_form_text, {
                opacity: 0,
                y: '100%',
                force3D: true
            });


            $searchformicon.addClass('opened');
            $searchformicon.removeClass('closed');

            // set top position and animate
            TweenMax.to($SearchForm, 0.4, {
                opacity: 1,
                y: '0%',
                display: 'block'
            });
            // Search form search_form
            TweenMax.to(search_form, 0.5, {
                opacity: 1,
                y: '0%',
                delay: 0.4
            });
            TweenMax.to(search_form_text, 0.5, {
                opacity: 1,
                y: '0%',
                delay: 0.4
            });

            $SearchForm.addClass('open');

        };

        self.closeFullscreenSearchForm = function () {
            if (!OpenSearchForm || !$SearchForm.length) {
                return;
            }
            OpenSearchForm = 0;
            // disactive all togglers
            $searchformicon.removeClass('opened');
            $searchformicon.addClass('closed');


            // Search form search_form
            TweenMax.to(search_form, 0.4, {
                opacity: 0,
                y: '-100%'
            });
            TweenMax.to(search_form_text, 0.4, {
                opacity: 0,
                y: '100%'
            });
            // set top position and animate
            TweenMax.to($SearchForm, 0.4, {
                force3D: true,
                y: '-100%',
                display: 'none',
                delay: 0.4
            });


            // open search form wrapper block
            $SearchForm.removeClass('open');

        };

        $doc.on('click', '.fl--search-icon-menu', function (e) {
            self.toggleFullscreenSearchForm();
            e.preventDefault();
        });
    }

/*------------------------------------------------------------------

  Mobile Navigation

-------------------------------------------------------------------*/
    function fl_mobile_nav_sub_menu_animation() {
        var $mobileMenu = $('.fl--mobile-menu');

            $mobileMenu.find('li').each(function(){
                var $this = $(this);
                if($this.find('ul').length > 0) {
                    $this.find('> a').append('<span class="fl-menu-flipper-icon fl--open-child-menu"><span class="fl-front-content"><i class="fl-custom-icon-more-options"></i></span><span class="fl-back-content"><i class="fl-custom-icon-cross"></i></span></span>');
                }
            });

        // open -> close sub-menu
        function toggleSub_menu($sub_menu_find) {
            var $navigation_Items = $sub_menu_find.find('>.sub-menu >li >a');
            TweenMax.set($navigation_Items, {
                opacity: 0,
                x: '-20%',
                force3D: true
            }, 0.04);
            if ($sub_menu_find.hasClass('opened')) {
                $sub_menu_find.removeClass('opened');
                $sub_menu_find.find('li').removeClass('opened');
                $sub_menu_find.find('ul').slideUp(200);
                TweenMax.staggerTo($navigation_Items, 0.3, {
                    opacity: 0,
                    x: '-20%',
                    force3D: true
                }, 0.04);
            } else {
                TweenMax.staggerTo($navigation_Items, 0.3, {
                    x: '0%',
                    opacity: 1,
                    delay: 0.2
                }, 0.04);

                $sub_menu_find.addClass('opened');
                $sub_menu_find.children('ul').slideDown();
                // Sub menu Children
                $sub_menu_find.siblings('li').children('ul').slideUp(200);
                $sub_menu_find.siblings('li').removeClass('opened');
                $sub_menu_find.siblings('li').find('li').removeClass('opened');
                $sub_menu_find.siblings('li').find('ul').slideUp(200);
            }
        }

        $mobileMenu.on('click', '.menu-item-has-children > a', function (e) {
            toggleSub_menu($(this).parent());
            e.preventDefault();
        });
    }
/*------------------------------------------------------------------

 Open Close Mobile Navigation

-------------------------------------------------------------------*/
    function fl_mobile_navigationOpenClose() {

        var $navbar_wrapper = $('.fl-mobile-menu-wrapper'),
            $navbar_menu_sidebar = $('.fl--mobile-menu-navigation-wrapper'),
            $hamburgerbars =  $('.fl--mobile-menu-icon'),
            $social_profiles = $('.fl-mobile-menu-wrapper ul.fl-sidebar-social-profiles li a'),
            OpenNavBar = void 0;

        self.fullscreenNavbarIsOpened = function () {
            return OpenNavBar;
        };

        self.toogleOpenCloseMobileMenu = function () {
            self[OpenNavBar ? 'closeFullscreenNavbar' : 'openFullscreenNavbar']();
        };
        self.openFullscreenNavbar = function () {
            if (OpenNavBar || !$navbar_wrapper.length) {
                return;
            }
            OpenNavBar = 1;



            var $navbarMenuItems = $navbar_wrapper.find('.fl--mobile-menu >li >a,.fl--mobile-menu li.opened > ul >li >a');
            if (!$navbar_wrapper.find('.fl--mobile-menu >li.opened').length) {
                $navbarMenuItems = $navbar_wrapper.find('.fl--mobile-menu >li >a');
            }

            $hamburgerbars.addClass('opened');
            $hamburgerbars.removeClass('closed');

            // NavBarMenu Items Animation
            TweenMax.set($navbarMenuItems, {
                opacity: 0,
                x: '20%',
                force3D: true
            });

            TweenMax.staggerTo($navbarMenuItems, 0.2, {
                opacity: 1,
                x: '0%',
                delay: 0.4
            }, 0.04);

            // Social Profiles Animation
            TweenMax.set($social_profiles, {
                opacity: 0,
                y: '100%',
                force3D: true
            });

            TweenMax.staggerTo($social_profiles, 0.2, {
                opacity: 1,
                y: '0%',
                delay: 0.6
            }, 0.04);

            // NavBarMenu wrapper Animation
            TweenMax.set($navbar_wrapper, {
                display: 'none',
                force3D: true
            });

            TweenMax.to($navbar_wrapper, 0.4, {
                opacity: 1,
                display: 'block'
            }, 0.04);

            // NavBarMenu menu sidebar Animation
            TweenMax.set($navbar_menu_sidebar, {
                opacity: 0,
                x: '100%',
                force3D: true
            });

            TweenMax.to($navbar_menu_sidebar, 0.4, {
                opacity: 1,
                x: '0%',
                display: 'block'
            }, 0.04);

            $navbar_wrapper.addClass('open');

        };

        self.closeFullscreenNavbar = function (dontTouchBody) {
            if (!OpenNavBar || !$navbar_wrapper.length) {
                return;
            }
            OpenNavBar = 0;


            // disactive all togglers
            $hamburgerbars.removeClass('opened');
            $hamburgerbars.addClass('closed');


            var $navbarMenuItems = $navbar_wrapper.find('.fl--mobile-menu >li >a');


            // set top position and animate
            TweenMax.to($navbar_wrapper, 0.4, {
                force3D: true,
                opacity: 0,
                display: 'none',
                delay: 0.1
            });

            TweenMax.to($navbar_menu_sidebar, 0.2, {
                opacity: 0,
                x: '100%',
                force3D: true,
                delay: 0.3
            }, 0.1);

            TweenMax.to($navbarMenuItems, 0.2, {
                opacity: 0,
                x: '20%',
                delay: 0.2
            }, 0.1);



            // open navbar block
            $navbar_wrapper.removeClass('open');

        };

        $doc.on('click', '.fl--mobile-menu-icon', function (e) {
            self.toogleOpenCloseMobileMenu();
            e.preventDefault();
        });
    }

/*------------------------------------------------------------------

 Open Close Header Sidebar

-------------------------------------------------------------------*/
function fl_header_sidebar_OpenClose() {

        var $sidebar_wrapper            = $('.fl-header-sidebar-container'),
            $sidebar                    = $('.fl-header-sidebar'),
            $sidebar_widget             = $sidebar.find('.sidebar .sidebar_container .widget'),
            $sidebar_open_close_btn     = $('.fl--sidebar-header-button'),
            OpenSideBar = void 0;

        self.SideBarIsOpened = function () {
            return OpenSideBar;
        };

        self.OpenCloseSideBar = function () {
            self[OpenSideBar ? 'closeSideBarfn' : 'openSideBarfn']();
        };
        self.openSideBarfn = function () {
            if (OpenSideBar || !$sidebar_wrapper.length) {
                return;
            }
            OpenSideBar = 1;



            $sidebar_open_close_btn.addClass('opened');
            $sidebar_open_close_btn.removeClass('closed');

            // Wrapper
            TweenMax.set($sidebar_wrapper, {
                opacity: 0,
                display: 'none'
            });

            TweenMax.staggerTo($sidebar_wrapper, 0.2, {
                opacity: 1,
                display: 'block'
            }, 0.04);

            // Sidebar
            TweenMax.set($sidebar, {
                opacity: 0,
                x: '100%',
                force3D: true
            });

            TweenMax.to($sidebar, 0.4, {
                opacity: 1,
                x: '0%',
                display: 'block'
            }, 0.04);

            // Sidebar widget
            TweenMax.set($sidebar_widget, {
                opacity: 0,
                x: '25%',
                force3D: true
            });

            TweenMax.staggerTo($sidebar_widget, 0.2, {
                opacity: 1,
                x: '0%',
                delay: 0.3
            }, 0.02);

            $sidebar_wrapper.addClass('open');

        };

        self.closeSideBarfn = function () {
            if (!OpenSideBar || !$sidebar_wrapper.length) {
                return;
            }
            OpenSideBar = 0;


            // disactive all togglers
            $sidebar_open_close_btn.removeClass('opened');
            $sidebar_open_close_btn.addClass('closed');


            TweenMax.to($sidebar_wrapper, 0.2, {
                opacity: 0,
                display: 'none',
                delay: 0.5
            }, 0.1);

            TweenMax.to($sidebar_widget, 0.2, {
                opacity: 0,
                x: '25%',
                force3D: true
            }, 0.1);

            TweenMax.to($sidebar, 0.2, {
                opacity: 0,
                x: '100%',
                force3D: true,
                delay: 0.1
            }, 0.1);


            // open navbar block
            $sidebar_wrapper.removeClass('open');

        };

        $doc.on('click', '.fl--sidebar-header-button', function (e) {
            self.OpenCloseSideBar();
            e.preventDefault();
        });
    }

//Popup
function fl_magic_popup(){
        $('.fl-magic-popup').each(function() {
            var popup_gallery_custom_class = $(this).attr('data-custom-class'),
                gallery_enable = true,
                popup_type = 'image';
            if($(this).hasClass('fl-single-popup')){
                gallery_enable = false;
                popup_gallery_custom_class = 'fl-single-popup';
            } else if ($(this).hasClass('fl-video-popup')) {
                popup_type = 'iframe';
                gallery_enable = false;
                popup_gallery_custom_class = 'fl-video-popup';
            }

            $("." + popup_gallery_custom_class).magnificPopup({
                delegate: 'a',
                type: popup_type,
                gallery: {
                    enabled: gallery_enable,
                    tPrev: 'Previous',
                    tNext: 'Next',
                    tCounter: '<span class="mfp-counter">%curr% / %total%</span>' // markup of counter
                },
                image: {
                    markup:
                        '<div class="mfp-figure">'+
                        '<div class="mfp-img"></div>'+
                        '</div>'+
                        '<div class="mfp-close"></div>'+
                        '<div class="mfp-bottom-bar">'+
                        '<div class="mfp-title"></div>'+
                        '<div class="mfp-counter"></div>' +
                        '</div>'
                },
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">'+
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                        '</div>'+
                        '<div class="mfp-close"></div>'
                },
                mainClass: 'mfp-zoom-in',
                removalDelay: 300,
                callbacks: {
                    open: function () {

                        $.magnificPopup.instance.next = function () {
                            var self = this;
                            self.wrap.removeClass('mfp-image-loaded');
                            setTimeout(function () {
                                $.magnificPopup.proto.next.call(self);
                            }, 120);
                        };
                        $.magnificPopup.instance.prev = function () {
                            var self = this;
                            self.wrap.removeClass('mfp-image-loaded');
                            setTimeout(function () {
                                $.magnificPopup.proto.prev.call(self);
                            }, 120);
                        }
                    },
                    imageLoadComplete: function () {
                        var self = this;
                        setTimeout(function () {
                            self.wrap.addClass('mfp-image-loaded');
                        }, 16);
                    }
                }
            });

        });
    }
/*------------------------------------------------------------------

 Style Selector

-------------------------------------------------------------------*/
function fl_header_style_Selector() {
        var style_selector = $('.style-selector'),style_selector_btn = $('.style-selector .color_selector');
      // Open Close
    style_selector.on('click','.icon-btn-selector',function() {
            if (style_selector.hasClass("opened")) {
                style_selector.removeClass('opened');
                style_selector.addClass('closed');
            } else {
                style_selector.removeClass('closed');
                style_selector.addClass('opened');
            }
    });
    // Selector
    style_selector_btn.on('click',function(){
        var style_setting = $(this).data('grid-setting');
        $.cookie('style_setting', style_setting, { path: '/' });
        if (!$(this).hasClass("active")) {
            style_selector_btn.removeClass('active');
            $(this).addClass('active');
            location.reload();
        }
    });
}

    /*------------------------------------------------------------------

     Post Format Gallery

     -------------------------------------------------------------------*/
    function fl_post_format_gallery() {
        $('.fl-post--gallery-slider').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow:1,
            slidesToScroll: 1,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }


    // Function Selector Document Ready
    $(document).ready(function(){
        // Mobile Navigation Sub menu Animation
        fl_mobile_nav_sub_menu_animation();
        // Mobile Navigation Open -> Close
        fl_mobile_navigationOpenClose();
        // Category widget
        fl_widget_category();
        //Jarallax Selector
        fl_jarallax_selector();
        //Magic Popup
        fl_magic_popup();
        // Image Popup
        fl_image_popup();
        // Blog Grid Selector
        fl_blog_grid_selector();
        // Custom audio player
        fl_custom_audio_player();

        // Custom Video Player

        if(($("#video_youtube").length > 0)){
            fl_custom_video_player();
        }
        if(($("#video_vimeo").length > 0)){
            fl_custom_video_player();
        }
        if(($("#audio").length > 0)){
            fl_custom_video_player();
        }

        // Wow Navigation
        fl_wow_animation();
        // Sticky Sidebar
        fl_sidebar_sticky();
        // Navigation Scroll
        fl_nav_scroll();
        // Header sidebar
        fl_header_sidebar_OpenClose();
        //Search form
        fl_fullscreenSearchOpenClose();
        //Style Selector
        fl_header_style_Selector();
        //Post Format Gallery
        fl_post_format_gallery();
        //Post Share
        fl_share_button();
        /*------------------------------------------------------------------

         Resize iframe video

        -------------------------------------------------------------------*/
            function responseveIframe() {
                var resizeitem = $('iframe');
                resizeitem.height(
                    resizeitem.attr("height") / resizeitem.attr("width") * resizeitem.width()
                );
            }

            responseveIframe();

            $(window).resize(function () {
                responseveIframe();
            });
    });


    $('.jp-list').click(function (e) {

        if($('.jp-playlist').hasClass('fl-open')){
            $('.jp-playlist').removeClass('fl-open');
        }else{
            $('.jp-playlist').addClass('fl-open');
        }

    })



});
