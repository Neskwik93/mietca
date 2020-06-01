const router = require('express').Router();
const UsersController = require('../../controllers/usersController');

router.post('/', UsersController.addUser);

module.exports = router;