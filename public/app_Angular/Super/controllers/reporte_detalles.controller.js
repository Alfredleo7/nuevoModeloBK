'use strict';

angular.module('super').controller('reporte_detalles.controller', ['$scope', '$http',
  function($scope, $http){

    $('#loadLogo').show();
    $http({
      method: 'GET',
      url: '/api/reporteDetalles'
    }).then(function(response){
      $('#loadLogo').hide();
      $scope.detalles = response.data;
    }, function(errorResponse){
      $('#loadLogo').hide();
      mostrarNotificacion(errorResponse.data.message);
    })

    $scope.printDiv = function(IdDiv, tipo){

      var divToPrint = jQuery(IdDiv).html();
      var newWin = window.open('', 'my div','left=0,top=0,width=5000,height=5000,toolbar=1,resizable=0');

      var fecha = new Date();
      var mes = Number(fecha.getMonth()) + 1;
      var fechaTitle = fecha.getDate()+'-'+mes+'-'+fecha.getFullYear();

      newWin.document.write('<html><head><title>Reporte por '+tipo+' '+fechaTitle+'</title>');
      newWin.document.write('<link href="/css/bootstrap.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/css/print.css" rel="stylesheet">');
      newWin.document.write('</head><body>');
      newWin.document.write(divToPrint);
      newWin.document.write('</body>');
      newWin.document.write('<script type="text/javascript">');
      newWin.document.write('window.print();');
      newWin.document.write('window.close();');
      newWin.document.write('</script>');
      newWin.document.write('</html>');

    };

    $scope.exportExcel = function (IdDiv, tipo) {
      var blob = new Blob([document.getElementById(IdDiv).innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        var fecha = new Date();
        var mes = Number(fecha.getMonth()) + 1;
        var fechaTitle = fecha.getDate()+'-'+mes+'-'+fecha.getFullYear();
        saveAs(blob, "Reporte por "+tipo+" "+ fechaTitle + ".xls");
    };

  }
]);
