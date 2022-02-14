const express = require('express');
const router = express.Router();
const { userController } = require('../controller');

router.post('/login', userController.login.post);
router.post('/logout', userController.logout.post);
router.post('/signup', userController.signup.post);
router.post('/check', userController.check.post);
router.delete('/delete', userController.delete.delete);
router.put('/update/info', userController.updateInfo.put);
router.put('/update/password', userController.updatePassword.put);
router.get('/info', userController.info.get);

module.exports = router;
