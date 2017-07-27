var mainAplicationModuleName = 'super'

var mainAplicationModule = angular.module(mainAplicationModuleName, ['ngRoute','datatables']);

mainAplicationModule.config(['$locationProvider',
  function($locationProvider){
    $locationProvider.hashPrefix('!');
  }
]);

angular.element(document).ready(function(){
  angular.bootstrap(document, [mainAplicationModuleName]);
})
