const router = require('express').Router();
const UsersController = require('../../controllers/usersController');

router.get('/:id', UsersController.getUserById);
router.post('/', UsersController.addUser);

module.exports = router;