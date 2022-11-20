const express = require('express');
const router = express.Router();

const { searchProducts } = require('../controller/search');

router.route('/').post(searchProducts);

module.exports = router;
