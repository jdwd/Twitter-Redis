/**
 * Created by Justine Dewilde on 27/03/2015.
 */

tweetsModule.controller('tweetsCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){

    getMyLastTweets($http, $scope, 1);

    //scope permet d'acceder aux variables de la vue IHM
    $scope.envoyer=function(){
        var tweet = {};
        tweet.content = $scope.content;
        //TODO CHANGER EN USER ID
        tweet.id ="2";
        $http.post("/tweets", tweet).success(function(data){
            toastr.success("Tweet envoyé ! "+data);
            //Permet de rafraichir l'affichage des tweets
            getMyLastTweets($http, $scope, 2);
        })
    }
}]);


getMyLastTweets=function($http, $scope, idUser){
    $http.get("/tweets/"+ idUser).success(function(data){
        console.log(data)
        $scope.tweets = data;
    })
}