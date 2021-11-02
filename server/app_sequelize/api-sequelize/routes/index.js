var express = require('express');
var router = express.Router();
const dishController = require('../controllers').dish
const ingredientController = require('../controllers').ingredient
const categoryController = require('../controllers').category
const orderController = require('../controllers').order


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dish', dishController.list);
router.get('/api/dishSelect/:list', dishController.listSelected);
router.post('/api/dish', dishController.add);
router.get('/api/dish/:id', dishController.getById);
router.put('/api/dish/:id', dishController.update);
router.delete('/api/dish/:id', dishController.delete);
router.post('/api/dish/addIngredient', dishController.addIngredient);
router.post('/api/dish/addCategory', dishController.addCategory);


router.get('/api/ingredient', ingredientController.list);
router.post('/api/ingredient', ingredientController.add);
router.get('/api/ingredient/:id', ingredientController.getById);
router.put('/api/ingredient/:id', ingredientController.update);
router.delete('/api/ingredient/:id', ingredientController.delete);


router.get('/api/category', categoryController.list);
router.post('/api/category', categoryController.add);
router.get('/api/category/:id', categoryController.getById);
router.put('/api/category/:id', categoryController.update);
router.delete('/api/category/:id', categoryController.delete);

router.get('/api/order', orderController.list);
router.post('/api/order', orderController.add);
router.get('/api/order/:id', orderController.getById);
router.put('/api/order/:id', orderController.update);
router.delete('/api/order/:id', orderController.delete);

module.exports = router;
