/**
 * Created by Justine Dewilde on 20/04/2015.
 */
var tweetUtils = {
    //Retourne vrai si le mot contient un HashTag
    isHashtag: function (word) {

        var regex = /#\w*/g;
        if (word.match(regex) !== null)
            return true;
        else
            return false;
    },

    containsHashtag: function(string, hashtag){
        var result = false;
        var arr = string.split(" ");
        var len = arr.length;

        while (len-- && result !== true) {

            if(tweetUtils.isHashtag(arr[len]) && hashtag == (arr[len])) { result = true};
        }
        return result;
    }
};

module.exports = tweetUtils;