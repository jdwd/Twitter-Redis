/**
 * Created by Justine Dewilde on 27/03/2015.
 */

tweetsModule.controller('tweetsCtrl', ['$scope', '$location', '$http', '$route', function ($scope, $location, $http, $route) {


    function getMyTweets(idUser) {
        $http.get("/tweets/user/" + idUser).success(function (data) {
            $scope.tweets = data;
        })
    }

    function getLastTweetForEachFollowing(idUser) {
        $http.get("/tweets/following/last/" + idUser).success(function (data) {
            $scope.tweetsFollowing = data;
        })
    }

    getMyTweets(1);
    getLastTweetForEachFollowing(1);

    //scope permet d'acceder aux variables de la vue IHM
    $scope.envoyer = function () {
        var tweet = {};
        tweet.content = $scope.content;
        tweet.id = 1;
        $http.post("/tweets", tweet).success(function (data) {
            //Permet de rafraichir l'affichage des tweets
            $route.reload();
            toastr.success("Tweet envoyé !");
        })
    },

    //scope permet d'acceder aux variables de la vue IHM
    $scope.rechercher = function () {
        var hashtag = $scope.hashtag_content;
        var page = $scope.page;
        $http.get("/tweets/search/" + hashtag+"?page="+page).success(function (data) {
            toastr.info("Recherche : " + hashtag);
            //Permet de rafraichir l'affichage des tweets;
            $scope.tweetsFinded = data;
        })
    }

    $scope.tweetsFinded = [];
}]);

