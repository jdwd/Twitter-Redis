/**
 * Created by maxoumime on 26/03/15.
 */
var app = angular.module('twitterNoSQL', [
   'ngRoute',
   'tweets.module'

]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',    {templateUrl: '/javascript/accueil.html', controller: 'tweetsCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
}]);