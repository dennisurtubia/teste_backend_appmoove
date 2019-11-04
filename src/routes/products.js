const router = require('express').Router();
const controller = require('../controllers/product');
const validations = require('../validations/products');

router.get('/', controller.getAll);
router.get('/:produtoId', controller.getById);
router.post('/', validations.add(), controller.add);
router.delete('/:productId', controller.delete);

module.exports = router;
