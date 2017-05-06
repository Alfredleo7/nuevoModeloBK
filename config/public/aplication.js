var mainAplicationModuleName = 'bk';

var mainAplicationModule = angular.module(mainAplicationModuleName, ['ngResource','ngRoute','example','detalles']);

mainAplicationModule.config(['$locationProvider',
  function($locationProvider){
    $locationProvider.hashPrefix('!');
  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainAplicationModuleName]);
});
