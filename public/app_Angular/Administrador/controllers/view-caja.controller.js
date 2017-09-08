'use strict';

angular.module('administrador').controller('view-caja.controller',['$scope','$http','$routeParams','$location',
  function($scope,$http,$routeParams,$location){

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/cajas/'+$routeParams.cajaId
      }).then(function(response){
        $scope.caja = response.data;
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
      if($scope.caja.estado == 'Pendiente')$location.path('/cajasPendientes');
      if($scope.caja.estado == 'Aprobado')$location.path('/cajasAprobadas');
      if($scope.caja.estado == 'Rechazado')$location.path('/cajasRechazadas');
    };

    var aprobarDetallesByCaja = function (idCaja) {
      $('#loadLogo').show();
      $http({
        method: 'PUT',
        url: '/api/detallesByCaja/' + idCaja,
        data: {
          estado: 'Aprobado'
        }
      }).then(function(response){
        $('#loadLogo').hide();
      }, function(errorResponse) {
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    $scope.aprobar = function(caja) {

      (new PNotify({
          title: 'Confirmación',
          text: '¿Desea aprobar esta caja?',
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
          method: 'PUT',
          url: '/api/aprobarCaja/' + caja._id
        }).then(function(){
          aprobarDetallesByCaja(caja._id);
          $('#loadLogo').hide();
          $scope.back();
          new PNotify({
            text: 'Caja Chica Aprobada',
            styling: 'bootstrap3',
            type: 'success'
          })
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
          $('#loadLogo').hide();
        });

      }).on('pnotify.cancel', function() {
      });

    };

    var rechazarDetallesByCaja = function (idCaja) {
      $('#loadLogo').show();
      $http({
        method: 'PUT',
        url: '/api/detallesByCaja/' + idCaja,
        data: {
          estado: 'Rechazado'
        }
      }).then(function(response){
        $('#loadLogo').hide();
      }, function(errorResponse) {
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      });
    };


    $scope.rechazar = function(caja) {
      $('.modal-backdrop').hide();
      $('#modalObservacion').modal('hide');
      $('#loadLogo').show();
      $http({
        method: 'PUT',
        url: '/api/rechazarCaja/' + caja._id,
        data: {
          observacion: $scope.observacion
        }
      }).then(function(response){
        $('#loadLogo').hide();
        rechazarDetallesByCaja(caja._id);
         $scope.back();
         new PNotify({
           text: 'Caja Chica Rechazada',
           styling: 'bootstrap3',
           type: 'success'
         })
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });

    };



    $scope.go = function(caja, detalle){
      $location.path('/caja/'+caja._id+'/detalle/'+detalle._id);
    };


    $scope.printDiv = function(IdDiv, titulo){
      var divToPrint = jQuery(IdDiv).html();
      var newWin = window.open('', 'my div','left=0,top=0,width=5000,height=5000,toolbar=1,resizable=0');

      var fecha = new Date();
      var mes =  Number(fecha.getMonth()) + 1;
      var fechaTitle = fecha.getDate()+'-'+mes+'-'+fecha.getFullYear();

      newWin.document.write('<html><head><title>'+titulo+' '+fechaTitle+'</title>');
      newWin.document.write('<link href="/css/bootstrap.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/css/print.css" rel="stylesheet">');
      newWin.document.write('</head><body>');
      newWin.document.write(divToPrint);
      newWin.document.write('____________________<br>');
      newWin.document.write('&nbsp;&nbsp;&nbsp;<a>Aprobado por Gerente de Área</a>');
      newWin.document.write('</body>');
      newWin.document.write('<script type="text/javascript">');
      newWin.document.write('window.print();');
      newWin.document.write('window.close();');
      newWin.document.write('</script>');
      newWin.document.write('</html>');
    }

  }
]);
