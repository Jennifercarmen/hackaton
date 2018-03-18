/* ----------------------Post---------------------------*/

var $btnEnviar = $('#btnEnviar');
var $boxPost = $('#content-post');
var fichero = $('#fichero');
var $txtMensaje = $('#writepost');
const addPost = () => {
  firebase.database().ref('post').once('value', function (snapshot) {
    var newPost = firebase.database().ref('post').push({
      uid: user.uid,
      message: mensaje,
      fecha: fecha,
      hora: hora,
      count: snapshot.numChildren() * -1
    });

    var newPostKey = newPost.key;
    firebase.database().ref('/post/' + newPostKey).child('images').push({
      name: '',
      url: ''
    });
    $('#progress').removeClass('hide');
    $('#progress')
      .delay(2800)
      .fadeOut('slow');
    setTimeout(function () {
      $('#modalpost').modal('hide');

    }, 2000);
    $txtMensaje.val('');
    $('#imagepost').attr('src', '');
    $boxPost.empty();
    viewPost();
  });

}
$btnEnviar.on('click', postear);
// Funciòn del evento click, para almacenar los datos del post en firebase
function postear() {
  StorageRef = firebase.storage().ref();
  var imageUpload = fichero[0].files[0];
  var mensaje = $txtMensaje.val();
  var meses = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
  var f = new Date();
  var fecha = f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear();
  var hora = f.getHours() + ':' + f.getMinutes();

  firebase.auth().onAuthStateChanged(function (user) {
    if (fichero[0].files[0] === undefined) {
      firebase.database().ref('post').once('value', function (snapshot) {
        var newPost = firebase.database().ref('post').push({
          uid: user.uid,
          message: mensaje,
          fecha: fecha,
          hora: hora,
          count: snapshot.numChildren() * -1
        });

        var newPostKey = newPost.key;
        firebase.database().ref('/post/' + newPostKey).child('images').push({
          name: '',
          url: ''
        });
        $('#progress').removeClass('hide');
        $('#progress')
          .delay(2800)
          .fadeOut('slow');
        setTimeout(function () {
          $('#modalpost').modal('toggle');
        }, 2000);
        $txtMensaje.val('');
        $('#imagepost').attr('src', '');
        $boxPost.empty();
        viewPost();
      });
    } else {
      var uploadImages = StorageRef.child('posts/' + imageUpload.name).put(imageUpload);
      uploadImages.on('state_changed',
        function (snapshot) {
          $('#progress').removeClass('hide');
        },
        function (error) {
          // Gestionar el error si se produce
          alert('Hubo un error');
        },
        function () {
          // cuando se ha subido exitosamente
          firebase.database().ref('post').once('value', function (snapshot) {
            var downloadURL = uploadImages.snapshot.downloadURL;
            var nameImage = imageUpload.name;

            var newPost = firebase.database().ref('post').push({
              uid: user.uid,
              message: mensaje,
              fecha: fecha,
              hora: hora,
              count: snapshot.numChildren() * -1
            });
            var newPostKey = newPost.key;
            firebase.database().ref('/post/' + newPostKey).child('images').push({
              name: nameImage,
              url: downloadURL
            });
            $('#progress').addClass('hide');
            $('#modalpost').modal('toggle');
            $txtMensaje.val('');
            $('#imagepost').attr('src', '');
            $boxPost.empty();
            viewPost();
          });
        });
    }
  });
};

function viewPost() {
  firebase.database().ref('post').orderByChild('count').on('child_added', function (snapshot) {
    var html = '';
    var key = snapshot.key;
    var mensaje = snapshot.val().message;
    var fecha = snapshot.val().fecha;
    var hora = snapshot.val().hora;
    var uid = snapshot.val().uid;
    var ruta = snapshot.val().images;
    var rut = JSON.stringify(ruta, null, ' ');
    var contact = JSON.parse(rut);
    var keyimage = (Object.keys(contact));
    var obth = Object.values(contact[keyimage]);
    var url = obth[1];
    firebase.database().ref('/Usuarios/' + uid).on('value', snap => {
      name = snap.val().name;
      photoURL = snap.val().photoURL;
      html +=  `<div class="post-1 col-xs-12" id="post-clonar">
      <div class="cont-img-text col-xs-12">
        <div class="col-xs-4 col-sm-4">
          <img id="user" src="${photoURL}" class="img-responsive p" alt="1">
        
        </div>
        <div class="col-xs-8 col-sm-8" id="content-post">
        <p class="text-center">
        <strong id="name-user">${name}</strong>
      </p>
        <p><span class="fecha_post">${fecha} ${hora}</span></p>
          <p>${mensaje}</p>
        </div>
        <div class="col-xs-1 col-md-12 col-md-12"><img class="posteos-img responsive-img" src=${url}></div>

      </div>
      <div class="cont-img-text col-xs-12">
        <div class="iconos col-xs-6">
          <span>
            <i class="glyphicon glyphicon-heart-empty"></i>
          </span>
          <span>
            <i class="glyphicon glyphicon-comment"></i>
          </span>
          <span>
            <i class="icon-emoji-happy"></i>
          </span>
        </div>
        <div class="cont-btn col-xs-6">
          <a href="#">
            <span>
              <i class="glyphicon glyphicon-share-alt"></i>Compartir</span>
          </a>
        </div>
      </div>
    </div>`;


      $boxPost.append(html);
    });
    $('.comment').on('click', function () {
      $('textarea').val('');
      $(keycomment).val('');

      var keycomment = $(this).data('key');
      console.log(keycomment);
      $('#modal3').modal('open');
      $('#commentpost').on('click', function () {
        console.log(keycomment);
        $(keycomment).remove();
      });
  });
  $('.delete').on('click', function () {
    var keypost = $(this).data('id');
    console.log(keypost);
    $('#modal2').modal('open');
    $('#deletepost').on('click', function () {
      console.log(keypost);
      firebase.database().ref('/post/' + keypost).remove();
      window.location.href = 'user.html';
    });
  });
      });
  }

viewPost();
var boxAmigos = $('#amigos');

function viewFriends() {
  firebase.database().ref('Usuarios').on('child_added', function (snapshot) {
    var html = '';
    var key = snapshot.key;
    var email = snapshot.val().email;
    var name = snapshot.val().name;
    var photoURL = snapshot.val().photoURL;


    html += '<div class="col s12 m8 offset-m2">' +
      '<div class="col s12 m12">' +
      '<h4 class="header">' + name + '</h4>' +
      '<div class="card horizontal">' +
      '<div class="card-image">' +
      '<img id="cardimage" src="' + photoURL + '">' +
      '</div>' +
      '<div class="card-stacked">' +
      '<div class="card-content">' +
      '<p>Vive en Lima Perú</p>' +
      '<p>Email:' + email + ' </p>' +
      '</div>' +
      '<div class="card-action">' +
      '<a href="#" id="siguiendo">Siguiendo</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';


    boxAmigos.append(html);
  });
}
viewFriends();

