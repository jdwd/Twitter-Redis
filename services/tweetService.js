/**
 * Created by Justine Dewilde on 19/04/2015.
 */

var db = require('./db');
var tweetUtils = require('./tweetUtils');

var tweetService = {

    /**
     * Création d'un nouveau tweet
     * @param myKey
     * @param newTweet
     * @param callback
     */
    add: function (myKey, newTweet, callback) {
        //ajout de 'tweet' dans la liste des tweets de l'utilisateur dont la clé est myKey
        db.addNewTweet(myKey, newTweet, callback);
    },

    /**
     * Récupération de tous les tweets d'un utilisateur
     * @param userKey
     * @param callback
     */
    getAllTweetsFromUser: function (userKey, callback) {
        var finalList = [];
        //Récupération de la liste des tweets d'un utilisateur
        db.getAllTweetsFromUser(userKey, function (err, data) {

            if (data !== undefined) {
                var allTweets = data;

                //Récupération du nom d'utilisateur
                var author;
                db.getUserName(userKey, function (err2, data2) {
                    if (data2 !== undefined) {
                        author = data2;

                        for (var tweetIndex in allTweets) {
                            var tweet = {};
                            tweet.content = allTweets[tweetIndex];
                            tweet.author = author;
                            finalList.push(tweet);
                        }
                        callback(null, finalList);
                    } else {
                        callback(null, null);
                    }

                });
            } else {
                callback(null, null);
            }

        });
    },

    /**
     * Récupère la liste des tweets contenant le Hashtag
     * @param hashtag
     * @param callback
     */
    getTweetsContainHashtag: function (hashtag, callback) {
        db.getAllTweetsFromAllUsers(function (err, data) {
            if (data !== undefined) {
                var allTweets = data;
                var finalList = [];
                for (var tweet in allTweets) {
                    if (tweetUtils.containsHashtag(allTweets[tweet].content, "#" + hashtag)) {
                        finalList.push(allTweets[tweet]);
                    }
                }
                callback(null, finalList);
            } else {
                callback(null, null);
            }
        });
    },

    /**
     * Récupération du dernier tweet de chaque utilisateur suivi
     * @param myKey
     * @param callback
     */
    getLastTweetOfEachFollowing: function (myKey, callback) {
        db.getLastTweetOfEachFollowing(myKey, callback);
    }


}

module.exports = tweetService;