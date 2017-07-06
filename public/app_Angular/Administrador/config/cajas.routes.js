'use strict';

angular.module('administrador').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/Administrador/views/view-CajasPendientes.view.html',
      controller: 'view-Cajas.controller'
    }).
    when('/reporteXLocales', {
      templateUrl: 'app_Angular/Administrador/views/reporte-locales.view.html'
    }).
    when('/reporteXCategorias', {
      templateUrl: 'app_Angular/Administrador/views/reporte-categoria.view.html'
    }).
    when('/cajas', {
      templateUrl: 'app_Angular/Administrador/views/view-CajasPendientes.view.html',
      controller: 'view-Cajas.controller'
    }).
    when('/caja/:cajaId', {
      templateUrl: 'app_Angular/Administrador/views/view-caja.view.html',
      controller: 'view-caja.controller'
    }).
    when('/caja/:cajaId/detalle/:detalleId', {
      templateUrl: 'app_Angular/General/views/view-detalle.view.html',
      controller: 'view-detalle.controller'
    }).
    when('/reporte/:tipo/:anio/:mes/:nombre', {
      templateUrl: 'app_Angular/Administrador/views/detallesCeldaReporteSucursal.view.html',
      controller: 'detallesByCelda.controller'
    });
  }
]);
