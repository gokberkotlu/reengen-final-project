const { Router } = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = Router();

// factories database routes
// id, name, start_date, expiration_date, employee_number, special_member
router.get('/list-factories', dashboardController.listFactories_get);
router.post('/add-factory', dashboardController.addFactory_post);
router.put('/update-factory', dashboardController.updateFactory_put);
router.delete('/delete-factory', dashboardController.deleteFactory_delete);

// factory-details database routes
// id, name, departmant, date_range, consumption, invoice, discount
router.get('/list-factory-details', dashboardController.listFactoryDetails_get);
router.post('/add-factory-detail', dashboardController.addFactoryDetail_post);
router.put('/update-factory-details', dashboardController.updateFactoryDetail_put);
router.delete('/delete-factory-details', dashboardController.deleteFactoryDetail_delete);

module.exports = router;