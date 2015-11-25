// navigator.geolocation.getCurrentPosition(onLocation, error, options);
//
// function onLocation(position) {
//   var latitude = position.coords.latitude;
//   var longitude = position.coords.longitude;
//   console.log('Your latitude is ' + latitude);
//   console.log('Your longitude is ' + longitude);
//   document.getElementById('position').setAttribute("src", 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d30' +
//   latitude + '!2d' +
//   longitude + '!3d40.44437325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1448445016579')
//
//
// }
//
// function error(error) {
//   console.log(error);
// }
//
// var options = {
//   enableHighAccuracy: true
// };

var latitude;
var longitude



function init() {
  var watchID = navigator.geolocation.watchPosition(onWatch, onError, watchOptions);
}

function onWatch(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log('Your latitude is ' + latitude);
  console.log('Your longitude is ' + longitude);

  initMap();
}

function onError(error) {
  console.log(error);
}

var watchOptions = {
  enableHighAccuracy: true
};

var map;
var infoWindow;
var service;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 18,
    styles: [{
      stylers: [{ visibility: 'simplified' }]
    }, {
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }]
  });

  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  // The idle event is a debounced event, so we can query & listen without
  // throwing too many requests at the server.
  map.addListener('idle', performSearch);
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    keyword: 'restaurant'
  };
  service.radarSearch(request, callback);
}

function callback(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    addMarker(result);
  }
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'http://maps.gstatic.com/mapfiles/circle.png',
      anchor: new google.maps.Point(20, 20),
      scaledSize: new google.maps.Size(10, 17)
    }
  });

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      infoWindow.setContent(result.name);
      infoWindow.open(map, marker);
    });
  });
}
