const Organization = require('../models/Organization');
const Chapter = require('../models/Chapter');
const User = require('../models/User');
const Event = require('../models/Event');
const asyncHandler = require('express-async-handler');

// @desc Get all organizations
// @route GET /organizations
// @access Public
const getOrganizations = asyncHandler(async (req, res) => {
    const organizations = await Organization.find({}, { events: 0 }).lean();

    if (!organizations?.length) {
        return res.status(204).json({ message: 'No organizations found' });
    }

    return res.status(200).json(organizations);
});

// @desc Create new organization
// @route POST /organizations
// @access Private
const createNewOrganization = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'All fields required' });
    }

    const duplicate = await Organization.findOne({ name }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Organization name already exists' });
    }

    const organization = await Organization.create({ name });

    if (organization) {
        return res.status(201).json({ message: 'New organization created' });
    } else {
        return res.status(400).json({ message: 'Invalid organization data received' });
    }
});

// @desc Delete an organization
// @route DELETE /organizations
// @access Private
const deleteOrganization = asyncHandler(async (req, res) => {
    const { organizationId } = req.body;

    if (!organizationId) {
        return res.status(400).json({ message: 'Organization ID required' });
    }

    const organization = await Organization.findById(organizationId).exec();

    if (!organization) {
        return res.status(400).json({ message: 'No organization found' });
    }

    await Chapter.deleteMany({ organization: organizationId });

    await Event.deleteMany({ organization: organizationId });

    await User.deleteMany({ organization: organizationId });

    await organization.deleteOne();

    return res.status(200).json({ message: 'Organization and its associated data deleted' });
});

module.exports = {
    getOrganizations,
    createNewOrganization,
    deleteOrganization
};