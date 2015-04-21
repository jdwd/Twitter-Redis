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

    //Récupération du dernier tweet d'un user
    getLast: function (userKey, callback) {

    }

    ,

    //Compte le nombre de tweet d'un user
    countTweets: function (userKey, callback) {

    }
    ,

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


    }


}

module.exports = tweetService;