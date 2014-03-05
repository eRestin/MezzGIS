/**
 * Island GIS
 * @author Darrell Wilson - hello@make-digital.co.uk
 */

/**
 * Create GIS namespace global object
 */
var GIS = GIS || {};

GIS = {

  windowObject: $(window),
  menuElement: $('nav[role="navigation"]'),

  utility: function() {
    // return current window width
    return GIS.windowObject.width();
  },

  tabs: {
    init: function() {
      $('.tab__links').each(function() {
        // For each set of tabs, we want to keep track of
        // which tab is active and it's associated content
        var $active, $content, $links = $(this).find('a');

        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
        $active.addClass('active');
        $content = $($active.attr('href'));

        // Hide the remaining content
        $links.not($active).each(function () {
          $($(this).attr('href')).hide();
        });

        // Bind the click event handler
        $(this).on('click', 'a', function(e) {

          // Prevent the anchor's default click action
          e.preventDefault();

          // Make the old tab inactive.
          $active.removeClass('active');
          $content.hide();

          // Update the variables with the new link and content
          $active = $(this);
          $content = $($(this).attr('href'));

          // Make the tab active.
          $active.addClass('active');
          $content.fadeIn(1000);
        });
      });
    }
  },
  scrollers: {
    init: function() {
      // initialize scrollable
      $(".scrollable").scrollable({
        circular: true,
        speed: 600
      });
    },
    show: function () {
      $('.clients').show();
    },
    hide: function () {
      $('.clients').hide();
    }
  },
  mobileMenu: {
    init: function() {
      var $menuTrigger = $('.mobile-menu__trigger');
      $menuTrigger.on('click', function(e) {
        e.preventDefault();
        GIS.menuElement.slideToggle();
      });
    }
  },
  placeholders: {
    init: function() {
      $('textarea[placeholder]').simplePlaceholder();
      $('input:text[placeholder]').simplePlaceholder();
    }
  },
  init: function() {
    if (GIS.windowObject.width() >= 768) {
      this.tabs.init();
    }
    this.scrollers.init();
    this.mobileMenu.init();
    this.placeholders.init();
  },

};


/**
 * On ready - go
 */
