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

        /**
         * Récupère le nom d'utilisateur d'un user
         * @param id
         * @param callback
         * @returns {*}
         */
        getUserName: function (id, callback) {
            return client.get(USER + ":" + id + ":userName", callback);
        },

        /**
         * Récupération de la liste de tous les tweets d'un utilisateur
         * @param myKey
         * @param callback
         */
        getAllTweetsFromUser: function (myKey, callback) {
            //récupération des tweets de l'utilisateur myKey
            var prefix = USER + ":" + myKey;
            var tweets = client.lrange(prefix + ":tweets", 0, -1, callback);
        },

        /**
         * Récupération des followers d'un utilisateur
         * @param myKey
         * @param callback
         */
        getAllFollowersFromUser: function (myKey, callback) {
            //récupération de toutes les clées "user:id:following"
            var keyToSeach = USER + ":*:following";
            client.keys(keyToSeach, function (err, data) {
                var res = [];
                var segmentKey = [];

                if (data !== null) {
                    var allKeys = data;

                    //parcours de chaque clée afin de vérifier la présence de myKey dans following
                    //Pour chaque username présent (stalking + user connecté)
                    async.each(allKeys, function (key, callback) {
                        var currUser = {};
                        currUser.id = (key.split(":"))[1];

                        //Récupération du userName
                        db.getUserName(currUser.id, function (err1, data1) {
                            if (data1 !== null) {
                                currUser.userName = data1;

                                //Récupération de la liste des following
                                db.getAllFollowingFromUser(currUser.id, function (err2, data2) {
                                    if (data2 !== null) {
                                        //Vérifie la présence de l'utilisateur dans la liste des following
                                        for (var user in data2) {
                                            if (data2[user].id === myKey) {
                                                res.push(currUser);
                                            }
                                        }
                                        callback();
                                    } else {
                                        callback();
                                    }
                                })
                            }
                            else callback();
                        })

                    }, function (err) {
                        callback(null, res);

                    })
                } else callback(null, res);
            })
        },

        /**
         * Récupération de la liste des followings d'un utilisateur
         * @param myKey
         * @param callback
         */
        getAllFollowingFromUser: function (myKey, callback) {
            //récupération des utilisateurs suivis de l'utilisateur myKey
            var prefix = USER + ":" + myKey;
            var res = [];
            client.smembers(prefix + ":following", function (err, data) {
                if (data !== null) {
                    var allKeys = data;

                    async.each(allKeys, function (userKey, callback) {
                        var currUser = {};
                        currUser.id = userKey;
                        // Récupération du userName de userKey
                        db.getUserName(currUser.id, function (err2, data2) {
                            if (data2 !== null) {
                                currUser.userName = data2;
                                res.push(currUser);
                                callback();
                            } else {
                                callback();
                            }
                        });
                    }, function (err) {
                        callback(null, res);
                    })
                } else {
                    callback(null, res);
                }
            })
        },

        /**
         * Récupération du nombre de tweets d'un utilisateur
         * @param myKey
         * @param callback
         */
        getNumberTweetsFromUser: function (myKey, callback) {
            db.getAllTweetsFromUser(myKey, function (err, data) {
                if (data !== undefined) {
                    callback(null, data.length);
                } else {
                    callback(null, 0);
                }
            })
        },


        /**
         * Récupération du nombre de following d'un utilisateur
         * @param myKey
         * @param callback
         */
        getNumberFollowing: function (myKey, callback) {
            db.getAllFollowingFromUser(myKey, function (err, data) {
                if (data !== undefined) {
                    callback(null, data.length);
                } else {
                    callback(null, 0);
                }
            })
        },

        /**
         * Récupération du nombre de followers d'un utilisateurs
         * @param myKey
         * @param callback
         */
        getNumberFollowers: function (myKey, callback) {
            db.getAllFollowersFromUser(myKey, function (err, data) {
                if (data !== null) {
                    callback(null, data.length);
                } else {
                    callback(null, 0);
                }
            })
        },


        /**
         * Création d'un tweet
         * @param myKey
         * @param newTweet
         * @param callback
         */
        addNewTweet: function (myKey, newTweet, callback) {
            //ajout du tweet
            var key = USER + ":" + myKey + ":tweets";
            var tweetContent = newTweet;
            client.rpush([key, newTweet], callback)
        },

        getLastTweet: function (myKey, callback) {
            // Récupération des tweets du user
            client.lrange(USER + ":" + myKey + ":tweets", -1, -1, function (err, data) {
                var tweetObject = {};
                if (data[0] !== undefined) {
                    tweetObject.content = data[0];
                    db.getUserName(myKey, function (err2, data2) {
                        if (data2 !== null) {
                            tweetObject.author = data2;
                        }
                        callback(null, tweetObject);
                    })
                }
            })
        },

        getAllFollowersLastTweet: function (followingUsers, callback) {
            //Pour chaque user présent
            var allLastTweets = [];
            for (var userObject in followingUsers) {
                if (followingUsers[userObject].id !== undefined) {
                    db.getLastTweet(followingUsers[userObject].id, function (err2, data2) {
                        if (data2 !== null) {
                            allLastTweets.push(data2);
                            console.log("fonction défaillante, résultats obtenus : ");
                            console.log(allLastTweets);
                        }
                        callback(allLastTweets);
                    });
                }
            }
        },
        getLastTweetOfEachFollowing: function (myKey, callback) {
            //récupération de l'ensemble des clées "utilisateur"
            db.getAllFollowingFromUser(myKey, function (err, data) {
                    var followingUsers = data;
                    var allLastTweets = [];
                    if (followingUsers !== undefined && followingUsers.length > 0) {

                        db.getAllFollowersLastTweet(followingUsers, function (err2, data2) {
                            if (data2 !== null) {
                                allLastTweets = data2;
                                callback(null, allLastTweets);
                            }
                        })

                    } else callback(null, allLastTweets);
                }
            )
            ;
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
    }
    ;

module.exports = db;








