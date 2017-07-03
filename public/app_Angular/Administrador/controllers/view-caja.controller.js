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
      $location.path('/');
    };

    var aprobarDetallesByCaja = function (idCaja) {
      $http({
        method: 'PUT',
        url: '/api/detallesByCaja/' + idCaja,
        data: {
          estado: 'Aprobado'
        }
      }).then(function(response){
      }, function(errorResponse) {
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
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
          $('#loadLogo').hide();
        });

      }).on('pnotify.cancel', function() {
      });

    };

    var rechazarDetallesByCaja = function (idCaja) {
      $http({
        method: 'PUT',
        url: '/api/detallesByCaja/' + idCaja,
        data: {
          estado: 'Rechazado'
        }
      }).then(function(response){
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };


    $scope.rechazar = function(caja) {

      (new PNotify({
          title: 'Confirmación',
          text: '¿Desea rechazar esta caja?',
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
          url: '/api/rechazarCaja/' + caja._id
        }).then(function(){
          rechazarDetallesByCaja(caja._id);
          $('#loadLogo').hide();
          $scope.back();
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
          $('#loadLogo').hide();
        });

      }).on('pnotify.cancel', function() {
      });

    };



    $scope.go = function(caja, detalle){
      $location.path('/caja/'+caja._id+'/detalle/'+detalle._id);
    };


    $scope.printDiv = function(IdDiv, titulo){
      var divToPrint = jQuery(IdDiv).html();
      var newWin = window.open('', 'my div');

      var fecha = new Date();
      var fechaTitle = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear();

      newWin.document.write('<html><head><title>'+titulo+' '+fechaTitle+'</title>');
      newWin.document.write('<link href="/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">');
      newWin.document.write('</head><body onload="window.print()">');
      newWin.document.write(divToPrint);
      newWin.document.write('</body>');
      newWin.document.write('</html>');
      newWin.document.close();
      setTimeout(function () { newWin.close(); }, 3000);
    }

  }
]);
