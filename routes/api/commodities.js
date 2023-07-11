const express = require('express');
const router = express.Router();
const commoditiesCtrl = require('../../controllers/api/commodities');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

//! Add protected routes
// GET /api/commodities
router.get('/index', commoditiesCtrl.index);
router.get('/:params', commoditiesCtrl.analyse);
router.get('/:params/isfavourite', commoditiesCtrl.isFavourite);

// POST /api/commodities
router.post('/:params/favourite', commoditiesCtrl.favourite);

module.exports = router;
