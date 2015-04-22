/**
 * Created by Justine Dewilde on 27/03/2015.
 */

usersModule.controller('usersCtrl', ['$scope', '$location', '$http', '$route', '$modal', function ($scope, $location, $http, $route, $modal) {


    function getNbrTweets(idUser) {
        $http.get("/users/tweets/nbr/" + idUser).success(function (data) {
            $scope.nbrTweets = data;
        })
    }

    function getNbrFollowing(idUser) {
        $http.get("/users/following/nbr/" + idUser).success(function (data) {
            $scope.nbrFollowing = data;
        })
    }

    function getNbrFollowers(idUser) {
        $http.get("/users/followers/nbr/" + idUser).success(function (data) {
            $scope.nbrFollowers = data;
        })
    }

    function getUserName(idUser) {
        $http.get("/users/" + idUser).success(function (data) {
            $scope.userName = data;
        })
    }

    $scope.consultFollowers = function () {
        $scope.opennedModal = $modal(
            {
                scope: $scope,
                template: 'javascript/users/templates/consultModal.html',
                html: true,
                show: true
            }
        );
        $http.get("/users/followers/" + 1).success(function (data) {
            $scope.allUsers = data;
            $scope.title = "Ceux qui vous adorent !"
        })

    };

    $scope.consultFollowing = function () {
        $scope.opennedModal = $modal(
            {
                scope: $scope,
                template: 'javascript/users/templates/consultModal.html',
                html: true,
                show: true
            }
        );
        $http.get("/users/following/" + 1).success(function (data) {
            $scope.allUsers = data;
            $scope.title = "Ceux que vous suivez !"
        })

    };

    getNbrFollowers(1);
    getNbrFollowing(1);
    getNbrTweets(1);
    getUserName(1);
}]);

