const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);

// PUT /api/users
router.put('/email', ensureLoggedIn, usersCtrl.changeEmail);
router.put('/password', ensureLoggedIn, usersCtrl.changePassword);

// DELETE /api/users
router.delete('/', ensureLoggedIn, usersCtrl.deleteAccount);

// GET /api/users/
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
