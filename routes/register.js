const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/protect');

const {
    register,
    confirmCode,
    setPassword
}= require('../controller/register');

router.route('/').post(register);
router.route('/confirmCode').post(confirmCode);
router.route('/setPassword').post(protect , setPassword);


module.exports = router;
