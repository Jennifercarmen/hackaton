// Creaciòn de variables tomando el cuenta el id de cada elemento
var $usersconect = $('.users');
var $inputpost = $('#messagepost');
var fichero = $('#fichero');
var $imageUser = $('#img-user');
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    $imageUser.attr('src', user.photoURL);
  } else {
  }
});

// Abrir modal al dar click en textarea
$inputpost.on('click', function () {
  $('#fichero').attr({ value: '' });
  $("#modalpost").modal()
});
// cargar imagen en div
fichero.on('change', function (ev) {
  var file = ev.target.files[0];
  var fr = new FileReader();
  fr.onload = function (ev2) {
    $('#imagepost').attr('src', ev2.target.result);
  };
  fr.readAsDataURL(file);
});
// Mustra en pantalla los datos a publicar con los datos almacenados en firebase
firebase.database().ref('connected').on('value', function (snapshot) {
  var html = '';
  snapshot.forEach(function (e) {
    var element = e.val();
    var name = element.name;
    var email = element.email;
    html += '<li>' +
      '<img src="../assets/images/active.png" class="responsive-img" alt="active" width="10px">' +
      ' ' + name + ' </li>';
  });
  $($usersconect).append(html);
});


var $messages = $('#messages');


$messages.on('click', function () {
  window.location.href = 'chat.html';
});


// .............Filtros................
// Filtros del input


$(document).ready(function () {
  $('.search').keyup(function () {
    var name = $(this).val().toLowerCase();
    $('.collection').hide();
    $('.collection').each(function () {
      var search = $(this).text();
      if (search.indexOf(name) !== -1) {
        $(this).show();
      }
    });
  });
});



function activeButton() {
  if (validatePost) {
    $('#btnEnviar').attr('disabled', false);
  }
}

function desactiveButton() {
  $('#btnEnviar').attr('disabled', 'disabled');
}

var validatePost = false;

$('#writepost').on('input', function () {
  if ($(this).val()) {
    validatePost = true;
    activeButton();
  } else {
    desactiveButton();
  }
});