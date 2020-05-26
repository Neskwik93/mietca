
const router = require('express').Router();

router.use('/users', require('./usersRouter'));
router.use('/coup', require('./coupRouter'));
router.use('/bo', require('./boRouter'));

module.exports = router;