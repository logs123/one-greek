const User = require('../models/User');
const Chapter = require('../models/Chapter');
const Event = require('../models/Event');
const { s3 } = require('../config/s3');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const asyncHandler = require('express-async-handler');

// @desc PNM follows/unfollows a chapter
// @route POST /users/follow
// @access Private
const toggleFollowChapter = asyncHandler(async (req, res) => {
    const { userId, chapterId } = req.body;

    if (!userId || !chapterId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isFollowing = user.pnmInfo.chaptersFollowing.includes(chapterId);

    if (isFollowing) {
        user.pnmInfo.chaptersFollowing = user.pnmInfo.chaptersFollowing.filter((id) => id.toString() !== chapterId);
    } else {
        user.pnmInfo.chaptersFollowing.push(chapterId);
    }

    await user.save();
    
    return res.status(200).json({ message: isFollowing ? 'Unfollowed chapter' : 'Followed chapter' });
});

// @desc Get PNM list for active user
// @route GET /users/pnms <- NEED TO UPDATE to req.query
// @access Private
const getPNMList = asyncHandler(async (req, res) => {
    const { userId, chapterId, semesterName } = req.body;

    if (!chapterId || !semesterName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const chapter = await Chapter.findOne({
        _id: chapterId,
        'semesters.semester': semesterName
    }).populate({
        path: 'semesters.pnmList.pnm',
        select: '_id firstName lastName phoneNumber profilePicture socialMediaHandles pnmInfo'
    })

    if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
    }

    const semester = chapter.semesters.find((sem) => sem.semester === semesterName);

    if (!semester) {
        return res.status(404).json({ message: 'Semester not found' });
    }

    const pnmList = semester.pnmList.map((pnmEntry) => {
        const { votes, notes, pnm } = pnmEntry;

        let userVote = 'pending';
        if (votes.yes.some((id) => id.toString() === userId)) {
            userVote = 'yes';
        } else if (votes.maybe.some((id) => id.toString() === userId)) {
            userVote = 'maybe';
        } else if (votes.no.some((id) => id.toString() === userId)) {
            userVote = 'no';
        }

        const userNote = notes.find((note) => note.addedBy.toString() === userId);

        return {
            pnm,
            userVote,
            userNote: userNote ? userNote : null
        }
    })

    return res.status(200).json(pnmList);
});

// @desc Get actives members for chapter
// @route GET /users/actives?chapterId={chapterId}
// @access Private
const getActiveMembers = asyncHandler(async (req, res) => {
    const { chapterId } = req.query;

    if (!chapterId) {
        return res.status(400).json({ message: 'Chapter ID required' });
    }

    const users = await User.find({ chapter: chapterId })
    .select('-password -organization -chapter -hasAgreedToTerms -termsAgreedAt -createdAt -updatedAt -socialMediaHandles');

    if (!users) {
        return res.status(404).json({ message: 'Users not found' });
    }

    res.status(200).json(users);
});

// @desc Verify active member
// @route POST /users/verify
// @access Private
const verifyMember = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID required' });
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: { isVerified: true } },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({ message: 'User not founed' });
    }

    return res.status(200).json({ message: 'Member verified' });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID reqruied' });
    }

    const user = await User.findById(userId).exec();

    if (!user) {
        return res.status(400).json({ message: 'No user found' });
    }

    if (user.profilePicture) {
        const profilePictureKey = decodeURIComponent(user.profilePicture.split('/').pop());
        const deleteParams = {
            Bucket: 'onegreekpictures',
            Key: profilePictureKey,
        };

        try {
            await s3.send(new DeleteObjectCommand(deleteParams));
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting profile picture' });
        }
    }

    await Event.updateMany(
        { 'attendees.user': userId },
        { $pull: { attendees: { user: userId } } }
    );

    await user.deleteOne();

    return res.status(200).json({ message: 'User deleted' });
});

// @desc Promote/demote admin for active user
// @route POST /users/admin
// @access Private
const toggleAdmin = asyncHandler(async (req, res) => {
    const { userId, position } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID required' });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isAdmin = user.roles.includes('Admin');

    if (isAdmin) {
        user.roles = user.roles.filter((role) => role !== 'Admin');

        if (position) {
            const chapter = await Chapter.findByIdAndUpdate(
                user.chapter,
                { $pull: { officers: { officer: userId, title: position } } },
                { new: true }
            );

            if (!chapter) {
                return res.status(404).json({ message: 'Chapter not found' });
            }
        }
    } else {
        user.roles.push('Admin');

        if (position) {
            const chapter = await Chapter.findByIdAndUpdate(
                user.chapter,
                { $push: { officers: { officer: userId, title: position } } },
                { new: true }
            );

            if (!chapter) {
                return res.status(404).json({ message: 'Chapter not found' });
            }
        }
    }

    await user.save();

    return res.status(200).json({ message: isAdmin ? 'Demoted user' : 'Promoted user' });
});

module.exports = {
    toggleFollowChapter,
    getPNMList,
    getActiveMembers,
    verifyMember,
    deleteUser,
    toggleAdmin,
}