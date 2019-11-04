const express = require('express');
const { errors } = require('celebrate');
const validationMiddleware = require('../middlewares/validations');

const productsRoutes = require('./products');
const shoppingRoutes = require('./shopping');

const router = express.Router();
router.use(express.json());

router.use('/produtos', productsRoutes);
router.use('/compras', shoppingRoutes);

router.use('/', validationMiddleware.validation);
router.use(errors());

module.exports = router;
