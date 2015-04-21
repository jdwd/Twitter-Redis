/**
 * Created by Justine Dewilde on 27/03/2015.
 */

var express = require('express');
var tweetService = require('../services/tweetService');
var router = express.Router();

/* GET tweets listing. */
router.get('/user/:idUser', function (req, res, next) {

    var idUser = req.params.idUser;
    tweetService.getAllTweetsFromUser(idUser, function (err, data) {
        if (data !== null) {
            res.send(data);
        }
        else {
            //Cas ou il n'y a pas de tweet on ne retourne rien
            res.send();
        }

    })
})
;

/* GET tweets listing. */
router.get('/search/:hashtag', function (req, res, next) {
    var hashtag = req.params.hashtag;
    tweetService.getTweetsContainHashtag(hashtag, function (err, data) {
        if (data !== null) {
            res.send(data);
        }
        else {
            //Cas ou il n'y a pas de tweet on ne retourne rien
            res.send();
        }
    });
});


/* POST add tweet*/
router.post('/', function (req, res, next) {
    var content = req.body.content;
    var id = 1;
    // Request à la base de données
    tweetService.add(id, content, function (err, data) {
        if (data !== undefined) {
            res.statusCode = 200;
        }
        else {
            res.statusCode = 400;
        }
        res.end();
    })

});


module.exports = router;
