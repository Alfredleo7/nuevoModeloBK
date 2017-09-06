angular.module('super').controller('view_celda.controller', ['$scope','$http','$routeParams',
  function($scope, $http, $routeParams){

    var meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ]

    $scope.sucursal = $routeParams.sucursal;
    $scope.categoria = $routeParams.categoria;

    $('#loadLogo').show();
    $http({
      method: 'GET',
      url: '/api/detallesOfCelda/'+$routeParams.anio+'/'+$routeParams.mes+'/'+$routeParams.sucursal+'/'+$routeParams.categoria
    }).then(function(response){
      $('#loadLogo').hide();
      $scope.detalles = response.data;
      $scope.total = 0;
      for(var i in $scope.detalles){
        $scope.total = Number($scope.total) + Number($scope.detalles[i].valor);
      }
    }, function(errorResponse){
      $('#loadLogo').hide();
      console.log(errorResponse.data);
    })



    $scope.getDate = function(){
      return meses[$routeParams.mes-1] + '-' + $routeParams.anio;
    }
    $scope.getSucursal = function(){
      if($routeParams.sucursal != 'Todas'){
        return $routeParams.sucursal+' / '
      }
      return '';
    }
    $scope.getCategoria = function(){
      if($routeParams.categoria != 'Todas'){
        return $routeParams.categoria+' / '
      }
      return '';
    }

  }
])
