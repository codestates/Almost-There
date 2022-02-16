const express = require('express');
const router = express.Router();
const { socialController } = require('../controller');

// router.post('/google', socialController.google.post);
// router.post('/kakaotalk', socialController.kakaotalk.post);
router.post('/naver', socialController.naver.post);


module.exports = router;
