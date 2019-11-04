const router = require('express').Router();
const controller = require('../controllers/shopping');
const validations = require('../validations/shopping');

router.post('/', validations.sale(), controller.sale);

module.exports = router;
