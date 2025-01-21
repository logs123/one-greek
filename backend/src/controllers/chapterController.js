const Chapter = require('../models/Chapter');
const Organization = require('../models/Organization');
const User = require('../models/User');
const Event = require('../models/Event');
const { s3 } = require('../config/s3');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const asyncHandler = require('express-async-handler');

// @desc Get chapters for PNM chapter list
// @route GET /chapters?userId={userId}
// @access Private
const getPNMChapters = asyncHandler(async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'Used ID is required' });
    }

    const user = await User.findById(userId).populate('organization').exec();

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const organization = await Organization.findById(user.organization).exec();

    if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
    }

    const chapters = organization.chapters.map((chapter) => ({
        chapterId: chapter.chapterId,
        name: chapter.name,
        isFollowing: user.pnmInfo?.chaptersFollowing?.some(
            (followedChapterId) => followedChapterId.toString() === chapter.chapterId.toString()
        )
    }));

    return res.status(200).json(chapters);
});

// @desc Create new chapter
// @route POST /chapters
// @access Private
const createChapter = asyncHandler(async (req, res) => {
    const { name, organization } = req.body;

    if (!name || !organization) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const duplicate = await Chapter.findOne({ name, organization }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate chapter name for organization' });
    }

    const chapter = await Chapter.create({ name, organization });

    if (!chapter) {
        return res.status(400).json({ message: 'Invalid chapter data received' });
    }

    const org = await Organization.findByIdAndUpdate(
        organization,
        { $addToSet: { chapters: { name, chapterId: chapter._id } } },
        { new: true }
    );

    if (!org) {
        return res.status(404).json({ message: 'Organization not found' });
    }

    return res.status(201).json({ message: 'New chapter created' });
});

// @desc Delete a chapter
// @route DELETE /chapters
// @access Private
const deleteChapter = asyncHandler(async (req, res) => {
    const { chapterId } = req.body;

    if (!chapterId) {
        return res.status(400).json({ message: 'Chapter ID required' });
    }

    const chapter = await Chapter.findById(chapterId).exec();

    if (!chapter) {
        return res.status(404).json({ message: 'No chapter found' });
    }

    const organization = await Organization.findByIdAndUpdate(
        chapter.organization,
        { $pull: { chapters: { chapterId } } },
        { new: true }
    );

    if (!organization) {
        return res.status(404).json({ message: 'Organization not found' })
    }
    
    await User.updateMany(
        { 'pnmInfo.chaptersFollowing': chapterId },
        { $pull: { 'pnmInfo.chaptersFollowing': chapterId } }
    );

    await Event.deleteMany({ chapter: chapterId });

    await chapter.deleteOne();

    return res.status(200).json({ message: 'Chapter deleted' });
});

// @desc Get a chapter
// @route GET /chapters/:chapterId
// @access Private
const getChapter = asyncHandler(async (req, res) => {
    const { chapterId } = req.params;

    if (!chapterId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const chapter = await Chapter.findById(chapterId)
    .select('-organization -events -semesters');

    if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
    }

    return res.status(200).json(chapter);
});

// @desc Update a chapter
// @route PATCH /chapters/:chapterId
// @access Private
const updateChapter = asyncHandler(async (req, res) => {
    const { chapterId } = req.params;
    const updateData = req.body;

    if (!chapterId || !updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const chapter = await Chapter.findById(chapterId).exec();

    if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
    }

    if (req.file) {
        if (chapter.profilePicture) {
            const oldImageKey = decodeURIComponent(chapter.profilePicture.split('/').pop());
            const deleteParams = {
                Bucket: 'onegreekpictures',
                Key: oldImageKey,
            };

            try {
                await s3.send(new DeleteObjectCommand(deleteParams));
            } catch (error) {
                return res.status(500).json({ message: 'Error deleting old profile picture from S3. Please try again.' });
            }
        }

        updateData.profilePicture = req.file.location;
    }

    const updatedChapter = await Chapter.findByIdAndUpdate(
        chapterId,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!updatedChapter) {
        return res.status(500).json({ message: 'Failed to update chapter' });
    }

    return res.status(200).json({ message: 'Chapter updated successfully' });
});

