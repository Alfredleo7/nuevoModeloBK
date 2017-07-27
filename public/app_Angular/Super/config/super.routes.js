'use strict';

angular.module('super').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/Super/views/view_operarios.view.html',
      controller: 'view_operarios.controller'
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
    });
  }
]);
