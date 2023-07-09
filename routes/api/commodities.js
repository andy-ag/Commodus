const express = require('express');
const router = express.Router();
const commoditiesCtrl = require('../../controllers/api/commodities');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/commodities
router.get('/index', commoditiesCtrl.index);
router.get('/analyse/:name', commoditiesCtrl.analyse);

module.exports = router;
