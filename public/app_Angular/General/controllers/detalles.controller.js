'use strict';

angular.module('general').controller('DetallesController', ['$scope','$http','$routeParams','$location','Caja_Detalles',
  function($scope, $http, $routeParams, $location, Caja_Detalles) {

    var inicializarAnexoRetencion = function(){
      $scope.detalle.anexo.ret_establecimiento = '';
      $scope.detalle.anexo.ret_puntoEmision = '';
      $scope.detalle.anexo.ret_secuencia = '';
      $scope.detalle.anexo.ret_autorizacion = '';
      $scope.detalle.anexo.retencionIVABienes = 0;
      $scope.detalle.anexo.retencionSubTotalBienes = 0;
      $scope.detalle.anexo.retencionIVAServicios = 0;
      $scope.detalle.anexo.retencionSubTotalServicios = 0;
      $scope.detalle.anexo.totalRetencion = 0;
      $scope.detalle.anexo.selectRetencion = '';
    }

    $scope.actualizarDatos = function() {
      if($scope.detalle.tipo=='factura'){
        $scope.updateTotal();
        $scope.detalle.valor = '';
      }
      if($scope.detalle.tipo=='vale'){
        $scope.detalle.anexo.proveedor = '';
        $scope.detalle.anexo.fac_establecimiento = '';
        $scope.detalle.anexo.fac_puntoEmision = '';
        $scope.detalle.anexo.fac_secuencia = '';
        $scope.detalle.anexo.fac_autorizacion = '';
        $scope.detalle.anexo.retencion = false;
        $scope.detalle.anexo.noObjetoIVA=false;
        inicializarAnexoRetencion();
        $scope.detalle.anexo.subTotal = '';
        $scope.detalle.anexo.iva = '';
        $scope.detalle.valor = '';
      }
    }



    $scope.updateTotal = function (){
      if($scope.detalle.anexo.noObjetoIVA){
        $scope.detalle.anexo.iva = 0;
      } else {
        $scope.detalle.anexo.iva = Number($scope.detalle.anexo.subTotal)*12/100;
      }

      $scope.detalle.anexo.total = $scope.detalle.anexo.iva + Number($scope.detalle.anexo.subTotal);
      if($scope.detalle.anexo.retencion){
        if($scope.detalle.anexo.selectRetencion=='1-30'){

          $scope.primerPorc = 1;
          $scope.segundoPorc = 30;

          $scope.detalle.anexo.retencionSubTotalBienes = Number($scope.detalle.anexo.subTotal)*Number($scope.primerPorc)/100;
          $scope.detalle.anexo.retencionIVABienes = Number($scope.detalle.anexo.iva)*Number($scope.segundoPorc)/100;

          $scope.detalle.anexo.retencionSubTotalServicios = 0;
          $scope.detalle.anexo.retencionIVAServicios = 0;

          $scope.detalle.anexo.totalRetencion = Number($scope.detalle.anexo.retencionSubTotalBienes) + Number($scope.detalle.anexo.retencionIVABienes);
        }
        if($scope.detalle.anexo.selectRetencion=='2-70'){
          $scope.primerPorc = 2;
          $scope.segundoPorc = 70;

          $scope.detalle.anexo.retencionSubTotalBienes = 0;
          $scope.detalle.anexo.retencionIVABienes = 0;

          $scope.detalle.anexo.retencionSubTotalServicios = Number($scope.detalle.anexo.subTotal)*Number($scope.primerPorc)/100;
          $scope.detalle.anexo.retencionIVAServicios = Number($scope.detalle.anexo.iva)*Number($scope.segundoPorc)/100;

          $scope.detalle.anexo.totalRetencion = Number($scope.detalle.anexo.retencionSubTotalServicios) + Number($scope.detalle.anexo.retencionIVAServicios);
        }
        if($scope.detalle.anexo.selectRetencion=='1'){
          $scope.primerPorc = 1;

          $scope.detalle.anexo.retencionSubTotalBienes = Number($scope.detalle.anexo.subTotal)*Number($scope.primerPorc)/100;
          $scope.detalle.anexo.retencionIVABienes = 0;

          $scope.detalle.anexo.retencionSubTotalServicios = 0;
          $scope.detalle.anexo.retencionIVAServicios = 0;

          $scope.detalle.anexo.totalRetencion = Number($scope.detalle.anexo.retencionSubTotalBienes);
        }
        if($scope.detalle.anexo.selectRetencion=='2'){
          $scope.primerPorc = 2;

          $scope.detalle.anexo.retencionSubTotalBienes = 0;
          $scope.detalle.anexo.retencionIVABienes = 0;

          $scope.detalle.anexo.retencionSubTotalServicios = Number($scope.detalle.anexo.subTotal)*Number($scope.primerPorc)/100;
          $scope.detalle.anexo.retencionIVAServicios = 0;

          $scope.detalle.anexo.totalRetencion = Number($scope.detalle.anexo.retencionSubTotalServicios)
        }
        $scope.detalle.valor = Number($scope.detalle.anexo.total) - Number($scope.detalle.anexo.totalRetencion);

      } else {
        inicializarAnexoRetencion();
        $scope.detalle.valor = $scope.detalle.anexo.total;
      }
    }
    var updateTotal = function() {
      $scope.updateTotal();
    }

    var actualizarProveedores = function(){
      $http({
        method: 'GET',
        url: '/api/proveedores'
      }).then(function(proveedores){
        $scope.proveedores = proveedores.data;
      }, function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
      })
    }

    var actualizarSucursales = function() {
      $http({
        method: 'GET',
        url: '/api/sucursales/'
      }).then(function(sucursales){
        $scope.sucursales = sucursales.data;
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    }

    var actualizarCategorias = function() {
      $http({
        method: 'GET',
        url: '/api/categorias/'
      }).then(function(categorias){
        $scope.categorias = categorias.data;
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    }

    $scope.initForm = function(){
      actualizarSucursales();
      actualizarCategorias();
      actualizarProveedores();
    }

    // Control de paneles
    $scope.PanelViewDetalle = false;
    $scope.PanelEditDetalle = false;
    $scope.PanelCreateDetalle = false;
    $scope.PanelTableDetalles = true;



    var showPanelCreateDetalle = function(){
      $scope.PanelViewDetalle = false;
      $scope.PanelEditDetalle = false;
      $scope.PanelCreateDetalle = true;
    }
    var showPanelEditDetalle = function(){
      $scope.PanelViewDetalle = false;
      $scope.PanelEditDetalle = true;
      $scope.PanelCreateDetalle = false;
    }
    var showPanelViewDetalle =function(){
      $scope.PanelViewDetalle = true;
      $scope.PanelEditDetalle = false;
      $scope.PanelCreateDetalle = false;
    }
    var showPanelTableDetalles = function(){
      $scope.PanelViewDetalle = false;
      $scope.PanelEditDetalle = false;
      $scope.PanelCreateDetalle = false;
    }

    $scope.showPanelCreateDetalle = function(){
      showPanelCreateDetalle();
      $scope.detalle = {};
      $scope.detalle.anexo = {};
      $scope.detalle.tipo = 'factura';
    }

    $scope.showPanelViewDetalle = function(detalle){
      showPanelViewDetalle();
      $scope.detalle = detalle;
      $scope.detalle.fecha = new Date(detalle.fecha);
    }

    $scope.showPanelEditDetalle = function(detalle){
      $scope.valorPrevio = detalle.valor;
      $scope.detalle = detalle;
      $scope.detalle.fecha = new Date(detalle.fecha);
      showPanelEditDetalle();
    }
    $scope.showPanelTableDetalles = function(){
      showPanelTableDetalles();
    }

    // Funciones CRUD
    $scope.findByCaja = function(){
      var idCaja = Caja_Detalles.getIdCaja();
      $http({
        method: 'GET',
        url: '/api/detallesByCaja/' + idCaja
      }).then(function(detalles){
        $scope.detalles = detalles.data;
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    var validaciones = function(){


      if(Number($scope.detalle.valor) == 0){
        mostrarNotificacion('Ingrese el valor del detalle');
      } else {
        if($scope.detalle.tipo == 'factura'){
          if(!$scope.detalle.anexo.fac_establecimiento){
            mostrarNotificacion('Ingrese el número de establecimiento de la factura');
          } else {
            if(!$scope.detalle.anexo.fac_puntoEmision){
              mostrarNotificacion('Ingrese el número de emisión de la factura');
            }else{
              if(!$scope.detalle.anexo.fac_secuencia){
                mostrarNotificacion('Ingrese el número de secuencia de la factura');
              }else{
                if(!$scope.detalle.anexo.fac_autorizacion){
                  mostrarNotificacion('Ingrese el número de autorización de la factura');
                }else{
                  if(!$scope.detalle.anexo.proveedor){
                    mostrarNotificacion('Seleccione un proveedor');
                  }else{
                    if(!$scope.detalle.anexo.subTotal){
                      mostrarNotificacion('Ingrese el subtotal de la factura');
                    }else{
                      if($scope.detalle.anexo.retencion){
                        if(!$scope.detalle.anexo.ret_establecimiento){
                          mostrarNotificacion('Ingrese el número de establecimiento de la retención');
                        }else{
                          if(!$scope.detalle.anexo.ret_puntoEmision){
                            mostrarNotificacion('Ingrese el número de emisión de la retención');
                          }else{
                            if(!$scope.detalle.anexo.ret_secuencia){
                              mostrarNotificacion('Ingrese el número de secuencia de la retención');
                            }else{
                              if(!$scope.detalle.anexo.ret_autorizacion){
                                mostrarNotificacion('Ingrese el número de autorización de la retención');
                              }else{
                                if(!$scope.detalle.anexo.selectRetencion || $scope.detalle.anexo.selectRetencion == ''){
                                  mostrarNotificacion('Seleccione el porcentaje de retención');
                                }else{
                                  return true;
                                }
                              }
                            }
                          }
                        }
                      }else{
                        return true;
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          return true;
        }
      };
      return false;
    }

    $scope.create = function() {
      if(validaciones()){
        var idCaja = Caja_Detalles.getIdCaja();
        $scope.detalle.caja = idCaja;

        $http({
          method: 'POST',
          url: '/api/detalles',
          data: $scope.detalle
        }).then(function(response){
          //Actualizar la Caja Chica
          $scope.caja.valor += response.data.valor;
          $scope.updateCaja();
          $scope.detalles.push(response.data);
          showPanelTableDetalles();
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });
      }
    };

    $scope.find = function() {

      $http({
        method: 'GET',
        url: '/api/detalles'
      }).then(function(response){
        $scope.detalles = response.data;
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });

    };

    $scope.findOne = function() {
      var idDetalle = $routeParams.detalleId;
      $http({
        method: 'GET',
        url: '/api/detalles/' + idDetalle
      }).then(function(response){
        $scope.detalle = response.data;
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
      });
    };

    $scope.update = function() {

      if(validaciones()){
        $http({
          method: 'PUT',
          url: '/api/detalles/' + $scope.detalle._id,
          data: $scope.detalle
        }).then(function(response){
          //Actualizar la Caja Chica
          $scope.caja.valor = Number($scope.caja.valor) - Number($scope.valorPrevio);
          $scope.caja.valor = Number($scope.caja.valor) + Number($scope.detalle.valor);
          $scope.updateCaja();

          showPanelTableDetalles();
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });
      }
    };

    $scope.delete = function(detalle) {
      if(detalle) {
        $http({
          method: 'DELETE',
          url: '/api/detalles/' + detalle._id
        }).then(function(){
          for (var i in $scope.detalles) {
            if ($scope.detalles[i] === detalle) {
              $scope.detalles.splice(i, 1);
            }
          }
          //Actualizar la Caja Chica
          $scope.caja.valor -= detalle.valor;
          $scope.updateCaja();
        },function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });
      } else {
        $http({
          method: 'DELETE',
          url: '/api/detalles/' + $scope.detalle._id
        }).then(function(detalle){
          //Actualizar la Caja Chica
          $scope.caja.valor -= detalle.valor;
          $scope.updateCaja();
          $location.path('detalles');
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
        });
      }
    };
  }
]);
