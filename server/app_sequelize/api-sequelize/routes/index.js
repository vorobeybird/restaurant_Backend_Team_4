var express = require('express');
var router = express.Router();
const dishController = require('../controllers').dish
const ingredientController = require('../controllers').ingredient


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dish', dishController.list);
router.post('/api/dish', dishController.add);
router.get('/api/dish/:id', dishController.getById);
router.put('/api/dish/:id', dishController.update);
router.delete('/api/dish/:id', dishController.delete);
router.post('/api/dish/addIngredient', dishController.addIngredient);

router.get('/api/ingredient', ingredientController.list);
router.post('/api/ingredient', ingredientController.add);
router.get('/api/ingredient/:id', ingredientController.getById);
router.put('/api/ingredient/:id', ingredientController.update);
router.delete('/api/ingredient/:id', ingredientController.delete);



module.exports = router;
