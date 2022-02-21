const express = require('express');
const router = express.Router();
const { groupController } = require('../controller');

router.post('/create', groupController.create.post);
router.delete('/', groupController.delete.delete);
router.post('/overtime', groupController.overtime.post);
router.get('/list', groupController.list.get);
router.post('/memberInfo',groupController.memberInfo.post)

module.exports = router;
