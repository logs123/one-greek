const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
    .post(eventController.createNewEvent)
    .delete(eventController.deleteEvent)

router.route('/:eventId')
    .patch(eventController.updateEvent)

router.route('/pnm')
    .get(eventController.getPNMEvents)

router.route('/pnm/checkin')
    .post(eventController.checkIntoEvent)

router.route('/active')
    .get(eventController.getActiveEvents)

router.route('/verify')
    .post(eventController.verifyAttendance)

module.exports = router;