'use strict';

angular.module('super').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/Super/views/view_operarios.view.html',
      controller: 'view_operarios.controller'
    }).
    when('/reporteDetalles', {
      templateUrl: 'app_Angular/Super/views/reporte_detalles.view.html',
      controller: 'reporte_detalles.controller'
    }).
    when('/Operarios', {
      templateUrl: 'app_Angular/Super/views/view_operarios.view.html',
      controller: 'view_operarios.controller'
    }).
    when('/Administradores', {
      templateUrl: 'app_Angular/Super/views/view_administradores.view.html',
      controller: 'view_administradores.controller'
    }).
    when('/SuperUsuarios', {
      templateUrl: 'app_Angular/Super/views/view_super.view.html',
      controller: 'view_super.controller'
    }).
    when('/Categorias', {
      templateUrl: 'app_Angular/Super/views/view_categorias.view.html',
      controller: 'view_categorias.controller'
    }).
    when('/Proveedores', {
      templateUrl: 'app_Angular/Super/views/view_proveedores.view.html',
      controller: 'view_proveedores.controller'
    }).
    when('/Cajas', {
      templateUrl: 'app_Angular/Super/views/view_cajas.view.html',
      controller: 'view_cajas.controller'
    }).
    when('/caja/:cajaId', {
      templateUrl: 'app_Angular/Super/views/view-caja.view.html',
      controller: 'view-caja.controller'
    }).
    when('/caja/:cajaId/detalle/:detalleId', {
      templateUrl: 'app_Angular/Super/views/view-detalle.view.html',
      controller: 'view-detalle.controller'
    }).
    when('/reporteXLocales', {
      templateUrl: 'app_Angular/Super/views/reporte-sucursal.view.html',
      controller: 'reporte-sucursal.controller'
    }).
    when('/reporteXCategorias', {
      templateUrl: 'app_Angular/Super/views/reporte-categoria.view.html',
      controller: 'reporte-categoria.controller'
    }).
    when('/detalles/:anio/:mes/:sucursal/:categoria', {
      templateUrl: 'app_Angular/Super/views/view_celda.view.html',
      controller: 'view_celda.controller'
    });
  }
]);
