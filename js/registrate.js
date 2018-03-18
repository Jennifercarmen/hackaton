/* ------------ FUNCIONALIDAD/REGISTRATE.JS----------*/
$(document).ready(function() {
// Llamando las variables
  var $pleasures = $('#pleasures'); /* gustos*/
  var $validate = $('.validate');
  var $checkbox = $(':checkbox');
  var $submit = $('.submit');

  // iniciando los inputs en false
  var correctPleasures = false;
  var correctValidate = false;
  var correctCheckbox = false;

  // Obteniendo el contenido validando que sea letras maximo de 15 (ej:musica rock)
  $pleasures.on('input', function() {
    var PATTERNLASTNAME = /^([A-z ñáéíóú]{2,15})$/;
    if (PATTERNLASTNAME.test($(this).val())) {
      correctPleasures = true;
      activeButton();
    } else {
      disabledButton();
    }
  });

  // validacion del resto de los inputs
  $validate.on('input', function(event) {
    if ($validate.val() !== '') {
      correctValidate = true;
      activeButton();
    } else {
      disabledButton();
    }
  });

  // Validando que este maracado el checkbox
  $checkbox.on('click', function(event) {
    if ($checkbox.prop('checked')) {
      correctCheckbox = true;
      activeButton();
    } else {
      disabledButton();
    }
  });

  // Funcion que comprueba que habilita el boton
  function activeButton() {
    if (correctPleasures && correctValidate && correctCheckbox) {
      alert('Registro completado! \nDale click en REGISTRARSE y ya puedes INICIAR SESIÓN');
      $submit.removeAttr('disabled');
    }
  }
  // Funcion que deshabilita el boton
  function disabledButton() {
    $submit.attr('disabled', 'disabled');
  }
});
