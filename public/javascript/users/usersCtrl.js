/**
 * Created by Justine Dewilde on 27/03/2015.
 */

usersModule.controller('usersCtrl', ['$scope', '$location', '$http', '$route', function ($scope, $location, $http, $route) {


    function getNbrTweets(idUser) {
        $http.get("/users/nbrTweets/" + idUser).success(function (data) {
            $scope.nbrTweets = data;
        })
    }

    function getNbrFollowing(idUser) {
        $http.get("/users/nbrFollowing/" + idUser).success(function (data) {
            $scope.nbrFollowing = data;
        })
    }

    function getNbrFollowers(idUser) {
        $http.get("/users/nbrFollowers/" + idUser).success(function (data) {
            $scope.nbrFollowers = data;
        })
    }

    function getUserName(idUser) {
        $http.get("/users/" + idUser).success(function (data) {
            console.log("success");
            $scope.userName = data;
        })
    }

    getNbrFollowers(1);
    getNbrFollowing(1);
    getNbrTweets(1);
    getUserName(1);
}]);

