export interface ActiveUser {
    _id: string;
    email: string;
    roles: string[];
    firstName: string;
    lastName: string;
    phoneNumber: string;
    studentId: number;
    profilePicture: string;
    isVerified: boolean;
}

export interface Votes {
    yes: { _id: string; firstName: string; lastName: string; profilePicture: string }[];
    maybe: { _id: string; firstName: string; lastName: string; profilePicture: string }[];
    no: { _id: string; firstName: string; lastName: string; profilePicture: string }[];
}

export interface PNMUser {
    pnm: {
        _id: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
        phoneNumber: string;
        pnmInfo: {
            gradeLevel: string;
            city: string;
            state?: string;
            country: string;
            major: string;
            gpa: number;
            minor?: string;
            secondMajor?: string;
            semester: string;
        };
        socialMediaHandles?:{
            Instagram?: string;
            LinkedIn?: string;
        };
    };
    votes: Votes;
    notes: {
        _id: string;
        content: string;
        createdAt: string;
        addedBy: {
            _id: string;
            firstName: string;
            lastName: string;
            profilePicture: string;
        };
    }[];
    userVote: 'yes' | 'maybe' | 'no' | 'pending';
    userNote: {
        addedBy: {
            firstName: string;
            lastName: string;
            profilePicture: string;
            _id: string;
        };
        content: string;
        createdAt: Date;
    }
    finalVote: string;
}
