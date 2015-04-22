/**
 * Created by maxoumime on 26/03/15.
 */
var app = angular.module('twitterNoSQL', [
    'ngRoute',
    'tweets.module',
    'users.module',
    'mgcrea.ngStrap'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: '/javascript/accueil.html', controller: 'tweetsCtrl'});
    //$routeProvider.when('/', {templateUrl: '/javascript/accueil.html', controller: 'usersCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
}]);