const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/check-token', authController.checkToken_post)
router.post('/login', authController.login_post);
router.post('/signup', authController.signup_post);

module.exports = router;