/**
 * Created by Justine Dewilde on 19/04/2015.
 */

var db = require('./db');

var userService = {

    follow: function (myKey, keyToNewFollowing, callback) {
        // Ajouter keyToNewFollowing  dans la liste des following
    },
    getUserName: function (myKey, callback) {
        //Récupère le nom d'utilisateur d'un user
        db.getUserName(myKey, callback);
    },

    getNumberFollowing: function (myKey, callback) {
        //Récuperer le nombre des personnes suivies
        db.getNumberFollowing(myKey, callback);
    },

    getNumberFollowers: function (myKey, callback) {
        //Récuperer le nombre des followers
        db.getNumberFollowers(myKey, callback);
    },

    getNumberTweets: function (myKey, callback) {
        //Récupération des tweets
        db.getNumberTweetsFromUser(myKey, callback);
    },

    getFollowers: function (myKey, callback) {
        db.getAllFollowersFromUser(myKey, callback);
    },

    getFollowing: function (myKey, callback) {
        db.getAllFollowingFromUser(myKey, callback);
    }
}
module.exports = userService;