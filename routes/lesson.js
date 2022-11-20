const express = require('express');
const { protect, authorize } = require('../middleware/protect');


const {
    createLesson,
    // getLessons,
    searchLessons,
    updateLesson,
    deleteLesson,
    getLesson
} = require('../controller/lesson')

const router = express.Router();

router.route('/')
    // .get(HomeData)  
    .post(protect , authorize("admin", "operator") , createLesson); 


router.route('/:id')
    .get(getLesson)
    .delete(protect ,authorize("admin", "operator") , deleteLesson)  
    .put(protect , authorize("admin", "operator") , updateLesson);   

module.exports = router;

