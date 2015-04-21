/**
 * Created by Justine Dewilde on 27/03/2015.
 */

var usersModule = angular.module('users.module', ['twitterNoSQL']);

usersModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/users',    {templateUrl: '/javascript/tweets/partials/usersInfo.html', controller: 'usersCtrl'});
}]);
