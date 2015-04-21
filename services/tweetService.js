/**
 * Created by Justine Dewilde on 19/04/2015.
 */

var db = require('./db');
var tweetUtils = require('./tweetUtils');

var tweetService = {

    //Ajout d'un nouveau tweet
    add: function (myKey, newTweet, callback) {
        //ajout de 'tweet' dans la liste des tweets de l'utilisateur dont la clé est myKey
        db.addNewTweet(myKey, newTweet, callback);
    },

    //Récupération de tous les tweets d'un user
    getAllTweetsFromUser: function (userKey, callback) {
        db.getAllTweetsFromUser(userKey, callback);
    },

    //Récupération du dernier tweet d'un user
    getLast: function (userKey, callback) {

    },

    //Compte le nombre de tweet d'un user
    countTweets: function (userKey, callback) {

    },

    /**
     * Récupère la liste des tweets contenant le Hashtag
     * @param hashtag
     * @param callback
     */
    getTweetsContainHashtag: function (hashtag, callback) {
       db.getAllTweetsFromAllUsers(function (err, data) {
            //TODO
           console.log("data: "+data);
        });
        var finalList = [];

        /*for (var tweet in allTweets) {
            if (tweetUtils.containsHashtag(tweet)) {
                finalList.push(tweet);
            }
        }
        callback.setData(finalList);*/
    }


}

module.exports = tweetService;