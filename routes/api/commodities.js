const express = require('express');
const router = express.Router();
const commoditiesCtrl = require('../../controllers/api/commodities');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/commodities/index
router.get('/index', commoditiesCtrl.index);

module.exports = router;
