var mainAplicationModuleName = 'bk';

var mainAplicationModule = angular.module(mainAplicationModuleName, ['ngRoute','administrador']);

mainAplicationModule.config(['$locationProvider',
  function($locationProvider){
    $locationProvider.hashPrefix('!');
  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainAplicationModuleName]);
});
