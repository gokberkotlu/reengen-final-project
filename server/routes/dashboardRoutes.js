const { Router } = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = Router();

router.get('/list-factories', dashboardController.listFactories_get);
router.post('/add-factory', dashboardController.addFactory_post);
router.put('/update-factory', dashboardController.updateFactory_put);
router.delete('/delete-factory', dashboardController.deleteFactory_delete);

module.exports = router;