$(function() {
  GIS.init();

  // Resize checks
  $(window).resize(function () {
    // show/hide menu on resize
   if (GIS.windowObject.width() >= 768) {
      GIS.menuElement.show();
      GIS.tabs.init();
      GIS.scrollers.show();
    } else {
      GIS.menuElement.hide();
      GIS.scrollers.hide();
    }
  });


  // GMAps App
  function initializeContact() {

    var gmarkers = [];
    var map = null;
    var infowindow = null;

    var styles = [
       {
         "featureType": "landscape.natural",
         "stylers": [
           { "color": "#eaf0e3" },
           { "visibility": "on" }
         ]
       },{
         "featureType": "landscape.man_made",
         "stylers": [
           { "color": "#d9e5ca" }
         ]
       },{
         "featureType": "water",
         "stylers": [
           { "color": "#c1d4dd" }
         ]
       }
      ];

      var mapOptions = {
        center: new google.maps.LatLng(55.93760385780503, -3.182516098022461),
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        zoomControl: true,
        draggable: $('html.touch').length ? false : true,
        styles: styles
      };

      map = new google.maps.Map(document.getElementById("contact-map"), mapOptions);

      google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
      });

      var locations = [
        ['Head Office', 55.93760385780503, -3.182516098022461, '1.png', '<div><p style="font-size: 18px;">1-2 Sciennes Gardens<br>Edinburgh<br>Scotland, UK<br>EH9 1NR</p></div>']
       ];

      infowindow = new google.maps.InfoWindow({
        size: new google.maps.Size(150,50)
      });

      function setMarkers(locations) {
        for (var i = 0; i < locations.length; i++) {
          var location = locations[i];
          var myLatLng = new google.maps.LatLng(location[1], location[2]);
          var marker = new google.maps.Marker({
              position: myLatLng,
              animation: google.maps.Animation.DROP,
              map: map,
              title: location[0],
              icon: '../../static/media/uploads/icons/map-marker.png',
              html: location[4]
          });
          var boxText = document.createElement("div");
          boxText.style.cssText = "background-color: #6b6967;color: #fff; font-size: 10px; padding: 6px 12px;";
          var boxOptions = {
            content: boxText
            ,disableAutoPan: false
            ,maxWidth: 0
            ,pixelOffset: new google.maps.Size(0, 0)
            ,zIndex: null
            ,boxStyle: {
              width: "215px"
            }
            ,closeBoxMargin: "8px"
            ,infoBoxClearance: new google.maps.Size(1, 1)
            ,isHidden: false
            ,pane: "floatPane"
            ,enableEventPropagation: false
          };
          var ib = new InfoBox();
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              ib.setOptions(boxOptions);
              boxText.innerHTML = marker.html;
              ib.open(map, marker);
              map.panTo(pos);
            }
          })(marker, i));

          // Standard markers - if not using infobox
          // google.maps.event.addListener(marker, "click", function () {
           //  map.setCenter(marker.getPosition());
           //  infowindow.setContent(this.html);
           //  infowindow.open(map, this);
          // });
          gmarkers.push(marker);
        }
      }

      // Add the markers
      setMarkers(locations);

      // Click list of attractions to open markers
      function openMarker(i) {
        google.maps.event.trigger(gmarkers[i], "click");
        //map.setCenter(gmarkers[i].getPosition()); different effect - marker stays ststic
        map.panTo(gmarkers[i].getPosition());
      }
  }


  // GMAps App
  function initializeIndex() {

    var gmarkers = [];
    var map = null;
    var infowindow = null;

    var styles = [
       {
         "featureType": "landscape.natural",
         "stylers": [
           { "color": "#eaf0e3" },
           { "visibility": "on" }
         ]
       },{
         "featureType": "landscape.man_made",
         "stylers": [
           { "color": "#d9e5ca" }
         ]
       },{
         "featureType": "administrative",
         "stylers": [
           { "weight": 0.3 },
           { "color": "#666666" }
         ]
       },{
         "featureType": "water",
         "stylers": [
           { "color": "#c1d4dd" }
         ]
       },{
         "featureType": "administrative",
         "elementType": "geometry.fill",
         "stylers": [
           { "visibility": "off" }
         ]
       }
      ];

      lat = 39.8373652;
      lng = -26.3411152;

      if ($(window).width() < 760) {
        lat = 57.1499012;
        lng = -2.1260368;
      }
      if ($(window).width() < 480) {
        lat = 62.3737098;
        lng = -14.7751625;
      }

      var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        zoomControl: true,
        draggable: $('html.touch').length ? false : true,
        scrollwheel: false,
        styles: styles
      };

      map = new google.maps.Map(document.getElementById("contact-map"), mapOptions);


      google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
      });

      var locations = [
        ['Houston, Texas', 29.817178, -95.4012915],
        ['Aberdeen', 57.1499012, -2.1260368],
        ['Middle East', 27.0821, 44.0150557],
        ['Kenya', 0.1768696, 37.9083264],
        ['Perth, Australia', -31.9688836, 115.931341]
       ];

      function setMarkers(locations) {
        for (var i = 0; i < locations.length; i++) {
          var location = locations[i];
          var myLatLng = new google.maps.LatLng(location[1], location[2]);
          var marker = new google.maps.Marker({
              position: myLatLng,
              animation: google.maps.Animation.DROP,
              map: map,
              title: location[0],
              icon: '../../static/media/uploads/icons/map-marker.png'
          });

          gmarkers.push(marker);
        }
      }

      // Add the markers
      setMarkers(locations);

  }



  // add window listener for GMaps
  if ($('body#contact').length) {
    google.maps.event.addDomListener(window, 'load', initializeContact);
  }
  if ($('body#index').length) {
     google.maps.event.addDomListener(window, 'load', initializeIndex);
  }

});
