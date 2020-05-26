const router = require('express').Router();
const boController = require('../../controllers/boController');

router.post('/', boController.getValue);
router.post('/download', boController.download);

module.exports = router;