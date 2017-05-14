var mainAplicationModuleName = 'bk';

var mainAplicationModule = angular.module(mainAplicationModuleName, ['ngRoute','general']);

mainAplicationModule.config(['$locationProvider',
  function($locationProvider){
    $locationProvider.hashPrefix('!');
  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainAplicationModuleName]);
});
