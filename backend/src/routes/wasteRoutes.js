const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/wasteController');

// Add new waste entry
router.post('/', wasteController.createWaste);

// Get waste history
router.get('/history', wasteController.getRecentWaste);

// Get all waste entries
router.get('/', wasteController.getAllWaste);

module.exports = router; 