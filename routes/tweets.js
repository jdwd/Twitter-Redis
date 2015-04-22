/**
 * Created by Justine Dewilde on 27/03/2015.
 */

var express = require('express');
var tweetService = require('../services/tweetService');
var router = express.Router();

/* G ET: récupération de la liste des tweets */
router.get('/user/:idUser', function (req, res, next) {
    var idUser = req.params.idUser;
    var page = req.query.page;

    tweetService.getAllTweetsFromUser(idUser, function (err, data) {
        if (data !== null) {
            res.send(data.reverse());
        }
        else {
            //Cas ou il n'y a pas de tweet on ne retourne rien
            res.send();
        }

    })
});

/* GET récupération de la liste des tweets comprennant le hashtag */
router.get('/search/:hashtag', function (req, res, next) {
    var hashtag = req.params.hashtag;
    tweetService.getTweetsContainHashtag(hashtag, function (err, data) {
        if (data !== undefined) {
            res.send(data.reverse());
        }
        else {
            //Cas ou il n'y a pas de tweet on ne retourne rien
            res.send();
        }
    });
});

/* GET : récupère le dernier tweet de chaque following  */
router.get('/following/last/:idUser', function (req, res, next) {
    var idUser = req.params.idUser;
    tweetService.getLastTweetOfEachFollowing(idUser, function (err, data) {
        if (data !== undefined) {
            console.log(data);
            res.send(data);
        }
        else {
            //Cas ou il n'y a pas de tweet on ne retourne rien
            res.send();
        }
    });
});

/* POST création d'un tweet */
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
