/* ------------ FUNCIONALIDAD PARA POSTEAR(En proceso de mejora) ---------*/
$(document).ready(function() {
  /* ------ FUNCIONALIDAD PARA SUBIR FOTOS -------*/
  var $board = $('#container-perfil');
  var $btnImage = $('#photobtn');
  var $post1 = $('.post1');
// SLIDER
  $('#media').carousel({
    pause: true,
    interval: false,
  });

  $('#btn-publicar').on('click', function() {
    localStorage.setItem('listado', $post1.html());
  });
  if (localStorage.getItem('listado')) {
    $post1.html(localStorage.getItem('listado'));
  }     


  $btnImage.on('click', function() {
    var photo = $('#urlInput').val();
    /** Vaciando los input. */
    $('#urlInput').val('');
    /** Contenedor donde irán los nuevos comentarios. */
    var contenedor = $('#container-perfil'); // #container-perfil
    $('<img class="photobox center-block img-responsive" src= ' + photo + '  alt=...>').replaceAll('.imagen-perfil');
    // contenedor.append('<div class=box><div> <img class="photobox center-block img-responsive" src= ' + photo + '  alt=...> </div></div>');
    $('<img class="photobox center-block img-responsive" src= ' + photo + '  alt=...>').replaceAll('.post-img');
  });
  
  
  /* ----------------- CODIGO PARA EL POSTEO... ----------*/
  $('#btn-publicar').attr('disabled', true);
  $('#textarea-publicar').keyup(function() {
    $('#btn-publicar').attr('disabled', false);
    var rest = '';
    var letters = $('#textarea-publicar').val().length;
  });

  $('#btn-publicar').click(function() {
    if ($('#textarea-publicar').val().length > 0) {
      // var storyDiv = $('<div>', {'class': 'stylo-cont' });
      // var container = $('<p>');
      var text = $('#textarea-publicar').val();
      // storyDiv.text(text);
	  // storyDiv.append(container);
      // $('#content-post').append(storyDiv);

      // ======== Para no crear una estructura nueva se podria clonar la estructuras que ya tienes y cada ves que se publique solo se reemplace======

      
      // clonar estructura
      // capturamos a la estructura a clonar
      
      var $postclonado = $('#post-clonar').clone();
      $postclonado.removeAttr('id');
      $postclonado.attr('id', 'postnew');
      $contentPost = $postclonado.find('#content-post').removeAttr('id');
      $contentPost.attr('id', 'content-post-new');
      $contentPost.text(text);
      $imgUserPostClonado = $postclonado.find('#user').removeAttr('id');
      $imgUserPostClonado.attr('id', 'user-new');
      $imgUserPostClonado.attr('src', '../assets/images/usertwo.png');
      $nameUserPostClonado = $postclonado.find('#name-user').text('');

      $('#content-post').prepend($postclonado);
      $('#textarea-publicar').val('');
      $('#btn-publicar').attr('disabled', true);
      $('#textarea-publicar').css('initial');
    } else {
      $('#btn-publicar').attr('disabled', true);
    }
  });
});		  


/* -----------  Fin FUNCIONALIDAD PARA POSTEAR---------*/
/* ------------ FUNCIONALIDAD PARA SUBIR FOTOS ------------*/
/** Función para postear  */
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#image1')
        .attr('src', e.target.result);
      $('#image2')
        .attr('src', e.target.result);
      $('#image3')
        .attr('src', e.target.result);
      $('#image4')
        .attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}