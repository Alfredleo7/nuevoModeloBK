'use strict';

angular.module('administrador').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/Administrador/views/view-CajasPendientes.view.html',
      controller: 'view-Cajas.controller'
    }).
    when('/reporteXLocales', {
      templateUrl: 'app_Angular/Administrador/views/reporte-sucursal.view.html',
      controller: 'reporte-sucursal.controller'
    }).
    when('/reporteXCategorias', {
      templateUrl: 'app_Angular/Administrador/views/reporte-categoria.view.html',
      controller: 'reporte-categoria.controller'
    }).
    when('/cajasPendientes', {
      templateUrl: 'app_Angular/Administrador/views/view-CajasPendientes.view.html',
      controller: 'view-Cajas.controller'
    }).
    when('/cajasAprobadas', {
      templateUrl: 'app_Angular/Administrador/views/view-CajasAprobadas.view.html',
      controller: 'view-Cajas.controller'
    }).
    when('/cajasRechazadas', {
      templateUrl: 'app_Angular/Administrador/views/view-CajasRechazadas.view.html',
      controller: 'view-Cajas.controller'
    }).
    when('/caja/:cajaId', {
      templateUrl: 'app_Angular/Administrador/views/view-caja.view.html',
      controller: 'view-caja.controller'
    }).
    when('/caja/:cajaId/detalle/:detalleId', {
      templateUrl: 'app_Angular/Administrador/views/view-detalle.view.html',
      controller: 'view-detalle.controller'
    }).
    when('/reporteSucursal/:tipo/:anio/:mes/:nombre', {
      templateUrl: 'app_Angular/Administrador/views/detallesCeldaReporteSucursal.view.html',
      controller: 'detallesByCeldaSucursal.controller'
    }).
    when('/reporteCategoria/:tipo/:anio/:mes/:nombre', {
      templateUrl: 'app_Angular/Administrador/views/detallesCeldaReporteCategoria.view.html',
      controller: 'detallesByCeldaCategoria.controller'
    });
  }
]);
