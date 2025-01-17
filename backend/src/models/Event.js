const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        chapter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chapter'
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        location: {
            name: {
                type: String
            },
            address: {
                type: String
            }
        },
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        type: {
            type: String,
            enum: ['Recruitment'],
            required: true
        },
        visibility: {
            type: String,
            enum: ['public', 'private'],
            default: 'public',
            required: true
        },
        semester: {
            type: String,
            required: true
        },
        attendees: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                checkInAt: {
                    type: Date,
                    required: true
                },
                verified: {
                    type: Boolean,
                    default: false
                }
            }
        ],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Event', eventSchema);