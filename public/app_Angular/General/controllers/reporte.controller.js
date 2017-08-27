'use strict';

angular.module('general').controller('reporte.controller', ['$scope','$http',
  function($scope,$http){

    $scope.anios = []
    $scope.filtroAnio = {};
    $scope.categorias = [];

    $http({
      method: 'GET',
      url: '/api/aniosDetalleBySucursal'
    }).then(function(response){
      $scope.anios = response.data;
      $scope.filtroAnio = $scope.anios[$scope.anios.length - 1]._id;
      $scope.getReporte();
    }, function(errorResponse){
      console.log(errorResponse.data);
    })

    $http({
      method: 'GET',
      url: '/api/Credencial'
    }).then(function(response){
      $scope.usuario = response.data;
    }, function(errorResponse){
      console.log(errorResponse.data);
    })

    $scope.getReporte = function(){
      var categoria;
      var mes;
      $http({
        method: 'GET',
        url: '/api/DetallesBySucursal/'+$scope.filtroAnio
      }).then(function(response){
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
        console.log(errorResponse.data);
      })
    }

    $scope.printDiv = function(IdDiv){

      var divToPrint = jQuery(IdDiv).html();
      var newWin = window.open('', 'my div');

      var fecha = new Date();
      var mes = Number(fecha.getMonth()) + 1;
      var fechaTitle = fecha.getDate()+'-'+mes+'-'+fecha.getFullYear();

      newWin.document.write('<html><head><title>Reporte '+fechaTitle+'</title>');
      newWin.document.write('<link href="/css/bootstrap.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/css/print.css" rel="stylesheet">');
      newWin.document.write('</head><body onload="window.print()">');
      newWin.document.write(divToPrint);
      newWin.document.write('</body>');
      newWin.document.write('</html>');
      newWin.document.close();
      setTimeout(function(){newWin.close();},250);

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

  }
]);
