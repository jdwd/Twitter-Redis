/**
 * Created by Justine Dewilde on 27/03/2015.
 */

var tweetsModule = angular.module('tweets.module', ['twitterNoSQL']);

tweetsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tweets',    {templateUrl: '/javascript/tweets/partials/tweetsView.html', controller: 'tweetsCtrl'});
    $routeProvider.when('/tweets/create',    {templateUrl: '/javascript/tweets/partials/tweetsCreate.html', controller: 'tweetsCtrl'});
    $routeProvider.when('/tweets/search',    {templateUrl: '/javascript/tweets/partials/tweetsFind.html', controller: 'tweetsCtrl'});
}]);
