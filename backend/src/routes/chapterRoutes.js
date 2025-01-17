const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');
const { upload } = require('../config/s3');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
    .get(chapterController.getPNMChapters)
    .post(chapterController.createChapter)
    .delete(chapterController.deleteChapter)

router.route('/semester')
    .post(chapterController.createNewSemester)

router.route('/:chapterId')
    .get(chapterController.getChapter)
    .patch(upload.single('profilePicture'), chapterController.updateChapter)

module.exports = router;