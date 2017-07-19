var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.user) {
        return res.redirect('/orders');
    }
    
    console.log("Log in failed")
    var vm = {
        title: 'Log in',
        error: req.flash('error')
    };
    res.render('index', vm);
});

module.exports = router;
 