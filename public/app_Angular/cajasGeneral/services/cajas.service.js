'use strict';

angular.module('general')
  .factory('Cajas', ['$resource', function($resource){
    return $resource('api/cajas/:cajaId', {
      cajaId: '@_id'
    }/*, {
      update: {
        method: 'PUT'
      }
    }*/);
  }])
  .factory('Detalles', ['$resource', function($resource){
    return $resource('api/detalles/:detalleId', {
      detalleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }])
  .service('Caja_Detalles',[function(){
    var IdCaja;
    return {
      getIdCaja: function () {
        return IdCaja;
      },
      setIdCaja: function (id) {
        IdCaja = id;
      }
    };
  }]);
