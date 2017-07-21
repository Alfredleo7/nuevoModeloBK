'use strict';

angular.module('administrador').controller('reporte-sucursal.controller', ['$scope','$http', '$location',
  function($scope, $http, $location){


    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

    $scope.init = function(){

      $scope.today = new Date();
      $scope.filtro = {};
      $('#loadLogo').show();
      $http({
        method: 'GET',
        url: '/api/aniosDetalles'
      }).then(function(anios){
        $scope.anios = anios.data;
        $scope.filtro.anio = anios.data[anios.data.length-1]._id;
        $scope.updateCategorias();
        $('#loadLogo').hide();
      }, function(errorResponse) {
        $('#loadLogo').hide();
        mostrarNotificacion(errorResponse.data.message);
      });

    }

    $scope.updateCategorias = function(){
      if($scope.filtro.anio != ''){
        $('#loadLogo').show();
        $http({
          method: 'GET',
          url: '/api/categoriasXYear/'+ $scope.filtro.anio
        }).then(function(categorias){
          $scope.categorias = categorias.data;
          $scope.filtro.categoria = 'Todas';
          $scope.generarReporte();
          $('#loadLogo').hide();
        }, function(errorResponse) {
          $('#loadLogo').hide();
          mostrarNotificacion(errorResponse.data.message);
        });
      }
    };

    $scope.printDiv = function(IdDiv, tipo){

      var divToPrint = jQuery(IdDiv).html();
      var newWin = window.open('', 'my div');

      var fecha = new Date();
      var fechaTitle = fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear();

      newWin.document.write('<html><head><title>Reporte por '+tipo+' '+fechaTitle+'</title>');
      newWin.document.write('<link href="/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">');
      newWin.document.write('<link href="/css/print.css" rel="stylesheet">');
      newWin.document.write('</head><body onload="window.print()">');
      newWin.document.write(divToPrint);
      newWin.document.write('</body>');
      newWin.document.write('</html>');
      newWin.document.close();
      setTimeout(function () { newWin.close(); }, 3000);
    };

    $scope.exportExcel = function (IdDiv, tipo) {
      var blob = new Blob([document.getElementById(IdDiv).innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        var fecha = new Date();
        var mes = Number(fecha.getMonth()) + 1;
        var fechaTitle = fecha.getDate()+'-'+mes+'-'+fecha.getFullYear();
        saveAs(blob, "Reporte por "+tipo+" "+ fechaTitle + ".xls");
    };

    $scope.generarReporte = function(){

      $scope.tabla = [];
      $scope.graficos= [];
      $('#loadLogo').show();
      $http({
        method: 'POST',
        url: '/api/reporteXSucursal',
        data: $scope.filtro
      }).then(function(response){
        $scope.reportes = response.data;
        $scope.Ene = 0; $scope.Feb = 0; $scope.Mar = 0; $scope.Abr = 0; $scope.May = 0; $scope.Jun = 0; $scope.Jul = 0; $scope.Ago = 0; $scope.Sep = 0; $scope.Oct = 0; $scope.Nov = 0; $scope.Dic = 0;
        for(var i in response.data){
          var fila = {};
          fila.sucursal = response.data[i]._id;
          fila.ene = 0;fila.feb = 0;fila.mar = 0;fila.abr = 0;fila.may = 0;fila.jun = 0;fila.jul = 0;fila.ago = 0;fila.sep = 0;fila.oct = 0;fila.nov = 0;fila.dic = 0;
          var totalFinal = 0;
          for(var j in response.data[i].meses){
            if(response.data[i].meses[j].mes == '1') {fila.ene = response.data[i].meses[j].total; totalFinal += response.data[i].meses[j].total; $scope.Ene += response.data[i].meses[j].total;}
            if(response.data[i].meses[j].mes == '2') {fila.feb = response.data[i].meses[j].total; totalFinal += response.data[i].meses[j].total; $scope.Feb += response.data[i].meses[j].total;}
            if(response.data[i].meses[j].mes == '3') {fila.mar = response.data[i].meses[j].total; totalFinal += response.data[i].meses[j].total; $scope.Mar += response.data[i].meses[j].total;}
            if(response.data[i].meses[j].mes == '4') {fila.abr = response.data[i].meses[j].total; totalFinal += response.data[i].meses[j].total; $scope.Abr += response.data[i].meses[j].total;}
            if(response.data[i].meses[j].mes == '5') {fila.may = response.data[i].meses[j].total; totalFinal += response.data[i].meses[j].total; $scope.May += response.data[i].meses[j].total;}
            if(response.data[i].meses[j].mes == '6') {fila.jun = response.data[i].meses[j].total; totalFinal += response.data[i].meses[j].total; $scope.Jun += response.data[i].meses[j].total;}
            if(response.data[i].meses[j].mes == '7') {fila.jul = response.data[i].meses[j].total; totalFinal += response.data[i].meses[j].total; $scope.Jul += response.data[i].meses[j].total;}
            if(response.data[i].meses[j].mes == '8') {fila.ago = response.data[i].meses[j].total; totalFinal += response.data[i].meses[j].total; $scope.Ago += response.data[i].meses[j].total;}
            if(response.data[i].meses[j].mes == '9') {fila.sep = response.data[i].meses[j].total; totalFinal += response.data[i].meses[j].total; $scope.Sep += response.data[i].meses[j].total;}
            if(response.data[i].meses[j].mes == '10') {fila.oct = response.data[i].meses[j].total; totalFinal += response.data[i].meses[j].total; $scope.Oct += response.data[i].meses[j].total;}
            if(response.data[i].meses[j].mes == '11') {fila.nov = response.data[i].meses[j].total; totalFinal += response.data[i].meses[j].total; $scope.Nov += response.data[i].meses[j].total;}
            if(response.data[i].meses[j].mes == '12') {fila.dic = response.data[i].meses[j].total; totalFinal += response.data[i].meses[j].total; $scope.Dic += response.data[i].meses[j].total;}
          }
          fila.total = totalFinal;
          $scope.tabla.push(fila);
          $scope.graficos.push({
            series: fila.sucursal,
            labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            data: [fila.ene,fila.feb,fila.mar,fila.abr,fila.may,fila.jun,fila.jul,fila.ago,fila.sep,fila.oct,fila.nov,fila.dic]
          });
        }
        $('#loadLogo').hide();
      });
    }

    $scope.onClick = function (grafico) {
      $scope.graficoModal=grafico;
      console.log($scope.graficoModal);
    };

    $scope.verDetallesCelda = function(tipo,anio, nombre, mes, valor){
      if(valor != 0){
        $location.path('reporteSucursal/'+tipo+'/'+anio+'/'+mes+'/'+nombre);
      }
    }

  }
]);
