export interface PNMChapter {
    name: string;
    chapterId: string;
    isFollowing: boolean;
}

export interface ActiveChapter {
    _id: string;
    bio?: string;
    instagram?: string;
    name: string;
    officers?: {
        officer: string;
        title: string;
    };
    profilePicture: string;
}