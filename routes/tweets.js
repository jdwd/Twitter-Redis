/**
 * Created by Justine Dewilde on 27/03/2015.
 */

var express = require('express');
var router = express.Router();

/* GET tweets listing. */
router.get('/', function(req, res, next) {

        //get all my last 5 tweets

        res.send(tweets);

});

/* POST add tweet*/
router.post('/', function(req, res, next) {
    var content = req.body.content;
    var id = req.body.id;
    // Request à la base de données

    res.send("tralalal");

});

/* GET tweet by ID. */
router.get('/:id', function(req, res, next) {
    // Récupération du tweet par son ID
    var idUser = req.params.id;

    var tweets = [
        {content: "MON PREMIER TWEET", id: idUser},
        {content: "MON SECOND TWEET", id: idUser},
        {content: "MON TROISIEME TWEET", id: idUser}
    ];
    res.send(tweets);
});

module.exports = router;
