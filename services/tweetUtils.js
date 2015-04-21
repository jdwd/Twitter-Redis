/**
 * Created by Justine Dewilde on 20/04/2015.
 */
var tweetUtils = {
    //Retourne vrai si le mot contient un HashTag
    isHashtag: function (word) {
        var regex = new RegExp("/#\w*/g");
        if (regex.test(word))
            return true;
        else
            return false;
    },

    containsHashtag: function(string){
        var result = false;
        var arr = string.split(" ");
        var len = arr.length;
        while (len-- && result !== true) {
            if(tweetUtils.isHashtag(arr[len])) { result = true};
        }
        return result;
    }
};

module.exports = tweetUtils;