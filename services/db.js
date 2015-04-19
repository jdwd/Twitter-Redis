var redis = require("redis");
var async = require('async');
var uuid = require('node-uuid');

var port = "6379";
var host = "bluebell.me";

var client = redis.createClient(port, host);

client.on("connect", function(){});

var TWEET = "tweet";
var USER = "user";
var NEXT_TWEET = "next_tweet";

var db = {

    //Initialiacation des constantes
    TWEET: TWEET,
    USER: USER,
    client: client,

    //Fonctions
    //Récupération de tous les éléments
    getAll: function (type, callback) {
        return client.smembers(type, callback);
    },

    //Suppression de la clé
    delete: function (type, key, callback) {
        db.generateKey(type, key, function(generatedKey){
            async.parallel([
                function (callback) {
                    client.del(generatedKey, callback)
                },
                function (callback) {
                    client.srem(type, db.getSuffixKey(generatedKey), callback)
                }
            ], function (err, results) {
                callback(results[0] == 1 && results[1] == 1);
            });
        });
    },

    generateKey: function(type, key, callback) {
        if (key !== undefined)
            callback(type + ":" + key);
        else {
            callback(type + ":" + uuid.v4());
        }
    }
};

module.exports = db;








