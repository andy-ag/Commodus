const express = require('express');
const router = express.Router();
const commoditiesCtrl = require('../../controllers/api/commodities');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/commodities
router.get('/index', commoditiesCtrl.index);
router.get('/favourites', ensureLoggedIn, commoditiesCtrl.getFavourites)
router.get('/compare/:params', commoditiesCtrl.compare)
router.get('/:params', commoditiesCtrl.analyse);
router.get('/:params/isfavourite', ensureLoggedIn, commoditiesCtrl.isFavourite);

// POST /api/commodities
router.post('/:params/favourite', commoditiesCtrl.favourite);

module.exports = router;
