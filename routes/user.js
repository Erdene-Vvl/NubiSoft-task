const express = require('express');

const {protect , authorize} = require('../middleware/protect');

const {
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser,
}= require('../controller/user');

const router = express.Router();


router.use(protect);

// CRUD 
router.route('/')
    .get(authorize("admin"), getUsers)
    .post(authorize("admin"), createUser);

router.route('/:id')
    .get(authorize("admin"), getUser)
    .put(authorize("admin"), updateUser)
    .delete(authorize("admin"), deleteUser);



module.exports = router;

