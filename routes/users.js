var express = require('express');
var userService = require('../services/userService');
var router = express.Router();



//Récupère le nom d'utilisateur d'un user
router.get('/:idUser', function (req, res, next) {
    var idUser = req.params.idUser;
    userService.getUserName(idUser, function (err, data) {
        if (data !== null) {
            res.send(data.toString());
        }
        else {
            //Cas ou il n'y a pas de tweet on ne retourne rien
            res.send();
        }

    })
})

router.get('/nbrTweets/:idUser', function (req, res, next) {
    var idUser = req.params.idUser;
    userService.getNumberTweets(idUser, function (err, data) {
        if (data !== null) {
            res.send(data.toString());
        }
        else {
            //Cas ou il n'y a pas de tweet on ne retourne rien
            res.send();
        }

    })
}),

    router.get('/nbrFollowing/:idUser', function (req, res, next) {
        var idUser = req.params.idUser;
        userService.getNumberFollowing(idUser, function (err, data) {
            if (data !== null) {
                res.send(data.toString());
            }
            else {
                //Cas ou il n'y a pas de tweet on ne retourne rien
                res.send();
            }

        })
    })

router.get('/nbrFollowers/:idUser', function (req, res, next) {
    var idUser = req.params.idUser;
    userService.getNumberFollowers(idUser, function (err, data) {
        if (data !== null) {
            res.send(data.toString());
        }
        else {
            //Cas ou il n'y a pas de tweet on ne retourne rien
            res.send();
        }

    })
})


module.exports = router;
