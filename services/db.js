var redis = require("redis");

var port = "6379";
var host = "bluebell.me";
var USER = "user";

var client = redis.createClient(port, host, {auth_pass: "redis.twitter.pass"});
client.on("connect", function () {
    console.log("connecté à " + host);
})


var db = {

    client: client,
    user: USER,

    //Fonctions
    //Récupération de tous les éléments
    getAll: function (type, callback) {
        return client.smembers(type, callback);
    },

    getAllTweetsFromUser: function (myKey, callback) {
        //récupération des tweets de l'utilisateur myKey
        var prefix = USER + ":" + myKey;
        var tweets = client.lrange(prefix + ":tweets", 0, -1, callback);
        var author = client.get(prefix + ":userName");
    },

    addNewTweet: function (myKey, newTweet, callback) {
        //ajout du tweet
        var key = USER + ":" + myKey + ":tweets";
        var tweetContent = newTweet;
        client.rpush([key, newTweet], callback)
    },

    //Suppression de la clé
    delete: function (type, key, callback) {

    },

    /************************************************************/
    /*                     Fonctions "utils"                    */
    /************************************************************/
    getAllUsersKeys: function (callback) {

        // Récupération de toutes les clées au format user:*
        client.keys(USER + ":*", function (err, data) {
                if (data !== undefined) {
                    var allKeys = data;

                    var res = [];
                    var segmentKey = [];
                    //parcours de chaque clée afin de ne récuperer que les id des utilisateurs
                    for (var key in allKeys) {
                        segmentKey = (allKeys[key].split(":"))[1];
                        //évite les doublons
                        if (res.indexOf(segmentKey) === -1) {
                            res.push(segmentKey);
                        }
                    }
                    //callback.data = res;
                } else {
                    //callback.data = undefined;
                }

                 // Comment faire un retour ?
            }
        )
    },

    getAllTweetsFromAllUsers: function (callback) {

        var allTweets = [];
        //récupération de l'ensemble des utilisateurs
        db.getAllUsersKeys(function (err, data) {
            //TODO
            console.log("dataUsers: " + data);
        });

        /*if (keys !== undefined || keys.size !== 0) {
         for (var userKey in keys) {
         var prefix = USER + ":" + userKey;

         var author = client.get(prefix + ":userName");
         var tweets = client.lrange(prefix + ":tweets", 0, -1);
         var tweetObject = {};

         for (var tweet in tweets) {
         tweetObject.content = tweet;
         tweetObject.author = author;
         allTweets.push(tweetObject);
         }
         }
         return allTweets;
         }*/
    }

};


module.exports = db;








