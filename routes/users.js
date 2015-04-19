var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
/* POST add user*/
router.post('/', function (req, res, next) {
    var firstname = req.body.name;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    // Request à la base de données
    res.send(req.body);

});

/* GET users bu ID. */
router.get('/:id', function (req, res, next) {
    // Récupération du USER par son ID
    res.send(req.params.id);
});


module.exports = router;
