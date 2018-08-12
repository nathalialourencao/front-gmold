(function ($) {
	'use strict';

	var induscity = induscity || {};

	induscity.init = function () {
		induscity.$body = $(document.body),
			induscity.$window = $(window),
			induscity.$header = $('#masthead');

		this.rowParallax();
		this.serviceHover();
		this.partnerCarousel();
		this.postCarousel();
		this.testimonialCarousel();
		this.portfolioCarousel();
		this.teamCarousel();
		this.historyCarousel();
		this.departmentCarousel();
		this.videoLightBox();
		this.gmaps();

		/*Couterup*/
		$('.mf-counter .counter-value').counterUp();
	};

	/*
	 * Vc row parallax
	 */
	induscity.rowParallax = function () {
		var $parallaxsRow = $('.vc_row.parallax');
		for (var i = 0; i < $parallaxsRow.length; i++) {
			$($parallaxsRow[i]).parallax('50%', 0.6);
		}
	};

	/*
	 * Service Hover
	 */
	induscity.serviceHover = function () {
		var $services = $('.mf-services-3.style-1'),
			$item = $services.find('.vc_service-wrapper');

		$item.hover(function () {

			$(this).addClass('active');
			$(this).closest('.services-list').addClass('on-hover');

		}, function () {
			$(this).removeClass('active');
			$(this).closest('.services-list').removeClass('on-hover');
		});
	};

	/**
	 * Init post carousel
	 */
	induscity.postCarousel = function () {
		if (induscityShortCode.length === 0 || typeof induscityShortCode.post === 'undefined') {
			return;
		}

		$.each(induscityShortCode.post, function (id, postData) {
			if (postData.is_carousel == 1) {
				$(document.getElementById(id)).owlCarousel({
					items          : 3,
					loop           : postData.autoplay,
					margin         : 30,
					nav            : postData.nav,
					navText        : ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
					autoplay       : postData.autoplay,
					autoplayTimeout: postData.autoplay_timeout,
					autoplaySpeed  : postData.autoplay_speed,
					dots           : postData.dot,
					navSpeed       : 800,
					dotsSpeed      : 800,
					dotsEach       : 1,
					responsive     : {
						0   : {
							items: 1,
							dots : true,
							nav  : false
						},
						992 : {
							items: 3
						},
						1025: {
							dots: postData.dot
						}
					}
				});
			}
		});
	};

	/**
	 * Init portfolio carousel
	 */
	induscity.portfolioCarousel = function () {
		if (induscityShortCode.length === 0 || typeof induscityShortCode.portfolio === 'undefined') {
			return;
		}

		$.each(induscityShortCode.portfolio, function (id, portfolioData) {
			var $portfolio = $(document.getElementById(id)),
				$filter = $portfolio.closest('.mf-portfolio-carousel').find('ul.nav-filter');

			$portfolio.not('.slick-initialized').slick({
				slidesToShow : 4,
				infinite     : portfolioData.autoplay,
				arrows       : portfolioData.nav,
				autoplay     : portfolioData.autoplay,
				autoplaySpeed: portfolioData.autoplay_speed,
				dots         : portfolioData.dot,
				responsive   : [
					{
						breakpoint: 1200,
						settings  : {
							slidesToShow: 3,
							arrows      : false,
							dots        : true
						}
					},
					{
						breakpoint: 768,
						settings  : {
							slidesToShow: 2,
							arrows      : false,
							dots        : true
						}
					},
					{
						breakpoint: 480,
						settings  : {
							slidesToShow: 1,
							arrows      : false,
							dots        : true
						}
					}
				]
			});

			$filter.on('click', 'a', function (e) {
				e.preventDefault();
				$filter.find('a').removeClass('active');
				$(this).addClass('active');
				var value = $(this).data('filter');
				$portfolio.slick('slickUnfilter');


				if (value != '*') {
					$portfolio.slick('slickFilter', value);
				}
			});
		});
	};

	/**
	 * Init history carousel
	 */
	induscity.historyCarousel = function () {
		if (induscityShortCode.length === 0 || typeof induscityShortCode.history === 'undefined') {
			return;
		}
		$.each(induscityShortCode.history, function (id, historyData) {
			$(document.getElementById(id)).owlCarousel({
				items          : 2,
				margin         : 30,
				loop           : historyData.autoplay,
				nav            : historyData.nav,
				navText        : ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
				autoplay       : historyData.autoplay,
				autoplayTimeout: historyData.autoplay_timeout,
				autoplaySpeed  : historyData.autoplay_speed,
				dots           : historyData.dot,
				navSpeed       : 800,
				dotsSpeed      : 800,
				dotsEach       : 1,
				responsive     : {
					0   : {
						items: 1,
						dots : true,
						nav  : false
					},
					992 : {
						items: 2
					},
					1025: {
						nav: historyData.nav
					}
				}
			});
		});
	};

	/**
	 * Init testimonial carousel
	 */
	induscity.testimonialCarousel = function () {
		if (induscityShortCode.length === 0 || typeof induscityShortCode.testimonial === 'undefined') {
			return;
		}
		$.each(induscityShortCode.testimonial, function (id, testimonialData) {
			var leftArrow, rightArrow;
			if (testimonialData.is_carousel == 1) {
				if (testimonialData.style == 3) {
					leftArrow = '<i class="fa fa-angle-left"></i>';
					rightArrow = '<i class="fa fa-angle-right"></i>';
				} else {
					leftArrow = '<i class="fa fa-chevron-left"></i>';
					rightArrow = '<i class="fa fa-chevron-right"></i>';
				}
				$(document.getElementById(id)).find('.testimonial-list').owlCarousel({
					items          : testimonialData.columns,
					loop           : testimonialData.autoplay,
					margin         : 30,
					nav            : testimonialData.nav,
					navText        : [leftArrow, rightArrow],
					autoplay       : testimonialData.autoplay,
					autoplayTimeout: testimonialData.autoplay_timeout,
					autoplaySpeed  : testimonialData.autoplay_speed,
					dots           : testimonialData.dot,
					navSpeed       : 800,
					dotsSpeed      : 800,
					dotsEach       : 1,
					responsive     : {
						0   : {
							items: 1,
							dots : true,
							nav  : false
						},
						992 : {
							items: testimonialData.columns
						},
						1025: {
							nav: testimonialData.nav
						}
					}
				});
			}
		});
	};

	induscity.partnerCarousel = function () {
		$('.mf-partner.carousel-type').each(function () {
			var $this = $(this),
				columns = $this.data('columns');

			$this.find('.list-item').owlCarousel({
				items          : columns,
				loop           : true,
				nav            : false,
				autoplay       : false,
				autoplayTimeout: 0,
				autoplaySpeed  : 0,
				dots           : false,
				navSpeed       : 800,
				dotsSpeed      : 800,
				responsive     : {
					0   : {
						items: 1
					},
					600 : {
						items : 3,
						margin: 15
					},
					992: {
						items : columns,
						margin: 15
					}
				}
			});
		});
	};

	/**
	 * Init team carousel
	 */
	induscity.teamCarousel = function () {
		if (induscityShortCode.length === 0 || typeof induscityShortCode.team === 'undefined') {
			return;
		}
		$.each(induscityShortCode.team, function (id, teamData) {
			if (teamData.is_carousel == 1) {
				$(document.getElementById(id)).owlCarousel({
					items          : teamData.columns,
					margin         : 30,
					loop           : true,
					nav            : teamData.nav,
					navText        : ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
					autoplay       : teamData.autoplay,
					autoplayTimeout: teamData.autoplay_timeout,
					autoplaySpeed  : teamData.autoplay_speed,
					dots           : teamData.dot,
					navSpeed       : 800,
					dotsSpeed      : 1000,
					responsive     : {
						0   : {
							items: 1,
							dots : true,
							nav  : false
						},
						600 : {
							items: 2,
							dots : true,
							nav  : false
						},
						992 : {
							items: teamData.columns
						},
						1025: {
							dots: teamData.dot
						}
					}
				});
			}
		});
	};

	/**
	 * Init team carousel
	 */
	induscity.departmentCarousel = function () {
		if (induscityShortCode.length === 0 || typeof induscityShortCode.department === 'undefined') {
			return;
		}
		$.each(induscityShortCode.department, function (id, departmentData) {
			$(document.getElementById(id)).find('.department-list').owlCarousel({
				items          : 1,
				loop           : true,
				nav            : false,
				autoplay       : departmentData.autoplay,
				autoplayTimeout: departmentData.autoplay_timeout,
				autoplaySpeed  : departmentData.autoplay_speed,
				dots           : true,
				navSpeed       : 800,
				dotsSpeed      : 1000
			});
		});
	};

	/*
	 * Toggle video banner play button
	 */
	induscity.videoLightBox = function () {
		var $images = $('.mf-video-banner');

		if (!$images.length) {
			return;
		}

		var $links = $images.find('a.photoswipe'),
			items = [];

		$links.each(function () {
			var $a = $(this);

			items.push({
				html: $a.data('href')
			});

		});

		$images.on('click', 'a.photoswipe', function (e) {
			e.preventDefault();

			var index = $links.index($(this)),
				options = {
					index              : index,
					bgOpacity          : 0.85,
					showHideOpacity    : true,
					mainClass          : 'pswp--minimal-dark',
					barsSize           : {top: 0, bottom: 0},
					captionEl          : false,
					fullscreenEl       : false,
					shareEl            : false,
					tapToClose         : true,
					tapToToggleControls: false
				};

			var lightBox = new PhotoSwipe(document.getElementById('pswp'), window.PhotoSwipeUI_Default, items, options);
			lightBox.init();

			lightBox.listen('close', function () {
				$('.mf-video-wrapper').find('iframe').each(function () {
					$(this).attr('src', $(this).attr('src'));
				});
			});
		});
	};

	/**
	 * Init Google maps
	 */
	induscity.gmaps = function () {

		if (induscityShortCode.length === 0 || typeof induscityShortCode.map === 'undefined') {
			return;
		}

		var mapOptions = {
				scrollwheel       : false,
				draggable         : true,
				zoom              : 10,
				mapTypeId         : google.maps.MapTypeId.ROADMAP,
				panControl        : false,
				zoomControl       : true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.SMALL
				},
				scaleControl      : false,
				streetViewControl : false

			},
			customMap;

		var bounds = new google.maps.LatLngBounds();
		var infoWindow = new google.maps.InfoWindow();


		$.each(induscityShortCode.map, function (id, mapData) {
			var map_color = mapData.map_color;

			var styles =
				[
					{
						'featureType': 'administrative',
						'elementType': 'labels.text.fill',
						'stylers'    : [
							{
								'color': '#444444'
							}
						]
					},
					{
						'featureType': 'landscape',
						'elementType': 'all',
						'stylers'    : [
							{
								'color': '#f2f2f2'
							}
						]
					},
					{
						'featureType': 'poi',
						'elementType': 'all',
						'stylers'    : [
							{
								'visibility': 'off'
							}
						]
					},
					{
						'featureType': 'road',
						'elementType': 'all',
						'stylers'    : [
							{
								'saturation': -100
							},
							{
								'lightness': 45
							}
						]
					},
					{
						'featureType': 'road.highway',
						'elementType': 'all',
						'stylers'    : [
							{
								'visibility': 'simplified'
							}
						]
					},
					{
						'featureType': 'road.arterial',
						'elementType': 'labels.icon',
						'stylers'    : [
							{
								'visibility': 'off'
							}
						]
					},
					{
						'featureType': 'transit',
						'elementType': 'all',
						'stylers'    : [
							{
								'visibility': 'off'
							}
						]
					},
					{
						'featureType': 'water',
						'elementType': 'all',
						'stylers'    : [
							{
								'color': map_color
							},
							{
								'visibility': 'on'
							}
						]
					}
				];

			customMap = new google.maps.StyledMapType(styles,
				{name: 'Styled Map'});

			if (mapData.number > 1) {
				mutiMaps(infoWindow, bounds, mapOptions, mapData, id, styles, customMap);
			} else {
				singleMap(mapOptions, mapData, id, styles, customMap);
			}

		});
	};

	function singleMap(mapOptions, mapData, id, styles, customMap) {
		var map,
			marker,
			location = new google.maps.LatLng(mapData.lat, mapData.lng);

		// Update map options
		mapOptions.zoom = parseInt(mapData.zoom, 10);
		mapOptions.center = location;
		mapOptions.mapTypeControlOptions = {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP]
		};

		// Init map
		map = new google.maps.Map(document.getElementById(id), mapOptions);

		// Create marker options
		var markerOptions = {
			map     : map,
			position: location
		};
		if (mapData.marker) {
			markerOptions.icon = {
				url: mapData.marker
			};
		}

		map.mapTypes.set('map_style', customMap);
		map.setMapTypeId('map_style');

		// Init marker
		marker = new google.maps.Marker(markerOptions);

		if (mapData.info) {
			var infoWindow = new google.maps.InfoWindow({
				content : '<div class="info-box mf-map">' + mapData.info + '</div>',
				maxWidth: 600
			});

			google.maps.event.addListener(marker, 'click', function () {
				infoWindow.open(map, marker);
			});
		}
	}

	function mutiMaps(infoWindow, bounds, mapOptions, mapData, id, styles, customMap) {

		// Display a map on the page
		mapOptions.zoom = parseInt(mapData.zoom, 10);
		mapOptions.mapTypeControlOptions = {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP]
		};

		var map = new google.maps.Map(document.getElementById(id), mapOptions);
		map.mapTypes.set('map_style', customMap);
		map.setMapTypeId('map_style');
		for (var i = 0; i < mapData.number; i++) {
			var lats = mapData.lat,
				lng = mapData.lng,
				info = mapData.info;

			var position = new google.maps.LatLng(lats[i], lng[i]);
			bounds.extend(position);

			// Create marker options
			var markerOptions = {
				map     : map,
				position: position
			};
			if (mapData.marker) {
				markerOptions.icon = {
					url: mapData.marker
				};
			}

			// Init marker
			var marker = new google.maps.Marker(markerOptions);

			// Allow each marker to have an info window
			googleMaps(infoWindow, map, marker, info[i]);

			// Automatically center the map fitting all markers on the screen
			map.fitBounds(bounds);
		}
	}

	function googleMaps(infoWindow, map, marker, info) {
		google.maps.event.addListener(marker, 'click', function () {
			infoWindow.setContent(info);
			infoWindow.open(map, marker);
		});
	}

	/**
	 * Document ready
	 */
	$(function () {
		induscity.init();
	});

})(jQuery);