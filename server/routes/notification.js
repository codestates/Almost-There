const express = require('express');
const router = express.Router();
const { notificationController } = require('../controller');

router.delete('/:notificationId', notificationController.delete.delete);
router.get('/list', notificationController.list.get);
router.post('/send', notificationController.send.post);

module.exports = router;
