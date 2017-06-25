'use strict';

angular.module('general').controller('detalle.controller', ['$scope','$http','$routeParams','$location',
  function($scope,$http,$routeParams,$location){

    $scope.initCreate = function(){
      $('#loadLogo').show();
      $scope.detalle = {};
      $scope.detalle.tipo = 'factura';
      $scope.detalle.anexo = {};
      $('#loadLogo').hide();
      $scope.init();
    }

    $scope.initEdit = function(){
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/detalles/'+$routeParams.detalleId
      }).then(function(response){
        $scope.detalle = response.data;
        $scope.detalle.fecha = new Date(response.data.fecha);
        $scope.valorPrevio = $scope.detalle.valor;
        $('#loadLogo').hide();
        $scope.init();
      },function(errorResponse){
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      })
    }

    $scope.init = function(){
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

      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/sucursales/'
      }).then(function(sucursales){
        $scope.sucursales = sucursales.data;
        $('#loadLogo').hide();
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });

      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/categorias/'
      }).then(function(categorias){
        $scope.categorias = categorias.data;
        $('#loadLogo').hide();
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });

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
      $('#loadLogo').hide();
    };

    $scope.back = function(){
      $location.path('/caja/'+$routeParams.cajaId);
    };

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

    $scope.updateTotal = function (){

      /*$scope.detalle.anexo.iva = Number($scope.detalle.anexo.subTotalIva)*12/100;
      $scope.detalle.anexo.total = Number($scope.detalle.anexo.subTotal0) + Number($scope.detalle.anexo.subTotalIva) + Number($scope.detalle.anexo.iva);*/

      if($scope.detalle.anexo.subTotal0 || $scope.detalle.anexo.subTotalIva){
        if($scope.detalle.anexo.subTotal0 && !$scope.detalle.anexo.subTotalIva){
          $scope.detalle.anexo.iva = Number($scope.detalle.anexo.subTotalIva)*12/100;
          $scope.detalle.anexo.total = Number($scope.detalle.anexo.subTotal0);
        }
        if(!$scope.detalle.anexo.subTotal0 && $scope.detalle.anexo.subTotalIva){
          $scope.detalle.anexo.iva = Number($scope.detalle.anexo.subTotalIva)*12/100;
          $scope.detalle.anexo.total = Number($scope.detalle.anexo.subTotalIva) + Number($scope.detalle.anexo.iva);
        }
        if($scope.detalle.anexo.subTotal0 && $scope.detalle.anexo.subTotalIva){
          $scope.detalle.anexo.iva = Number($scope.detalle.anexo.subTotalIva)*12/100;
          $scope.detalle.anexo.total = Number($scope.detalle.anexo.subTotal0) + Number($scope.detalle.anexo.subTotalIva) + Number($scope.detalle.anexo.iva);
        }
      } else {
        $scope.detalle.anexo.iva = "";
        $scope.detalle.anexo.total = "";
      }

      if($scope.detalle.anexo.retencion){
        if($scope.detalle.anexo.selectRetencion=='1-30'){

          $scope.primerPorc = 1;
          $scope.segundoPorc = 30;

          $scope.detalle.anexo.retencionSubTotalBienes = Number($scope.detalle.anexo.subTotalIva)*Number($scope.primerPorc)/100;
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

          $scope.detalle.anexo.retencionSubTotalServicios = Number($scope.detalle.anexo.subTotalIva)*Number($scope.primerPorc)/100;
          $scope.detalle.anexo.retencionIVAServicios = Number($scope.detalle.anexo.iva)*Number($scope.segundoPorc)/100;

          $scope.detalle.anexo.totalRetencion = Number($scope.detalle.anexo.retencionSubTotalServicios) + Number($scope.detalle.anexo.retencionIVAServicios);
        }
        if($scope.detalle.anexo.selectRetencion=='1'){
          $scope.primerPorc = 1;

          $scope.detalle.anexo.retencionSubTotalBienes = Number($scope.detalle.anexo.subTotalIva)*Number($scope.primerPorc)/100;
          $scope.detalle.anexo.retencionIVABienes = 0;

          $scope.detalle.anexo.retencionSubTotalServicios = 0;
          $scope.detalle.anexo.retencionIVAServicios = 0;

          $scope.detalle.anexo.totalRetencion = Number($scope.detalle.anexo.retencionSubTotalBienes);
        }
        if($scope.detalle.anexo.selectRetencion=='2'){
          $scope.primerPorc = 2;

          $scope.detalle.anexo.retencionSubTotalBienes = 0;
          $scope.detalle.anexo.retencionIVABienes = 0;

          $scope.detalle.anexo.retencionSubTotalServicios = Number($scope.detalle.anexo.subTotalIva)*Number($scope.primerPorc)/100;
          $scope.detalle.anexo.retencionIVAServicios = 0;

          $scope.detalle.anexo.totalRetencion = Number($scope.detalle.anexo.retencionSubTotalServicios)
        }
        $scope.detalle.valor = Number($scope.detalle.anexo.total) - Number($scope.detalle.anexo.totalRetencion);

      } else {
        inicializarAnexoRetencion();
        $scope.detalle.valor = $scope.detalle.anexo.total;
      }
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
        $scope.detalle.anexo.subTotalIva = '';
        $scope.detalle.anexo.subTotal0 = '';
        $scope.detalle.anexo.iva = '';
        $scope.detalle.valor = '';
      }
      $scope.detalle.valor = '';
    }

    var validaciones = function(){


      if(Number($scope.detalle.valor) == 0){
        mostrarNotificacion('Ingrese el valor del detalle');
      } else {
        var today = new Date();
        if($scope.detalle.fecha > today){
          mostrarNotificacion('La factura no puede ser de una fecha superior a la actual');
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
                      if(false/*!$scope.detalle.anexo.subTotal*/){
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
        }
      };
      return false;
    }

    $scope.create = function() {

      if(validaciones()){
        $scope.detalle.caja = $scope.caja._id;
        $('#loadLogo').show();
        $http({
          method: 'POST',
          url: '/api/detalles',
          data: $scope.detalle
        }).then(function(response){
          $scope.back();
          $('#loadLogo').hide();
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
          $('#loadLogo').hide();
        });
      }

    };

    $scope.update = function() {

      if(validaciones()){
        $('#loadLogo').show();
        $http({
          method: 'PUT',
          url: '/api/detalles/' + $scope.detalle._id,
          data: $scope.detalle
        }).then(function(response){

          /*$http({
            method: 'PUT',
            url: '/api/cajas/' + $scope.caja._id,
            data: $scope.caja
          }).then(function(response){
            $scope.back();
          },function(errorResponse) {
            mostrarNotificacion(errorResponse.data.message);
          });*/
          $scope.back();
          $('#loadLogo').hide();
        }, function(errorResponse) {
          mostrarNotificacion(errorResponse.data.message);
          $('#loadLogo').hide();
        });
      }

    };

    $scope.asignar = function(proveedor){

      $scope.detalle.anexo.proveedor = proveedor;
      $('.modalProveedores').modal('hide');

    };

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
            $scope.detalle.anexo.proveedor = response.data;
            $scope.proveedores.push(response.data);
            $('.modalProveedores').modal('hide');
            $('#loadLogo').hide();
            return false;
          }, function(errorResponse) {
            mostrarNotificacion(errorResponse.data.message);
            $('#loadLogo').hide();
            return true;
          })
        } else {
          mostrarNotificacion('Ingrese un RUC o una cédula');
          return true;
        }
      } else {
        mostrarNotificacion('Ingrese los datos');
        return true;
      }

    }

  }
]);