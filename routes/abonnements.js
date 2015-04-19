/**
 * Created by Justine Dewilde on 27/03/2015.
 */
var express = require('express');
var router = express.Router();

/* GET all abonnements */
router.get('/', function(req, res, next) {

    var userId = req.body.id;
    var userAbonnement = req.body.abonnement;

    // Requete en base pour ajout de userAbonnement dans la liste des abonnements du user
    res.send();
});

module.exports = router;


