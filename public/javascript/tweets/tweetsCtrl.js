/**
 * Created by Justine Dewilde on 27/03/2015.
 */

tweetsModule.controller('tweetsCtrl', ['$scope', '$location', '$http', '$route', function ($scope, $location, $http, $route) {


    function getMyTweets(idUser) {
        $http.get("/tweets/user/" + idUser).success(function (data) {
            $scope.tweets = data;
        })
    }

    getMyTweets(1);

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
        var hashtag = $scope.content;
        $http.get("/tweets/search/" + hashtag).success(function (data) {
            toastr.info("Recherche : " + hashtag);
            //Permet de rafraichir l'affichage des tweets;
            $scope.tweetsFinded = data;

        })
    }
}]);

