var mainAplicationModuleName = 'general';

var mainAplicationModule = angular.module(mainAplicationModuleName, ['ngRoute','datatables','ui.bootstrap','LocalStorageModule']);

mainAplicationModule.config(['$locationProvider',
  function($locationProvider){
    $locationProvider.hashPrefix('!');
  }
]);

mainAplicationModule.config(['$locationProvider',
  function($locationProvider){
    $locationProvider.hashPrefix('!');
  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainAplicationModuleName]);
});
