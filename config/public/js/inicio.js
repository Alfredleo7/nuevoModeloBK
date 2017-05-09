
$('ul.nav li').click(function(e) { 
  var valor = $(this).attr('value');
  switch(valor){
    case 'MiCajaChica' :
      //alert(valor);
      $('#idcajachica').attr("class","active");
      $('#idperfil').removeAttr("class","active");
      break;
    case 'Perfil' :
      //alert(valor);
      $('#idcajachica').removeAttr("class","active");
      $('#idperfil').attr("class","active");
      break;
  }
});

$('#idcategoriacrear li a').click(function() {
  var categoria = $(this).text();
  //alert('Has clickado sobre el elemento número: '+categoria);
  $('#idinputcategoriacrear').val(categoria);
});

$('#idempresacrear li a').click(function() {
  var empresa = $(this).text();
  //alert('Has clickado sobre el elemento número: '+categoria);
  $('#idinputempresacrear').val(empresa);
});