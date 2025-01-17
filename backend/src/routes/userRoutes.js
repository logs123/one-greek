const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
    .delete(userController.deleteUser)

router.route('/follow')
    .post(userController.toggleFollowChapter)

router.route('/pnms')
    .get(userController.getPNMList)

router.route('/actives')
    .get(userController.getActiveMembers)

router.route('/verify')
    .post(userController.verifyMember)

router.route('/admin')
    .post(userController.toggleAdmin)

module.exports = router;