var countryApp = angular.module('countryApp', ['ngRoute']);

countryApp.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'templates/login_without_game.html'
        }).
        when('/sett', {
            templateUrl: 'templates/sett.html'
        }).
        when('/stats', {
            templateUrl: 'templates/stats.html'
        }).
        when('/profile', {
            templateUrl: 'templates/profile.html'
        }).
        when('/login', {
            templateUrl: 'templates/login.html'
        }).
        when('/modes', {
            templateUrl: 'templates/modes.html'
        }).
        when('/modes/freeplay', {
            templateUrl: 'templates/free_play.html'
        }).
        when('/modes/levels', {
            templateUrl: 'templates/levels.html'
        }).
        when('/modes/levels/:level', {
            templateUrl: 'templates/level.html',
            controller: 'CountryDetailCtrl'
        }).
        otherwise({
            redirectTo: '/'
    });
});

countryApp.controller('CountryDetailCtrl', function ($scope, $routeParams){
    console.log($routeParams);
    $scope.level = $routeParams.level;
});

      // countryApp.factory('countries', function($http){

      //   function getData(callback){
      //     $http({
      //       method: 'GET',
      //       url: 'test.json',
      //       cache: true
      //     }).success(callback);
      //   }

      //   return {
      //     list: getData,
      //     find: function(name, callback){
      //       getData(function(data) {
      //         var country = data.filter(function(entry){
      //           return entry.name === name;
      //         })[0];
      //         callback(country);
      //       });
      //     }
      //   };
      // });

      // countryApp.controller('CountryListCtrl', function ($scope, countries){
      //   countries.list(function(countries) {
      //     $scope.countries = countries;
      //   });
      // });

      // countryApp.controller('CountryDetailCtrl', function ($scope, $routeParams, countries){
      //   countries.find($routeParams.countryName, function(country) {
      //     $scope.country = country;
      //   });
      // });


var bf = angular.module('bf', ['ngRoute']);


