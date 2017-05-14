'use strict';

angular.module('general').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'app_Angular/cajasGeneral/views/list-cajas.view.html'
    }).
    when('/cajas', {
      templateUrl: 'app_Angular/cajasGeneral/views/list-cajas.view.html'
    }).
    when('/cajas/:cajaId', {
      templateUrl: 'app_Angular/cajasGeneral/views/view-caja.view.html'
    });
  }
]);
