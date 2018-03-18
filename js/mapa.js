(function ($) {
  var directionsDisplay = '';
  var directionsService = new google.maps.DirectionsService();
  var map = '';

  var initialize = function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var coordinates = new google.maps.LatLng(53.401686, -2.165961);
    var mapOptions = {
      zoom: 10,
      center: coordinates
    };
    new google.maps.places.Autocomplete(document.querySelector('#start'));
    new google.maps.places.Autocomplete(document.querySelector('#end'));

    map = new google.maps.Map(document.querySelector('#map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
  };

  var searchRoute = function searchRoute() {
    var inputStart = document.querySelector('#start').value;
    var inputend = document.querySelector('#end').value;
    var request = {
      origin: inputStart,
      destination: inputend,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        alert('Lo sentimos,no se pudo identificar una ruta entre estas ubicaciones');
      }
    });
  };

  var buttonRoute = document.querySelector('#route');
  buttonRoute.addEventListener('click', searchRoute);

  google.maps.event.addDomListener(window, 'load', initialize);

  // funcionalidad para la busqueda de empresas
  console.log(empresa[0]);
  const inputFilter = $('.filtrar-empresa');

  inputFilter.on('keyup', function (e) {
    $('.container-filtrado').empty();
    $('.container-filtrado').show();
    if (e.keyCode === 65) {
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[9].name + '</li>');
    }
    if (e.keyCode === 66) {
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[0].name + '</li>');
    }
    if (e.keyCode === 67) {
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[6].name + '</li>');
    }
    if (e.keyCode === 72) {
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[4].name + '</li>');
    }
    if (e.keyCode === 73) {
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[0].name + '</li>');
    }
    if (e.keyCode === 76) {
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[3].name + '</li>');
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[7].name + '</li>');
    }
    if (e.keyCode === 77) {
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[5].name + '</li>');
    }
    if (e.keyCode === 79) {
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[1].name + '</li>');
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[2].name + '</li>');
    }
    if (e.keyCode === 80) {
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[7].name + '</li>');
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[9].name + '</li>');
    }

    if (e.keyCode === 82) {
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[8].name + '</li>');
    }

    if (e.keyCode === 83) {
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[1].name + '</li>');
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[5].name + '</li>');
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[6].name + '</li>');
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[8].name + '</li>');
    }

    if (e.keyCode === 84) {
      $('.container-filtrado').append('<li class="list-empresa">' + empresa[4].name + '</li>');
    }

    if (e.keyCode === 8) {
      $('.container-filtrado').hide();
    }

    $('.list-empresa').on('click', function (e) {
      $('.container-filtrado').hide();
      console.log($(this).text());
      $('.plantilla').empty();
      for (let i = 0; i < empresa.length; i++) {
        if (empresa[i].name === $(this).text()) {
          const estructure = '<p>' + empresa[i].name + '</p>' +
            '<p>' + empresa[i].departamento + '</p>' +
            '<p>' + empresa[i].provincia + '</p>' +
            '<p>' + empresa[i].distrito + '</p>' +
            '<p>' + empresa[i].infracción + '</p>' +
            '<p>' + empresa[i]['producto/servicio'] + '</p>' +
            '<p>' + empresa[i].amonestación + '</p>' ;

          $('.plantilla').append(estructure);
          $('.plantilla').append('<div class="likes col-xs-12">' +
          '<div class="iconos col-xs-6">' +
          '<span>' +
          '<i class="glyphicon glyphicon-thumbs-up green"></i> 20' +
          '</span>' +
          '<span>' +
          '<i class="glyphicon glyphicon-thumbs-down red"></i> 5 ' +
          '</span>' +
          '</div>' +
        '</div>');

          console.log(empresa[i].provincia);
        }
      }
    });
  });
})(jQuery);