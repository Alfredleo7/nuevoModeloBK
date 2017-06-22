'use strict';

angular.module('administrador').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/Administrador/views/list-cajas.view.html'
    }).
    when('/reporteXLocales', {
      templateUrl: 'app_Angular/Administrador/views/reporte-locales.view.html'
    }).
    when('/reporteXCategorias', {
      templateUrl: 'app_Angular/Administrador/views/reporte-categoria.view.html'
    }).
    when('/cajas', {
      templateUrl: 'app_Angular/Administrador/views/list-cajas.view.html'
    }).
    when('/cajas/:cajaId', {
      templateUrl: 'app_Angular/Administrador/views/view-caja.view.html'
    }).
    when('/reporte/:tipo/:anio/:mes/:nombre', {
      templateUrl: 'app_Angular/Administrador/views/detallesByCelda.view.html',
      controller: 'detallesByCelda.controller'
    });
  }
]);
