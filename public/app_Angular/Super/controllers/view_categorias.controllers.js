'use strict';

angular.module('super').controller('view_categorias.controller', ['$scope','$http',
  function($scope, $http){

    $scope.monto = {};

    $scope.newCategoria = {};

    $scope.formEditCategoria = false;

    $scope.formEditCategoriaFalse = function(){
      $scope.formEditCategoria = false;
    }

    $scope.form = false;
    $scope.trueForm = function(){
      $scope.form = true;
    }
    $scope.falseForm = function(){
      $scope.form = false;
    }
    $scope.trueNuevo = function(){
      $scope.nuevo = true;
    }
    $scope.falseNuevo = function(){
      $scope.nuevo = false;
    }

    $scope.iniciarNuevo = function(){
      $scope.trueForm();
      $scope.trueNuevo();
      $scope.monto = {};
    }

    var inicializarSelected = function(){
      for(var i in $scope.categorias){
        $scope.categorias[i].selected = false;
      }
    }

    $scope.iniciarActualizacion = function(monto){
      $scope.trueForm();
      $scope.falseNuevo();
      $scope.monto.empresa = monto.empresa._id;
      $scope.getSucursales();
      $scope.monto = {
        _id: monto._id,
        creado: monto.creado,
        categoria: monto.categoria,
        empresa: monto.empresa._id,
        sucursal: monto.sucursal._id,
        montoMax: monto.montoMax,
        destinadoA: monto.destinadoA
      };
    }

    $('#loadLogo').show();
    $http({
      method: 'GET',
      url: '/api/empresas'
    }).then(function(response){
      $('#loadLogo').hide();
      $scope.empresas = response.data;
    }, function(errorResponse){
      $('#loadLogo').hide();
      mostrarNotificacion(errorResponse.data.message);
    })

    $scope.init = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/categorias/'
      }).then(function(response){
        $('#loadLogo').hide();
        $scope.categorias = response.data;
        inicializarSelected();
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.ver = function(categoria){
      $scope.falseForm();
      inicializarSelected();
      categoria.selected = true;
      $scope.categoria = categoria;
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/montosCategorias/'+categoria._id
      }).then(function(response){
        $('#loadLogo').hide();
        $scope.montos = response.data;
        $("html, body").stop().animate({
          scrollTop: $('#detalles').offset().top - 40
        }, '500', 'linear');
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.getSucursales = function(){
      if($scope.monto.empresa){
        $('#loadLogo').show();
        $http({
          method: 'GET',
          url: '/api/sucursalesByEmpresa/'+$scope.monto.empresa
        }).then(function(response){
          $('#loadLogo').hide();
          $scope.sucursales = response.data;
        }, function(errorResponse){
          $('#loadLogo').hide();
          mostrarNotificacion(errorResponse.data.message);
        })
      }
    }

    $scope.guardarMonto = function(){
      $scope.monto.categoria = $scope.categoria._id;
      $('#loadLogo').show();
      $http({
        method: 'POST',
        url: '/api/montosCategorias',
        data: $scope.monto
      }).then(function(response){
        $('#loadLogo').hide();
        $scope.montos.push(response.data);
        $scope.monto = {};
        $scope.sucursales = [];
        $scope.falseForm();
        new PNotify({
          text: 'Registro guardado con éxito',
          styling: 'bootstrap3',
          type: 'success'
        })
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.deleteMonto = function(monto){

      (new PNotify({
          title: 'Confirmación',
          text: '¿Desea eliminar este Registro?',
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
          url: '/api/deleteMontosCategorias/'+ monto._id
        }).then(function(response){
          $('#loadLogo').hide();
          for (var i in $scope.montos) {
            if ($scope.montos[i]._id === response.data._id) {
              $scope.montos.splice(i, 1);
            }
          }
          new PNotify({
            text: 'Registro eliminado con éxito',
            styling: 'bootstrap3',
            type: 'success'
          })
        }, function(errorResponse){
          $('#loadLogo').hide();
          mostrarNotificacion(errorResponse.data.message);
        })

      }).on('pnotify.cancel', function() {
      });

    }

    $scope.updateMonto = function(monto){
      $('#loadLogo').show();
      $http({
        method: 'PUT',
        url: '/api/updateMontosCategorias/'+monto._id,
        data: monto
      }).then(function(response){
        $('#loadLogo').hide();
        for (var i in $scope.montos) {
          if ($scope.montos[i]._id === response.data._id) {
            $scope.montos.splice(i, 1);
          }
        }
        $scope.montos.push(response.data);
        $scope.falseForm();
        new PNotify({
          text: 'Registro actualizado con éxito',
          styling: 'bootstrap3',
          type: 'success'
        })
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.createCategoria = function(categoria){
      $('#loadLogo').show();
      $http({
        method: 'POST',
        url: '/api/categorias',
        data: categoria
      }).then(function(response){
        $('#loadLogo').hide();
        $scope.categorias.push(response.data);
        $scope.ver(response.data);
        new PNotify({
          text: 'La categoría se ha creado correctamente',
          styling: 'bootstrap3',
          type: 'success'
        })
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.initEditCategoria = function(categoria){

      $scope.newCategoria = {
        _id: categoria._id,
        nombre: categoria.nombre
      }

      $scope.formEditCategoria = true;

    }

    $scope.updateCategoria = function(){
      $('#loadLogo').show();
      $http({
        method: 'PUT',
        url: '/api/categorias/' + $scope.newCategoria._id,
        data: $scope.newCategoria
      }).then(function(response){
        $('#loadLogo').hide();
        for (var i in $scope.categorias) {
          if ($scope.categorias[i]._id === response.data._id) {
            $scope.categorias.splice(i, 1);
          }
        }
        $scope.categorias.push(response.data);
        $scope.ver(response.data);
        $scope.formEditCategoria = false;
        new PNotify({
          text: 'La categoría se ha actualizado correctamente',
          styling: 'bootstrap3',
          type: 'success'
        })
      }, function(errorResponse){
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    $scope.deleteCategoria = function(categoria){

      (new PNotify({
          title: 'Confirmación',
          text: '¿Desea eliminar esta Categoría?',
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
          url: '/api/deleteMontosCategoriasByCategoria/' + categoria._id
        }).then(function(response){
          $('#loadLogo').hide();
          $('#loadLogo').show();
          $http({
            method: 'DELETE',
            url: '/api/categorias/'+ categoria._id
          }).then(function(response){
            $('#loadLogo').hide();
            for (var i in $scope.categorias) {
              if ($scope.categorias[i]._id === categoria._id) {
                $scope.categorias.splice(i, 1);
              }
            }
            $scope.categoria = {};
            new PNotify({
              text: 'La categoría se ha eliminado correctamente',
              styling: 'bootstrap3',
              type: 'success'
            });
          }, function(errorResponse){
            $('#loadLogo').hide();
            mostrarNotificacion(errorResponse.data.message);
          })
        }, function(errorResponse){
          $('#loadLogo').hide();
          mostrarNotificacion(errorResponse.data.message);
        })

      }).on('pnotify.cancel', function() {
      });

    }

  }
]);
