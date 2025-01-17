const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
    .get(organizationController.getOrganizations)
    .post(organizationController.createNewOrganization)
    .delete(organizationController.deleteOrganization)

module.exports = router;