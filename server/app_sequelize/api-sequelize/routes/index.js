var express = require('express');
var router = express.Router();
const dishController = require('../controllers').dish


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dish', dishController.list);
router.post('/api/dish', dishController.add);


module.exports = router;
