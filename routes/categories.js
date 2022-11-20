const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/protect');


const {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}= require('../controller/categories');


// API category
router.route('/')
    .get(getAllCategories)
    .post( createCategory);


router.route('/:id')
    .get(getCategory)
    .put( updateCategory)
    .delete(deleteCategory);

module.exports = router;