var redis = require("redis");
var async = require("async");

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

    /**
     * Récupère le nom d'utilisateur d'un user
     * @param id
     * @param callback
     * @returns {*}
     */
    getUserName: function (id, callback) {
        return client.get(USER + ":" + id + ":userName", callback);
    },

    getAllTweetsFromUser: function (myKey, callback) {
        //récupération des tweets de l'utilisateur myKey
        var prefix = USER + ":" + myKey;
        var tweets = client.lrange(prefix + ":tweets", 0, -1, callback);
    },

    getAllFollowersFromUser: function (myKey, callback) {
        //récupération de toutes les clées "user:id:following"
        var keyToSeach = USER + ":*:following";
        client.keys(keyToSeach, function (err, data) {
            var res = [];
            var segmentKey = [];

            if (data !== undefined) {
                var allKeys = data;

                //parcours de chaque clée afin de vérifier la présence de myKey dans following
                //Pour chaque username présent (stalking + user connecté)
                async.each(allKeys, function (key, callback) {
                    currUserKey = (key.split(":"))[1];

                    //Récupération de la liste des following
                    db.getAllFollowingFromUser(currUserKey, function (err2, data2) {
                        if (data2 !== undefined) {
                            //Vérifie la présence de l'utilisateur dans la liste des following
                            if (data2.indexOf(myKey) >= 0) {
                                res.push(currUserKey);
                            }
                        }
                        callback();
                    })
                }, function (err) {
                    callback(null, res);

                })
            }
        })
    },

    getAllFollowingFromUser: function (myKey, callback) {
        //récupération des tweets de l'utilisateur myKey
        var prefix = USER + ":" + myKey;
        var tweets = client.smembers(prefix + ":following", callback);
    }

    ,

    getNumberTweetsFromUser: function (myKey, callback) {
        db.getAllTweetsFromUser(myKey, function (err, data) {
            if (data !== undefined) {
                callback(null, data.length);
            } else {
                callback(null, 0);
            }
        })
    }
    ,

    getNumberFollowing: function (myKey, callback) {
        db.getAllFollowingFromUser(myKey, function (err, data) {
            if (data !== undefined) {
                callback(null, data.length);
            } else {
                callback(null, 0);
            }
        })
    }
    ,

    getNumberFollowers: function (myKey, callback) {
        db.getAllFollowersFromUser(myKey, function (err, data) {
            if (data !== undefined) {
                callback(null, data.length);
            } else {
                callback(null, 0);
            }
        })
    }
    ,


    addNewTweet: function (myKey, newTweet, callback) {
        //ajout du tweet
        var key = USER + ":" + myKey + ":tweets";
        var tweetContent = newTweet;
        client.rpush([key, newTweet], callback)
    }
    ,

//Suppression du tweet
    delete: function (tweet, userKey, callback) {

    }

    ,

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
                    callback(null, res);
                } else {
                    callback(null, null);
                }
            }
        )
    }
    ,

    /**
     * Fonction permettant de récuperer la liste des tweets de tous les utilisateur
     * @param callback
     */
    getAllTweetsFromAllUsers: function (callback) {
        //récupération de l'ensemble des clées "utilisateur"
        db.getAllUsersKeys(function (err, data) {
            var keys = data;
            if (keys !== undefined) {
                var prefix = "";
                var allTweets = [];

                //Parcours de chaque clé, soit chaque utilisateur

                //Pour chaque username présent (stalking + user connecté)
                async.each(keys, function (userKey, callback) {

                    //construction du préfix pour la recherche
                    prefix = USER + ":" + userKey;

                    // Récupération des tweets du user
                    client.lrange(prefix + ":tweets", 0, -1, function (err3, data3) {

                        if (data3 !== undefined) {
                            var tweets = data3;

                            async.each(tweets, function (tweet, callback2) {
                                var tweetObject = {};
                                tweetObject.content = tweet;

                                //Récupération du nom d'utilisateur du user parcouru
                                db.getUserName(userKey, function (err2, data2) {
                                    if (data2 !== undefined) {
                                        tweetObject.author = data2;
                                        allTweets.push(tweetObject);
                                        callback2();
                                    }
                                });
                            }, function (err) {
                                callback();
                            })
                        }

                    });
                }, function (err) {
                    callback(null, allTweets);
                })
            }
        });
    }
};

module.exports = db;








