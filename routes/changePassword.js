const express = require('express');
const {protect} = require('../middleware/protect');
const router = express.Router();

const {
    forgotPassword,
    confirmCode,
    resetPassword
}= require('../controller/changePassword');

router.route('/forgot').post(forgotPassword);
router.route('/confirm').post(confirmCode);
router.route('/reset').post(protect , resetPassword);


module.exports = router;