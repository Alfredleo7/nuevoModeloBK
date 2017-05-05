var mainAplicationModuleName = 'bk';

var mainAplicationModule = angular.module(mainAplicationModuleName, []);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainAplicationModuleName]);
});
