'use strict';

angular.module('super').controller('view_proveedores.controller', ['$scope','$http',
  function($scope,$http){

    $scope.find = function(){

      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/proveedores'
      }).then(function(proveedores){
        $scope.proveedores = proveedores.data;
        $('#loadLogo').hide();
      }, function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });
    }

    $scope.guardarProveedor = function(proveedor){
      /*mostrarNotificacion('Tarea en Construcción');
      $('.modalProveedores').modal('hide');*/
      if(proveedor){
        if(proveedor.cedula || proveedor.ruc){
          $('#loadLogo').show();
          $http({
            method: 'POST',
            url: '/api/proveedores',
            data: proveedor
          }).then(function(response){
            console.log('guardado');
            $scope.proveedores.push(response.data);
            $('.modalNewProveedor').modal('hide');
            $('#loadLogo').hide();
            new PNotify({
              text: 'Proveedor guardado con éxito',
              styling: 'bootstrap3',
              type: 'success'
            })
          }, function(errorResponse) {
            console.log('ya existe');
            mostrarNotificacion(errorResponse.data.message);
            $('#loadLogo').hide();
            return true;
          })
        } else {
          console.log('no agrega ruc o cedula');
          mostrarNotificacion('Ingrese un RUC o una cédula');
        }
      } else {
        console.log('no agrega ningun dato');
        mostrarNotificacion('Ingrese los datos');
      }

      $scope.editable = true;

    }

    $scope.initNuevo = function(){
      $scope.proveedor = {};
    }

    $scope.ver = function(proveedor){
      $scope.proveedor = proveedor;
    }

    $scope.actualizarProveedor = function(proveedor){
      if(proveedor){
        if(proveedor.cedula || proveedor.ruc){
          $('#loadLogo').show();
          $http({
            method: 'PUT',
            url: '/api/proveedores/'+proveedor._id,
            data: proveedor
          }).then(function(response){
            console.log('actualizado');
            $('.modalEditProveedor').modal('hide');
            $('#loadLogo').hide();
            new PNotify({
              text: 'Proveedor actualizado con éxito',
              styling: 'bootstrap3',
              type: 'success'
            })
          }, function(errorResponse) {
            console.log('ya existe');
            mostrarNotificacion(errorResponse.data.message);
            $('#loadLogo').hide();
            return true;
          })
        } else {
          console.log('no agrega ruc o cedula');
          mostrarNotificacion('Ingrese un RUC o una cédula');
        }
      } else {
        console.log('no agrega ningun dato');
        mostrarNotificacion('Ingrese los datos');
      }
    }

    $scope.eliminar = function(proveedor){
      (new PNotify({
          title: 'Confirmación',
          text: '¿Desea eliminar este Proveedor?',
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
          url: '/api/proveedores/' + proveedor._id
        }).then(function(){
          for (var i in $scope.proveedores) {
            if ($scope.proveedores[i] === proveedor) {
              $scope.proveedores.splice(i, 1);
            }
          }
          new PNotify({
            text: 'Proveedor eliminado con éxito',
            styling: 'bootstrap3',
            type: 'success'
          })
          $('.modalViewProveedor').modal('hide');
          $('#loadLogo').hide();
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
          $('#loadLogo').hide();
        });

      }).on('pnotify.cancel', function() {
      });
    }

  }
]);
