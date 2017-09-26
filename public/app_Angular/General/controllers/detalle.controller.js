'use strict';

angular.module('general').controller('detalle.controller', ['$scope','$http','$routeParams','$location','localStorageService',
  function($scope,$http,$routeParams,$location, localStorageService){

    if(!localStorageService.get('retenciones')){
      localStorageService.set('retenciones', []);
    }

    $scope.retenciones = localStorageService.get('retenciones');

    $scope.verificarRetenciones = function(retencion){
      var esta = false;
      for(var i in $scope.retenciones){
        if(retencion == $scope.retenciones[i].number){
          esta = true;
          break;
        }
      }
      if(!esta){
        $scope.retenciones.push({
          number: retencion
        })
        localStorageService.set('retenciones', $scope.retenciones);
      }
    }

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
        $scope.detalle.cargado = $scope.caja.sucursal.nombre;
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

      $scope.baseCeroMaBaseDoce = 0;

      if($scope.detalle.anexo.subTotal0 || $scope.detalle.anexo.subTotalIva || $scope.detalle.anexo.tasasYPropinas){
        $scope.detalle.anexo.total = 0;
        if($scope.detalle.anexo.subTotal0 && !$scope.detalle.anexo.subTotalIva){
          $scope.detalle.anexo.iva = Number((Number($scope.detalle.anexo.subTotalIva)*12/100).toFixed(2));
          $scope.detalle.anexo.total = Number((Number($scope.detalle.anexo.subTotal0)).toFixed(2));
          $scope.baseCeroMaBaseDoce = Number((Number($scope.detalle.anexo.subTotal0)).toFixed(2));
        }
        if(!$scope.detalle.anexo.subTotal0 && $scope.detalle.anexo.subTotalIva){
          $scope.detalle.anexo.iva = Number(Number(Number(Number($scope.detalle.anexo.subTotalIva).toFixed(2))*12/100).toFixed(2));
          $scope.detalle.anexo.total = Number(Number((Number(Number($scope.detalle.anexo.subTotalIva).toFixed(2)) + Number($scope.detalle.anexo.iva)).toFixed(2)).toFixed(2));
          $scope.baseCeroMaBaseDoce = Number(Number($scope.detalle.anexo.subTotalIva).toFixed(2));
        }
        if($scope.detalle.anexo.subTotal0 && $scope.detalle.anexo.subTotalIva){
          $scope.detalle.anexo.iva = Number((Number($scope.detalle.anexo.subTotalIva)*12/100).toFixed(2));
          $scope.detalle.anexo.total = Number((Number(Number($scope.detalle.anexo.subTotal0).toFixed(2)) + Number(Number($scope.detalle.anexo.subTotalIva).toFixed(2)) + Number(Number($scope.detalle.anexo.iva).toFixed(2))).toFixed(2));
          $scope.baseCeroMaBaseDoce = Number((Number(Number($scope.detalle.anexo.subTotalIva).toFixed(2)) + Number(Number($scope.detalle.anexo.subTotal0).toFixed(2))).toFixed(2));
        }

        if($scope.detalle.anexo.tasasYPropinas){
          $scope.detalle.anexo.total = Number(Number(Number($scope.detalle.anexo.total).toFixed(2))+Number(Number($scope.detalle.anexo.tasasYPropinas).toFixed(2)));
        }

      } else {
        $scope.detalle.anexo.iva = "";
        $scope.detalle.anexo.total = "";
      }

      if($scope.detalle.anexo.retencion){
        if($scope.detalle.anexo.selectRetencion=='1-30'){

          $scope.primerPorc = 1;
          $scope.segundoPorc = 30;

          $scope.detalle.anexo.retencionSubTotalBienes = Number((Number($scope.baseCeroMaBaseDoce)*Number($scope.primerPorc)/100).toFixed(2));
          $scope.detalle.anexo.retencionIVABienes = Number((Number($scope.detalle.anexo.iva)*Number($scope.segundoPorc)/100).toFixed(2));

          $scope.detalle.anexo.retencionSubTotalServicios = 0;
          $scope.detalle.anexo.retencionIVAServicios = 0;

          $scope.detalle.anexo.retencionSubTotalOcho = 0;
          $scope.detalle.anexo.retencionIVAcien = 0;

          $scope.detalle.anexo.totalRetencion = Number((Number($scope.detalle.anexo.retencionSubTotalBienes) + Number($scope.detalle.anexo.retencionIVABienes)).toFixed(2));
        }
        if($scope.detalle.anexo.selectRetencion=='2-70'){
          $scope.primerPorc = 2;
          $scope.segundoPorc = 70;

          $scope.detalle.anexo.retencionSubTotalBienes = 0;
          $scope.detalle.anexo.retencionIVABienes = 0;

          $scope.detalle.anexo.retencionSubTotalOcho = 0;
          $scope.detalle.anexo.retencionIVAcien = 0;

          $scope.detalle.anexo.retencionSubTotalServicios = Number(Number(Number((Number($scope.baseCeroMaBaseDoce)*$scope.primerPorc).toFixed(2))/100).toFixed(2));
          $scope.detalle.anexo.retencionIVAServicios = Number((Number($scope.detalle.anexo.iva)*Number($scope.segundoPorc)/100).toFixed(2));

          $scope.detalle.anexo.totalRetencion = Number((Number($scope.detalle.anexo.retencionSubTotalServicios) + Number($scope.detalle.anexo.retencionIVAServicios)).toFixed(2));
        }
        if($scope.detalle.anexo.selectRetencion=='8-100'){
          $scope.primerPorc = 8;
          $scope.segundoPorc = 100;

          $scope.detalle.anexo.retencionSubTotalBienes = 0;
          $scope.detalle.anexo.retencionIVABienes = 0;

          $scope.detalle.anexo.retencionSubTotalServicios = 0;
          $scope.detalle.anexo.retencionIVAServicios = 0;

          $scope.detalle.anexo.retencionSubTotalOcho = Number(Number(Number((Number($scope.baseCeroMaBaseDoce)*$scope.primerPorc).toFixed(2))/100).toFixed(2));
          $scope.detalle.anexo.retencionIVAcien = Number((Number($scope.detalle.anexo.iva)*Number($scope.segundoPorc)/100).toFixed(2));

          $scope.detalle.anexo.totalRetencion = Number((Number($scope.detalle.anexo.retencionSubTotalOcho) + Number($scope.detalle.anexo.retencionIVAcien)).toFixed(2));
        }
        if($scope.detalle.anexo.selectRetencion=='1'){
          $scope.primerPorc = 1;

          $scope.detalle.anexo.retencionSubTotalBienes = Number((Number($scope.baseCeroMaBaseDoce)*Number($scope.primerPorc)/100).toFixed(2));
          $scope.detalle.anexo.retencionIVABienes = 0;

          $scope.detalle.anexo.retencionSubTotalServicios = 0;
          $scope.detalle.anexo.retencionIVAServicios = 0;

          $scope.detalle.anexo.retencionSubTotalOcho = 0;
          $scope.detalle.anexo.retencionIVAcien = 0;

          $scope.detalle.anexo.totalRetencion = Number($scope.detalle.anexo.retencionSubTotalBienes);
        }
        if($scope.detalle.anexo.selectRetencion=='2'){
          $scope.primerPorc = 2;

          $scope.detalle.anexo.retencionSubTotalBienes = 0;
          $scope.detalle.anexo.retencionIVABienes = 0;

          $scope.detalle.anexo.retencionSubTotalOcho = 0;
          $scope.detalle.anexo.retencionIVAcien = 0;

          $scope.detalle.anexo.retencionSubTotalServicios = Number((Number($scope.baseCeroMaBaseDoce)*Number($scope.primerPorc)/100).toFixed(2));
          $scope.detalle.anexo.retencionIVAServicios = 0;

          $scope.detalle.anexo.totalRetencion = Number($scope.detalle.anexo.retencionSubTotalServicios);
        }
        if($scope.detalle.anexo.selectRetencion=='8'){
          $scope.primerPorc = 8;

          $scope.detalle.anexo.retencionSubTotalBienes = 0;
          $scope.detalle.anexo.retencionIVABienes = 0;

          $scope.detalle.anexo.retencionSubTotalOcho = Number((Number($scope.baseCeroMaBaseDoce)*Number($scope.primerPorc)/100).toFixed(2));
          $scope.detalle.anexo.retencionIVAcien = 0;

          $scope.detalle.anexo.retencionSubTotalServicios = 0;
          $scope.detalle.anexo.retencionIVAServicios = 0;

          $scope.detalle.anexo.totalRetencion = Number($scope.detalle.anexo.retencionSubTotalOcho);
        }
        $scope.detalle.valor = Number((Number($scope.detalle.anexo.total) - Number($scope.detalle.anexo.totalRetencion)).toFixed(2));

      } else {
        inicializarAnexoRetencion();
        $scope.detalle.valor = $scope.detalle.anexo.total;
      }
    }

    function removeToMonth( date, months ) {
        var d = new Date( date || new Date() );
        d.setMonth( d.getMonth() - (months || 0), d.getDate());
        return d;
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
        var mesAntes = removeToMonth(today, 1);
        if($scope.detalle.fecha > today || $scope.detalle.fecha < mesAntes){
          var diaAntes = mesAntes.getDate()+1;
          var mes_Antes = mesAntes.getMonth()+1;
          var diaAct = today.getDate();
          var mesAct = today.getMonth()+1;
          mostrarNotificacion('Fecha inválida, solo fecha entre el '+diaAntes+'-'+mes_Antes+'-'+mesAntes.getFullYear()+' y el '+diaAct+'-'+mesAct+'-'+today.getFullYear());
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
            if($scope.detalle.cargado == '' || !$scope.detalle.cargado){
              mostrarNotificacion('El campo cargado es requerido');
            } else {
              if($scope.detalle.categoria == '' || !$scope.detalle.categoria){
                mostrarNotificacion('El campo categoria es requerido');
              } else {
                if(!$scope.detalle.fecha){
                  mostrarNotificacion('La fecha es obligatoria');
                } else {
                  if(!$scope.detalle.entregado){
                    mostrarNotificacion('El campo entregado es requerido');
                  } else {
                    return true;
                  }
                }
              }
            }
          }
        }
      };
      return false;
    }

    var guardarDetalle = function(){
      if($scope.detalle.tipo == 'factura'){
        if($scope.detalle.anexo.retencion){
          $scope.verificarRetenciones($scope.detalle.anexo.ret_autorizacion);
        }
      }
      $('#loadLogo').show();
      $http({
        method: 'POST',
        url: '/api/detalles',
        data: $scope.detalle
      }).then(function(response){
        $scope.back();
        new PNotify({
          text: 'Se ha agregado correctamente',
          styling: 'bootstrap3',
          type: 'success'
        });
        $('#loadLogo').hide();
      }, function(errorResponse) {
        mostrarNotificacion(errorResponse.data.message);
        $('#loadLogo').hide();
      });
    }

    $scope.create = function() {

      if(validaciones()){
        $scope.detalle.caja = $scope.caja._id;
        $('#loadLogo').show();

        $http({
          method: 'GET',
          url: '/api/montoBySucursalCategoria/'+$scope.detalle.cargado+'/'+$scope.detalle.categoria
        }).then(function(response){
          $('#loadLogo').hide();
          var montoMax = response.data.monto;
          if(montoMax == 0){
            guardarDetalle();
          } else {
            if(montoMax > 0){
              $http({
                method: 'GET',
                url: '/api/valorXMesSucursalCategoria/'+$scope.detalle.cargado+'/'+$scope.detalle.categoria+'/'+$scope.detalle.fecha.getMonth()+'/'+$scope.detalle.fecha.getFullYear()
              }).then(function(response){
                var total = Number(response.data.acumuladoMes) + Number($scope.detalle.valor)
                if(total >= montoMax){


                  (new PNotify({
                      title: 'Confirmación',
                      text: 'El Total sobrepasa el monto disponible en $'+Number(total-montoMax)+'<br>¿Desea registrarlo de todas formas?',
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

                    guardarDetalle();

                  }).on('pnotify.cancel', function() {
                  });

                } else {
                  guardarDetalle();
                }

              }, function(errorResponse){
                $('#loadLogo').hide();
                mostrarNotificacion(errorResponse.data.message);
              })
            }
          }
        }, function(errorResponse){
          $('#loadLogo').hide();
          mostrarNotificacion(errorResponse.data.message);
        })

        /*$http({
          method: 'GET',
          url: '/api/valorXMesSucursalCategoria/'+$scope.detalle.cargado+'/'+$scope.detalle.categoria+'/'+$scope.detalle.fecha.getMonth()+'/'+$scope.detalle.fecha.getFullYear()
        }).then(function(response){
          console.log(response.data);
        })*/
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
            console.log('guardado');
            $scope.detalle.anexo.proveedor = response.data;
            $scope.proveedores.push(response.data);
            $('.modalNewProveedor').modal('hide');
            $('#loadLogo').hide();
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



  }
]);
