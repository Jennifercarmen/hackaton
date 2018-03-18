

const barchat = $('.content_chat');
const close = $('.close');
barchat.on('click', function() {
  $('.box_chatindecopi').removeClass('hidden');
  $('.close').removeClass('hidden');
});
close.on('click', function() {
  $('.box_chatindecopi').addClass('hidden');
  $('.close').addClass('hidden');
});

var $imageUser = $('#img-user');
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var photoURL = user.photoURL;
    $imageUser.attr('src', photoURL);
    // ...
  } else {
    // User is signed out.
    // ...
  }
});

/* ------------------------CHAT------------------------------*/
// Creaciòn de variables tomando el cuenta el id de cada elemento
var $txtNombre = $('#nombre');
var $txtMensaje = $('#message');
var $btnEnviar = $('#btnEnviarChat');
var $chatUl = $('#chatUl');
var $mostrar = $('#mostrar');
var $cerrar = $('#cerrar');
  
// Funciòn del evento click, para almacenar los datos en firebase
$btnEnviar.on('click', function() {
  var mensaje = $txtMensaje.val();
  firebase.auth().onAuthStateChanged(function(user) {
    firebase.database().ref('chat').push({
      uid: user.uid,
      name: user.displayName,
      message: mensaje
    });
  });
});
// Mustra en pantalla los datos a publicar con los datos almacenados en firebase
firebase.database().ref('chat').on('value', function(snapshot) {
  var html = '';
  snapshot.forEach(function(e) {
    var element = e.val();
    var nombre = element.name;
    var mensaje = element.message;
    html += '<div class="reclamo"><b>' + nombre + ': </b><br>' + mensaje + '</div>';
  });
  $($chatUl).append(html);
}); 
// Mostrar el chat
$mostrar.on('click', function() {
  $('#chat').fadeIn(600);
});
// Ocultar el chat
$cerrar.on('click', function() {
  $('#chat').fadeOut(600);
});
