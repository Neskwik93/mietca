const router = require('express').Router();
const CoupController = require('../../controllers/coupController');

router.post('/', CoupController.addCoup);

module.exports = router;