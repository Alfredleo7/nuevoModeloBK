var mainAplicationModuleName = 'bk';

var mainAplicationModule = angular.module(mainAplicationModuleName, ['ngResource','ngRoute','cajas'/*,'detalles'*/]);

mainAplicationModule.config(['$locationProvider',
  function($locationProvider){
    $locationProvider.hashPrefix('!');
  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainAplicationModuleName]);
});