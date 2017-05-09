$('#idselectBK').attr('name', 'selectorgerente');
$('#idselectBK').attr('name', 'selectorbk');

$('input[type=radio][name=selector]').on('change', function(){
switch($(this).val()){
  case 'bk' :
    $('select[id=idselectGE]').attr('disabled',true);
    $('select[id=idselectBK]').attr('disabled',false);
    $('#idselectGE').attr('name', '');
    $('#idselectBK').attr('name', 'selectorbk');
    break;
  case 'gerente' :
    $('select[id=idselectGE]').attr('disabled',false);
    $('select[id=idselectBK]').attr('disabled',true);
    $('#idselectBK').attr('name', '');
    $('#idselectGE').attr('name', 'selectorgerente');
    break;
  }     
});



function mesaje_error_login(mensajeSesionCorrecta) {
  $('#mensaje-error').appendTo($mensajeSesionCorrecta);
}


