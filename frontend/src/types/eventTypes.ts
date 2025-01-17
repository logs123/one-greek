export interface EventPayload {
    name: string;
    organization: string;
    author: string;
    start: Date;
    end: Date;
    type: string;
    semester: string;
    chapter?: string;
    locationName?: string;
    locationAddress?: string;
    visibility?: string;
}

export interface PNMEvent {
    _id: string;
    name: string;
    chapter?: {
        name: string;
        _id: string;
    };
    organization: string;
    auther: string;
    location?: {
        name?: string;
        address?: string;
    };
    start: Date;
    end: Date;
    type: string;
    visibility: boolean;
    semester: string;
    isAttendee: boolean;
    createdAt: Date;
    upadtedAt: Date;
}

export interface PNMEventsPaylod {
    userId: string;
    organizationId: string;
}

export interface ActiveEvent {
    _id: string;
    name: string;
    chapter: string;
    organization: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
    };
    location?: {
        name?: string;
        address?: string;
    };
    start: Date;
    end: Date;
    type: string;
    visibility: boolean;
    semester: string;
    attendees: string;
}