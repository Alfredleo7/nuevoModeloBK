'use strict';

angular.module('super').controller('view-detalle.controller',['$scope','$http','$routeParams','$location',
  function($scope,$http,$routeParams,$location){

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/detalles/'+$routeParams.detalleId
      }).then(function(response){
        $scope.detalle = response.data;
        $('#loadLogo').hide();
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      })

    }

    $scope.back = function(){
      $location.path('/caja/'+$routeParams.cajaId);
    };

    $scope.editar = function(detalle){
      $location.path('/caja/'+$routeParams.cajaId+'/editarDetalle/'+detalle._id);
    }

    $scope.eliminar = function(detalle) {

      (new PNotify({
          title: 'Confirmación',
          text: '¿Desea eliminar este detalle?',
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
          url: '/api/detalles/'+detalle._id
        }).then(function(response){
          $location.path('/caja/'+$routeParams.cajaId);
          $('#loadLogo').hide();
          new PNotify({
            text: 'Detalle eliminado con éxito',
            styling: 'bootstrap3',
            type: 'success'
          })
        },function(errorResponse){
          mostrarNotificacion(errorResponse.data.message);
          $('#loadLogo').hide();
        })
      }).on('pnotify.cancel', function() {
      });

    }

    $scope.printDiv = function(IdDiv, titulo){
      var divToPrint = jQuery(IdDiv).html();
      var newWin = window.open('', 'my div','left=0,top=0,width=5000,height=5000,toolbar=1,resizable=0');

      var fecha = new Date();
      var fechaTitle = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear();

      newWin.document.write('<html><head><title>'+titulo+' '+fechaTitle+'</title>');
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
    }

  }
]);
