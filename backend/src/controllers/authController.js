const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// @desc Signup
// @route POST /auth/signup
// @access Public
const signup = asyncHandler(async (req, res) => {
    const {
        email,
        password,
        roles,
        firstName,
        lastName,
        phoneNumber,
        studentId,
        socialMediaHandles = '{}',
        organization,
        chapter = null,
        pnmInfo = '{}',
        hasAgreedToTerms
    } = req.body;

    const rolesArray = JSON.parse(roles);
    
    if (!email || !password || !Array.isArray(rolesArray) || !rolesArray.length || !firstName || !lastName || !phoneNumber || !studentId || !organization || hasAgreedToTerms === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const userObject = {
        email,
        'password': hashedPwd,
        roles: rolesArray,
        firstName: firstName.trimStart().charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.trimStart().charAt(0).toUpperCase() + lastName.slice(1),
        phoneNumber,
        studentId,
        profilePicture: req.file.location,
        organization,
        chapter: roles.includes('Active') ? chapter : null,
        hasAgreedToTerms,
        termsAgreedAt: hasAgreedToTerms ? new Date() : null,
        pnmInfo: roles.includes('PNM') ? JSON.parse(pnmInfo || '{}') : undefined,
        socialMediaHandles: roles.includes('PNM') ? JSON.parse(socialMediaHandles || '{}') : undefined
    }

    const user = await User.create(userObject);

    const payload = {
        id: user._id,
        roles: user.roles,
        isVerified: user.isVerified,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        phoneNumber: user.phoneNumber,
        studentId: user.studentId,
        profilePicture: user.profilePicture,
        organization: user.organization,
    }

    if (user.roles.includes('Active')) {
        payload.chapter = user.chapter;
    }

    if (user.roles.includes('PNM')) {
        payload.pnmInfo = user.pnmInfo || {};
        payload.socialMediaHandles = user.socialMediaHandles || {};
    }
    
    if (user) {
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
    
        const refreshToken = jwt.sign(
            {
                id: user._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );
    
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        return res.status(201).json({ accessToken });
    } else {
        return res.status(400).json({ message: `Invalid user data received` });
    }
});

// @desc Login
// @route POST /auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const foundUser = await User.findOne({ email }).lean().exec();

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload = {
        id: foundUser._id,
        roles: foundUser.roles,
        isVerified: foundUser.isVerified,
        email: foundUser.email,
        name: `${foundUser.firstName} ${foundUser.lastName}`,
        phoneNumber: foundUser.phoneNumber,
        studentId: foundUser.studentId,
        profilePicture: foundUser.profilePicture,
        organization: foundUser.organization,
    }

    if (foundUser.roles.includes('Active')) {
        payload.chapter = foundUser.chapter;
    }

    if (foundUser.roles.includes('PNM')) {
        payload.pnmInfo = foundUser.pnmInfo || {};
        payload.socialMediaHandles = foundUser.socialMediaHandles || {};
    }

    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        {
            id: foundUser._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    return res.status(200).json({ accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public
const refresh = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const foundUser = await User.findById(decoded.id).select('-password').lean().exec();

            if (!foundUser) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const payload = {
                id: foundUser._id,
                roles: foundUser.roles,
                isVerified: foundUser.isVerified,
                email: foundUser.email,
                name: `${foundUser.firstName} ${foundUser.lastName}`,
                phoneNumber: foundUser.phoneNumber,
                studentId: foundUser.studentId,
                profilePicture: foundUser.profilePicture,
                organization: foundUser.organization,
            }
        
            if (foundUser.roles.includes('Active')) {
                payload.chapter = foundUser.chapter;
            }
        
            if (foundUser.roles.includes('PNM')) {
                payload.pnmInfo = foundUser.pnmInfo || {};
                payload.socialMediaHandles = foundUser.socialMediaHandles || {};
            }

            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            return res.status(200).json({ accessToken });
        })
    );
}

// @desc Logout
// @route POST /auth/logout
// @access Public
const logout = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }

    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    });

    return res.status(200).json({ message: 'Cookie cleared' });
}

module.exports = {
    signup,
    login,
    refresh,
    logout,
};