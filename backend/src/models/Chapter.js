const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: true
        },
        events: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event'
            }
        ],
        semesters: [
            {
                semester: {
                    type: String,
                    required: true
                },
                pnmList: [
                    {
                        pnm: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'User',
                            required: true
                        },
                        votes: {
                            yes: [
                                {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: 'User',
                                    default: []
                                }
                            ],
                            maybe: [
                                {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: 'User',
                                    default: []
                                }
                            ],
                            no: [
                                {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: 'User',
                                    default: []
                                }
                            ]
                        },
                        finalVote: {
                            type: String,
                            enum: ['yes', 'maybe', 'no', 'pending'],
                            default: 'pending'
                        },
                        notes: [
                            {
                                addedBy: {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: 'User',
                                    required: true
                                },
                                content: {
                                    type: String,
                                    required: true
                                },
                                createdAt: {
                                    type: Date,
                                    default: Date.now
                                }
                            }
                        ],
                    }
                ]
            }
        ],
        profilePicture: {
            type: String,
            default: ''
        },
        bio: {
            type: String,
            default: ''
        },
        instagram: {
            type: String,
            default: ''
        },
        officers: [
            {
                officer: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                title: {
                    type: String,
                    required: true,
                    enum: ['President', 'Rush Chair']
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Chapter', chapterSchema);