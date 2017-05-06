'use strict';

angular.module('detalles').factory('Detalles', ['$resource', function($resource){
  return $resource('api/detalles/:detalleId', {
    detalleId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);
