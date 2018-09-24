$(document).ready(function() {
  // MagnificPopup
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function(openerElement) {
				// openerElement is the element on which popup was initialized, in this case its <a> tag
				// you don't need to add "opener" option if this code matches your needs, it's defailt one.
				return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	};

	var magnifVideo = function() {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps, .popup-sharepoint').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        iframe: {
            patterns: {
              youtube: {
                index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
                id: 'v=', // String that splits URL in a two parts, second part should be %id%
                // Or null - full URL will be returned
                // Or a function that should return %id%, for example:
                // id: function(url) { return 'parsed id'; }
                src: 'http://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
              },
              sharepoint: {
                index: 'boozallen.sharepoint.com/',
                id: 'videos/',
                src:'https://boozallen.sharepoint.com/sites/mi/Shared%20Documents/videos/%id%'
              }
              // gmaps: {
              //   index: '//maps.google.',
              //   src: '%id%&output=embed'
              // }

              // you may add here more sources

            },

            srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
          },

        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
		$('.popup-youtube, .popup-vimeo, .popup-gmaps, .popup-sharepoint').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        iframe: {
            patterns: {
              youtube: {
                index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
                id: 'v=', // String that splits URL in a two parts, second part should be %id%
                // Or null - full URL will be returned
                // Or a function that should return %id%, for example:
                // id: function(url) { return 'parsed id'; }
                src: 'http://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
              },
              sharepoint: {
                index: 'boozallen.sharepoint.com/',
                id: 'videos/',
                src:'https://boozallen.sharepoint.com/sites/mi/Shared%20Documents/videos/%id%'
              }
              // gmaps: {
              //   index: '//maps.google.',
              //   src: '%id%&output=embed'
              // }

              // you may add here more sources

            },

            srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
          },

        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
	};




	// Call the functions
	magnifPopup();
	magnifVideo();

});
