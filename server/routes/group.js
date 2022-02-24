const express = require('express');
const router = express.Router();
const { groupController } = require('../controller');

router.post('/create', groupController.create.post);
router.delete('/:groupId', groupController.delete.delete);
router.post('/overtime', groupController.overtime.post);
router.get('/list', groupController.list.get);
router.get('/memberInfo', groupController.memberInfo.get);

module.exports = router;
