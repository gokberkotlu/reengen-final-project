const { Router } = require('express');
const accountEditController = require('../controllers/accountEditController');

const router = Router();

router.patch('/edit-password', accountEditController.editPassword_patch);
router.patch('/edit-account', accountEditController.editAccount_patch);

module.exports = router;