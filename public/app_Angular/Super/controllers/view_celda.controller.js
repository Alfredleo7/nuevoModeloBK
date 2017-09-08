angular.module('super').controller('view_celda.controller', ['$scope','$http','$routeParams',
  function($scope, $http, $routeParams){

    $scope.reverse = false;
    $scope.field = 'fecha';
    $scope.onFiltro = function(field){
      $scope.reverse = !$scope.reverse;
      $scope.field = field;
    }

    $scope.today = new Date();

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
      console.log(response.data);
      $('#loadLogo').hide();
      $scope.detalles = response.data;
      $scope.total = 0;
      for(var i in $scope.detalles){
        $scope.total = Number($scope.total) + Number($scope.detalles[i].valor);
      }
    }, function(errorResponse){
      $('#loadLogo').hide();
      mostrarNotificacion(errorResponse.data.message);
    })

    $scope.back = function(){
      window.history.back();
    }

    $scope.printDiv = function(IdDiv){
      var divToPrint = jQuery(IdDiv).html();
      var newWin = window.open('', 'my div','left=0,top=0,width=5000,height=5000,toolbar=1,resizable=0');

      var fecha = new Date();
      var mes = Number(fecha.getMonth()) + 1;
      var fechaTitle = fecha.getDate()+'-'+mes+'-'+fecha.getFullYear();

      newWin.document.write('<html><head><title>Reporte '+fechaTitle+'</title>');
      newWin.document.write('<link href="/css/bootstrap.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/css/print.css" rel="stylesheet">');
      newWin.document.write('</head><body>');
      newWin.document.write(divToPrint);
      newWin.document.write('</body>');
      newWin.document.write('<script type="text/javascript">');
      newWin.document.write('window.print();');
      newWin.document.write('window.close();');
      newWin.document.write('</script>');
      newWin.document.write('</html>');
    };



    $scope.getDate = function(){
      return meses[$routeParams.mes-1] + '/' + $routeParams.anio;
    }
    $scope.getSucursal = function(){
      if($routeParams.sucursal != 'Todas'){
        return $routeParams.sucursal+' - '
      }
      return '';
    }
    $scope.getCategoria = function(){
      if($routeParams.categoria != 'Todas'){
        return $routeParams.categoria+' - '
      }
      return '';
    }

    //---Modal Detalle
    $scope.getDetalle = function(detalle){
      $scope.detalle = detalle;
    }
  }
])
