const express = require('express');
const router = express.Router();
const { userController } = require('../controller');

router.post('/login', userController.login.post);
router.post('/logout', userController.logout.post);
router.post('/signup', userController.signup.post);
router.post('/check-id', userController.check.post);
router.post('/latlng', userController.latlng.post);
router.delete('/', userController.delete.delete);
router.put('/info', userController.updateInfo.put);
router.put('/password', userController.updatePassword.put);
router.get('/info', userController.info.get);


module.exports = router;
