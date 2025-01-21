const Event = require('../models/Event');
const Chapter = require('../models/Chapter');
const Organization = require('../models/Organization');
const asyncHandler = require('express-async-handler');

// @desc Create new event
// @route POST /events
// @access Private
const createNewEvent = asyncHandler(async (req, res) => {
    const { name, chapter, organization, author, locationName, locationAddress, start, end, type, visibility, semester } = req.body;

    if (!name || !organization || !author || !start || !end || !type || !semester) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const eventObj = {
        name,
        organization,
        author,
        start,
        end,
        type,
        semester,
        location: {}
    }

    if (chapter) eventObj.chapter = chapter;
    if (locationName) eventObj.location.name = locationName;
    if (locationName) eventObj.location.address = locationAddress;
    if (visibility) eventObj.visibility = visibility 

    const event = await Event.create(eventObj);

    if (!event) {
        return res.status(400).json({ message: 'Invalid event data received' });
    }

    if (chapter) {
        const chap = await Chapter.findByIdAndUpdate(
            chapter,
            { $addToSet: { events: event } },
            { new: true }
        );

        if (!chap) {
            return res.status(404).json({ message: 'Chapter not found' });
        }
    }

    const org = await Organization.findByIdAndUpdate(
        organization,
        { $addToSet: { events: event } },
        { new: true }
    );

    if (!org) {
        return res.status(404).json({ message: 'Organization not found' });
    }

    return res.status(201).json({ message: 'New event created' });
});

// @desc Delete an event
// @route DELETE /events
// @access Private
const deleteEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.body;

    if (!eventId) {
        return res.status(400).json({ message: 'Event ID required' });
    }

    const event = await Event.findById(eventId).exec();

    if (!event) {
        return res.status(404).json({ message: 'No event found' });
    }

    if (event.chapter) {
        const chapter = await Chapter.findByIdAndUpdate(
            event.chapter,
            { $pull: { events: eventId } }
        )

        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }
    }

    const organization = await Organization.findByIdAndUpdate(
        event.organization,
        { $pull: { events: eventId } }
    )

    if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
    }

    await event.deleteOne();

    return res.status(200).json({ message: 'Event deleted' });
});

// @desc Update an event
// @route PATCH /events/:eventId
// @access Private
const updateEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const updateData = req.body;

    if (!eventId || !updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const updateFields = {};

    if (updateData.location && updateData.location.name) {
        updateFields['location.name'] = updateData.location.name;
    }

    if (updateData.location && updateData.location.address) {
        updateFields['location.address'] = updateData.location.address;
    }

    for (const [key, value] of Object.entries(updateData)) {
        if (key !== 'location') {
            updateFields[key] = value;
        }
    }

    const event = await Event.findByIdAndUpdate(
        eventId,
        { $set: updateFields },
        { new: true, runValidators: true }
    );

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json({ message: 'Event updated' });
});

// @desc Get PNM events
// @route GET /events/pnm?userId={userId}&organizationId={organizationId}
// @access Private
const getPNMEvents = asyncHandler(async (req, res) => {
    const { userId, organizationId } = req.query;

    if (!userId || !organizationId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const chapters = await Chapter.find({ pnmList: { $elemMatch: { pnm: userId, finalVote: 'yes' } } }).select('_id');

    const chapterIds = chapters.map((chapter) => chapter._id);

    const currentDate = new Date();

    const events = await Event.find({
        $or: [
            { type: 'Recruitment', organization: organizationId, visibility: 'public', end: { $gte: currentDate } },
            { type: 'Recruitment', organization: organizationId, visibility: 'private', chapter: { $in: chapterIds  }, end: { $gte: currentDate } }
        ]
    })
    .populate({
        path: 'chapter',
        select: 'name'
    })
    .lean();

    if (!events?.length) {
        return res.status(204).json({ message: 'No events found' });
    }

    const eventsWithAttendeeStatus = events.map((event) => {
        const isAttendee = event.attendees?.some((attendee) => attendee.user.toString() === userId);
        const { attendees, ...eventWithoutAttendees } = event;
        return {
            ...eventWithoutAttendees,
            isAttendee
        }
    });

    return res.status(200).json(eventsWithAttendeeStatus);
});

// @desc Check PNM into event
// @route POST /events/pnm/checkin
// @access Private
const checkIntoEvent = asyncHandler(async (req, res) => {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const event = await Event.findByIdAndUpdate(
        { _id: eventId, "attendees.user": { $ne: userId } },
        { $addToSet: { attendees: { user: userId, checkInAt: new Date() } } },
        { new: true }
    );

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    if (event.chapter) {
        const chapter = await Chapter.findById(event.chapter);

        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }

        const semesterName = event.semester;

        const semester = chapter.semesters.find((sem) => sem.semester === semesterName);

        if (!semester) {
            return res.status(400).json({ message: 'Semester not found' });
        }

        const pnmInList = semester.pnmList.some((pnmObj) => pnmObj.pnm.toString() === userId);

        if (!pnmInList) {
            semester.pnmList.push({ pnm: userId });
        }

        await chapter.save();
    };

    return res.status(200).json({ message: 'PNM checked in' });
});

// @desc Get active events
// @route GET /events/active?chapterId={chapterId}
// @access Private
const getActiveEvents = asyncHandler(async (req, res) => {
    const { chapterId } = req.query;

    if (!chapterId) {
        return res.status(400).json({ message: 'Chapter ID is required' });
    }

    const events = await Event.find({ chapter: chapterId }).select('-createdAt -updatedAt')
    .populate({
        path: 'author',
        select: 'firstName lastName profilePicture'
    })
    .populate({
        path: 'attendees.user',
        select: 'firstName lastName profilePicture'
    });

    if (!events?.length) {
        return res.status(204).json({ message: 'No events found' });
    }

    return res.status(200).json(events);
});

// @desc Verify PNM attendance
// @route POST /events/verify
// @access Private
const verifyAttendance = asyncHandler(async (req, res) => {
    const { eventId, userId } = req.body;
    console.log(userId)

    if (!eventId || !userId) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    const attendee = event.attendees.find((attendee) => attendee.user.toString() === userId);

    if (!attendee) {
        return res.status(404).json({ message: 'User is not an attendee' });
    }

    attendee.verified = !attendee.verified;

    await event.save();

    return res.status(200).json({ message: 'User attendance toggled' })
});

module.exports = {
    createNewEvent,
    deleteEvent,
    updateEvent,
    getPNMEvents,
    checkIntoEvent,
    getActiveEvents,
    verifyAttendance,
}