'use strict';

angular.module('super').controller('view-caja.controller',['$scope','$http','$routeParams','$location',
  function($scope,$http,$routeParams,$location){


    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/cajas/'+$routeParams.cajaId
      }).then(function(response){
        $scope.caja = response.data;
        $scope.estado = $scope.caja.estado;
        $('#loadLogo').hide();
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });

      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/detallesByCaja/'+$routeParams.cajaId
      }).then(function(response){
        $scope.detalles = response.data;
        $('#loadLogo').hide();
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });
    };

    $scope.back = function(){
      $location.path('/Cajas');
    };

    $scope.go = function(caja, detalle){
      $location.path('/caja/'+caja._id+'/detalle/'+detalle._id);
    };

    var deleteDetallesByCaja = function (caja) {
      $('#loadLogo').show();
      $http({
        method: 'DELETE',
        url: '/api/detallesByCaja/' + caja._id,
      }).then(function(response){
        new PNotify({
          text: 'La caja chica ha sido eliminada',
          styling: 'bootstrap3',
          type: 'success'
        });
        $('#loadLogo').hide();
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });
    };

    $scope.delete = function(caja) {

      (new PNotify({
          title: 'Confirmación',
          text: '¿Desea eliminar esta caja?',
          icon: 'glyphicon glyphicon-question-sign',
          hide: false,
          confirm: {
              confirm: true
          },
          buttons: {
              closer: false,
              sticker: false
          },
          history: {
              history: false
          },
          styling: 'bootstrap3',
          type: 'warning'
      })).get().on('pnotify.confirm', function() {
        $('#loadLogo').show();
        $http({
          method: 'DELETE',
          url: '/api/cajas/' + caja._id
        }).then(function(){
          deleteDetallesByCaja(caja);
          $scope.back();
          $('#loadLogo').hide();
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
          $('#loadLogo').hide();
        });

      }).on('pnotify.cancel', function() {
      });

    };

    var enviarDetallesByCaja = function (caja) {
      $('#loadLogo').show();
      $http({
        method: 'PUT',
        url: '/api/detallesByCaja/' + caja._id,
        data: {
          estado: 'Pendiente'
        }
      }).then(function(response){
        new PNotify({
          text: 'La caja chica ha sido enviada con éxito',
          styling: 'bootstrap3',
          type: 'success'
        });
        $('#loadLogo').hide();
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });
    };

    $scope.enviar = function(caja) {

      (new PNotify({
          title: 'Confirmación',
          text: '¿Desea enviar esta caja?',
          icon: 'glyphicon glyphicon-question-sign',
          hide: false,
          confirm: {
              confirm: true
          },
          buttons: {
              closer: false,
              sticker: false
          },
          history: {
              history: false
          },
          styling: 'bootstrap3',
          type: 'warning'
      })).get().on('pnotify.confirm', function() {

        if(caja.valor != 0){
          $('#loadLogo').show();
          $http({
            method: 'PUT',
            url: '/api/enviarCaja/' + caja._id
          }).then(function(response){
            enviarDetallesByCaja(caja);
            $scope.caja = response.data;
            setTimeout(function(){ $scope.printDiv('#reporteDetalles', 'Detalles de la caja'); }, 500);
            $('#loadLogo').hide();
          }, function(errorResponse) {
            $('#loadLogo').hide();
            mostrarNotificacion(errorResponse.data.message);
          });
        } else {
          mostrarNotificacion('El valor de la caja no puede ser $0.00');
          $('#loadLogo').hide();
        }

      }).on('pnotify.cancel', function() {
      });
    };

    $scope.printDiv = function(IdDiv, titulo){
      var divToPrint = jQuery(IdDiv).html();
      var newWin = window.open('', 'my div','left=0,top=0,width=5000,height=5000,toolbar=1,resizable=0');

      var fecha = new Date();
      var mes = Number(fecha.getMonth()) + 1;
      var fechaTitle = fecha.getDate()+'-'+mes+'-'+fecha.getFullYear();

      newWin.document.write('<html><head><title>'+titulo+' '+fechaTitle+'</title>');
      newWin.document.write('<link href="/css/bootstrap.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/css/print.css" rel="stylesheet">');
      newWin.document.write('</head><body>');
      newWin.document.write(divToPrint);
      if($scope.caja.estado == 'Aprobado'){
        newWin.document.write('____________________<br>');
        newWin.document.write('&nbsp;&nbsp;&nbsp;<a>Aprobado por Gerente de Área</a>');
        newWin.document.write('<hr>');
        newWin.document.write(divToPrint);
        newWin.document.write('____________________<br>');
        newWin.document.write('&nbsp;&nbsp;&nbsp;<a>Aprobado por Gerente de Área</a>');
      }
      newWin.document.write('</body>');
      newWin.document.write('<script type="text/javascript">');
      newWin.document.write('window.print();');
      newWin.document.write('window.close();');
      newWin.document.write('</script>');
      newWin.document.write('</html>');
    }

    $scope.exportExcel = function (IdDiv, titulo) {
      var blob = new Blob([document.getElementById(IdDiv).innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        var fecha = new Date();
        var mes = Number(fecha.getMonth()) + 1;
        var fechaTitle = fecha.getDate()+'-'+mes+'-'+fecha.getFullYear();
        saveAs(blob, titulo+" "+ fechaTitle + ".xls");
    };


  }
]);
