angular.module('example').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/',{
      templateUrl: 'app_Angular/example/views/example.view.html'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);
