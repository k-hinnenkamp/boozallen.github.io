;(function() {
  'use strict';
  // iPad and iPod detection
  var isiPad = function() {
    return (navigator.platform.indexOf("iPad") != -1);
  };

  var isiPhone = function() {
    return (
      (navigator.platform.indexOf("iPhone") != -1) ||
      (navigator.platform.indexOf("iPod") != -1)
    );
  };

  // Parallax
  var parallax = function() {
    $(window).stellar();
  };


  // Burger Menu
  var burgerMenu = function() {

    $('body').on('click', '.js-mi-nav-toggle', function(event) {
      event.preventDefault();
      $(this).toggleClass('active', $('#navbar').is(':visible'));
    });

  };


  var goToTop = function() {
    $('.js-gotop').on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $('html').offset().top
      }, 500);

      return false;
    });
  };

  // Page Nav
  var clickMenu = function() {

    $('#navbar a:not([class="external"])').click(function(event) {
      var section = $(this).data('nav-section'),
        navbar = $('#navbar');

      if ($('[data-section="' + section + '"]').length) {
        $('html, body').animate({
          scrollTop: $('[data-section="' + section + '"]').offset().top
        }, 500);
      }

      if (navbar.is(':visible')) {
        navbar.removeClass('in');
        navbar.attr('aria-expanded', 'false');
        $('.js-mi-nav-toggle').removeClass('active');
      }

      event.preventDefault();
      return false;
    });


  };

  // Reflect scrolling in navigation
  var navActive = function(section) {

    var $el = $('#navbar > ul');
    $el.find('li').removeClass('active');
    $el.each(function() {
      $(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
    });

  };

  var navigationSection = function() {

    var $section = $('section[data-section]');

    $section.waypoint(function(direction) {

      if (direction === 'down') {
        navActive($(this.element).data('section'));
      }
    }, {
      offset: '150px'
    });

    $section.waypoint(function(direction) {
      if (direction === 'up') {
        navActive($(this.element).data('section'));
      }
    }, {
      offset: function() {
        return -$(this.element).height() + 155;
      }
    });

  };


  // Window Scroll
  var windowScroll = function() {
    var lastScrollTop = 0;

    $(window).scroll(function(event) {

      var header = $('#mi-header'),
        scrlTop = $(this).scrollTop();

      if (scrlTop > 500 && scrlTop <= 2000) {
        header.addClass('navbar-fixed-top mi-animated slideInDown');
      } else if (scrlTop <= 500) {
        if (header.hasClass('navbar-fixed-top')) {
          header.addClass('navbar-fixed-top mi-animated slideOutUp');
          setTimeout(function() {
            header.removeClass('navbar-fixed-top mi-animated slideInDown slideOutUp');
          }, 100);
        }
      }

    });
  };


  // Animations

  var thingAnimate = function(mything) {
    var myT = mything;
    if (!!myT.length) {
      myT.waypoint(function(direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(function() {
            myT.find('.to-animate').each(function(k) {
              var el = $(this);
              setTimeout(function() {
                el.addClass('fadeInUp animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 200);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '80%'
      });
    }
  };

  thingAnimate($('#mi-home'));
  thingAnimate($('#mi-intro'));
  thingAnimate($('#mi-info'));
  thingAnimate($('#mi-videos'));
  thingAnimate($('#mi-examples'));
	thingAnimate($('#mi-sales'));
  thingAnimate($('#mi-contact'));
	thingAnimate($('#mi-discuss'));


  // Document on load
  $(function() {
    parallax();
    burgerMenu();
    clickMenu();
    windowScroll();
    navigationSection();
    goToTop();
  });


}());
