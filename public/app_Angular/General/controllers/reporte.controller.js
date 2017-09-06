'use strict';

angular.module('general').controller('reporte.controller', ['$scope','$http',
  function($scope,$http){

    $scope.anios = []
    $scope.filtroAnio = {};
    $scope.categorias = [];
    $scope.montos = [];

    $('#loadLogo').show();
    $http({
      method: 'GET',
      url: '/api/aniosDetalleBySucursal'
    }).then(function(response){
      $('#loadLogo').hide();
      $scope.anios = response.data;
      $scope.filtroAnio = $scope.anios[$scope.anios.length - 1]._id;
      $scope.getReporte();
    }, function(errorResponse){
      $('#loadLogo').hide();
      console.log(errorResponse.data);
    })

    $('#loadLogo').show();
    $http({
      method: 'GET',
      url: '/api/montoBySucursalSession'
    }).then(function(response){
      $('#loadLogo').hide();
      $scope.montos = response.data;
    }, function(errorResponse){
      $('#loadLogo').hide();
      console.log(response.data);
    })

    $('#loadLogo').show();
    $http({
      method: 'GET',
      url: '/api/Credencial'
    }).then(function(response){
      $('#loadLogo').hide();
      $scope.usuario = response.data;
    }, function(errorResponse){
      $('#loadLogo').hide();
      console.log(errorResponse.data);
    })

    $scope.getReporte = function(){
      var categoria;
      var mes;
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/DetallesBySucursal/'+$scope.filtroAnio
      }).then(function(response){
        $('#loadLogo').hide();
        var totalCategoria;
        var indice;
        var _valor;
        $scope.totalMeses = new Array(12).fill(0);
        //Darle un formato manejable
        for(var i in response.data){
          categoria = {
            descripcion: response.data[i]._id,
            meses: new Array(13)
          };
          totalCategoria = 0;

          //Enviar cada valor al mes correspondiente
          for(var j in response.data[i].meses){
            indice = response.data[i].meses[j].mes-1;
            _valor = response.data[i].meses[j].total;
            categoria.meses[indice] = {
              valor: _valor
            };
            totalCategoria += _valor;
            $scope.totalMeses[indice] += _valor;
          }
          //Calcular el total de la categoria
          categoria.meses[12] = {
            valor: totalCategoria
          };
          //Agregar a la variable
          $scope.categorias.push(categoria);
        }
      }, function(errorResponse){
        $('#loadLogo').hide();
        console.log(errorResponse.data);
      })
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

    $scope.exportExcel = function (IdDiv) {
      var blob = new Blob([document.getElementById(IdDiv).innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        var fecha = new Date();
        var mes = Number(fecha.getMonth()) + 1;
        var fechaTitle = fecha.getDate()+'-'+mes+'-'+fecha.getFullYear();
        saveAs(blob, "Reporte "+ fechaTitle + ".xls");
    };

    $scope.getMonto = function(categoria){
      for(var i in $scope.montos){
        if($scope.montos[i].categoria == categoria){
          return $scope.montos[i].montoMax;
        }
      }
      return 0;
    }

    $scope.getSizeWithOutZeros = function(categoria){
      var size = -1 //categoria.meses tiene el valor total de los meses y no cuenta
      for(var i in categoria.meses){
        if(categoria.meses[i].valor != 0){
          size++;
        }
      }
      return size;
    }

  }
]);
