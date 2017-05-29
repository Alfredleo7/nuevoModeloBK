'use strict';

angular.module('administrador').controller('ReporteXSucursalController', ['$scope','$http',
  function($scope, $http){

    $scope.generarReporte = function(){
      $scope.tabla = [];
      $http({
        method: 'GET',
        url: '/api/reporteXSucursal'
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
        }
      });
    }

  }
]);
