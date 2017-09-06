var mainAplicationModuleName = 'super'

var mainAplicationModule = angular.module(mainAplicationModuleName, ['ngRoute','chart.js','datatables','LocalStorageModule']);

mainAplicationModule.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
}])

mainAplicationModule.config(['$locationProvider',
  function($locationProvider){
    $locationProvider.hashPrefix('!');
  }
]);

angular.element(document).ready(function(){
  angular.bootstrap(document, [mainAplicationModuleName]);
})
