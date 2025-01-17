const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        chapters: [
            {
                name: {
                    type: String,
                    required: true
                },
                chapterId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Chapter',
                    required: true
                }
            }
        ],
        events: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event'
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Organization', organizationSchema);