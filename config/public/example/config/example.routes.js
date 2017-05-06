angular.module('example').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/',{
      templateUrl: 'example/views/example.view.html'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);
