const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        roles: {
            type: [String],
            required: true,
            validate: {
                validator: function (rolesArray) {
                    const allowedRoles = ['PNM', 'Active', 'Admin'];
                    return rolesArray.every((role) => allowedRoles.includes(role));
                },
                message:'Invalid role'
            }
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        studentId: {
            type: Number,
            required: true
        },
        profilePicture: {
            type: String,
            required: true
        },
        socialMediaHandles: {
            type: Map,
            of: String,
            default: () => new Map(),
            validate: {
                validator: function (map) {
                    if (!map || map.size === 0) {
                        return true;
                    }
                    
                    if (this.roles.includes('PNM')) {
                        const allowedKeys = ['Instagram', 'LinkedIn'];
                        return Array.from(map.keys()).every((key) => allowedKeys.includes(key));
                    }
                    
                    return false;
                },
                message: 'Invalid social media handles. Only Instagram and LinkedIn are allowed for PNMs.'
            }
        },          
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: true
        },
        chapter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chapter',
            required: function () {
                return this.roles.includes('Active');
            }
        },
        pnmInfo: {
            type: new mongoose.Schema({
                city: {
                    type: String,
                    trim: true,
                    required: true
                },
                state: {
                    type: String,
                    trim: true,
                    validate: {
                        validator: function (value) {
                            return this.country !== 'US' || (value && value.length > 0);
                        },
                        message: 'State missing'
                    }
                },
                country: {
                    type: String,
                    trim: true,
                    required: true
                },
                gradeLevel: {
                    type: String,
                    enum: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
                    required: true
                },
                major: {
                    type: String,
                    trim: true,
                    required: true
                },
                secondMajor: {
                    type: String,
                    trim: true
                },
                minor: {
                    type: String,
                    trim: true
                },
                gpa: {
                    type: Number,
                    min: 0.0,
                    max: 5.0,
                    validate: {
                        validator: function (value) {
                            return value >= 0 && value <= 4.0;
                        },
                        message: 'Invalid GPA'
                    },
                    required: true
                },
                chaptersFollowing: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Chapter'
                    }
                ]
            }),
            required: function () {
                return this.roles.includes('PNM');
            }
        },
        hasAgreedToTerms: {
            type: Boolean,
            default: false
        },
        termsAgreedAt: {
            type: Date,
            default: null
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);