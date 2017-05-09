$(document).ready(function() {
  $('#idcategoriacrear li a').click(function() {
    console.log('AAAAAAAAAAAAAAAA');
    var i = $(this).text();
    alert('Has clickado sobre el elemento número: '+i);
  });
});