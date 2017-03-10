var app = angular.module("mapp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/basic", {
        templateUrl : "./user/basic.html"
    })
  
   

});