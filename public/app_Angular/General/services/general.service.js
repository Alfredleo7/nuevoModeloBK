'use strict';

angular.module('general')
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