// @desc Create new semester
// @route POST /chapters/semester
// @access Private
const createNewSemester = asyncHandler(async (req, res) => {
    const { chapterId, semesterName } = req.body;

    if (!chapterId || !semesterName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const chapter = await Chapter.findByIdAndUpdate(
        chapterId,
        { $push: { semesters: { semester: semesterName, pnmList: [] } } },
        { new: true }
    );

    if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
    }
    
    return res.status(200).json({ message: 'New semester created' });
});

// @desc Vote on a PNM
// @route POST /chapters/pnm/vote
// @access Private
const togglePNMVote = asyncHandler(async (req, res) => {
    const { chapterId, pnmId, userId, semesterName, vote } = req.body;

    if (!chapterId || !pnmId || !userId || !semesterName || !vote) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
    }

    const semester = chapter.semesters.find((sem) => sem.semester === semesterName);

    if (!semester) {
        return res.status(404).json({ message: 'Semester not found' });
    }

    const pnmEntry = semester.pnmList.find((pnmEntry) => pnmEntry.pnm.toString() === pnmId);

    if (!pnmEntry) {
        return res.status(404).json({ message: 'PNM not found' });
    }

    ['yes', 'maybe', 'no'].forEach((voteType) => {
        const index = pnmEntry.votes[voteType].findIndex((id) => id.toString() === userId);
        if (index !== -1) {
            pnmEntry.votes[voteType].splice(index, 1);
        }
    });

    if (['yes', 'maybe', 'no'].includes(vote)) {
        if (!pnmEntry.votes[vote].includes(userId)) {
            pnmEntry.votes[vote].push(userId);
        }
    } else {
        return res.status(400).json({ message: 'Invalid vote type' });
    }

    await chapter.save();

    res.status(200).json({ message: 'Vote toggled' });
});

// @desc Final vote on a PNM
// @route POST /chapters/pnm/finalvote
// @access Private
const togglePNMFinalVote = asyncHandler(async (req, res) => {
    const { chapterId, pnmId, semesterName, vote } = req.body;

    if (!chapterId || !pnmId || !semesterName || !vote) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
    }

    const semester = chapter.semesters.find((sem) => sem.semester === semesterName);

    if (!semester) {
        return res.status(404).json({ message: 'Semester not found' });
    }

    const pnmEntry = semester.pnmList.find((pnmEntry) => pnmEntry.pnm.toString() === pnmId);

    if (!pnmEntry) {
        return res.status(404).json({ message: 'PNM not found' });
    }

    pnmEntry.finalVote = vote;

    await chapter.save();

    res.status(200).json({ message: 'Final vote toggled' });
});

// @desc Toggle note on a PNM
// @route POST /chapters/pnm/note
// @access Private
const togglePNMNote = asyncHandler(async (req, res) => {
    const { chapterId, pnmId, userId, semesterName, note } = req.body;

    if (!chapterId || !pnmId || !userId || !semesterName || !note) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
        return res.status(40).json({ message: 'Chapter not found' });
    }

    const semester = chapter.semesters.find((sem) => sem.semester === semesterName);

    if (!semester) {
        return res.status(404).json({ message: 'Semester not found' });
    }

    const pnmEntry = semester.pnmList.find((pnmEntry) => pnmEntry.pnm.toString() === pnmId);

    if (!pnmEntry) {
        return res.status(404).json({ message: 'PNM not found' });
    }

    const existingNoteIndex = pnmEntry.notes.findIndex((note) => note.addedBy.toString() === userId);

    if (existingNoteIndex !== -1) {
        pnmEntry.notes[existingNoteIndex].content = note;
        pnmEntry.notes[existingNoteIndex].createdAt = new Date();
    } else {
        pnmEntry.notes.push({
            addedBy: userId,
            content: note,
            createdAt: new Date()
        });
    }

    await chapter.save();

    return res.status(200).json({ message: 'Note toggled' })
});

module.exports = {
    getPNMChapters,
    createChapter,
    deleteChapter,
    getChapter,
    updateChapter,
    createNewSemester,
    togglePNMVote,
    togglePNMNote,
    togglePNMFinalVote,
};