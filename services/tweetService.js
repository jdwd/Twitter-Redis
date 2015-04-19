/**
 * Created by Justine Dewilde on 19/04/2015.
 */

var db = require('./db');
//var hashdb = require('./db/hashdb');
var async = require('async');

var tweetService = {

    //Ajout d'un nouveau tweet
    add: function (myKey, tweet, callback) {
        //ajout de 'tweet' dans la liste des tweets de l'utilisateur dont la clé est myKey
    },

    //Récupération de tous les tweets d'un user
    getAll: function (userKey, callback) {

    },

    //Récupération du dernier tweet d'un user
    getLast: function (userKey, callback) {

    },

    //Compte le nombre de tweet d'un user
    countTweets: function(userKey, callback){

    },

    //Retourne vrai si le tweet contient un HashTag
    containsHashtag: function(keyUser, idTweet, callback)
    {

    }
}