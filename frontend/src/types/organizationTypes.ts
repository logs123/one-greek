export interface Chapter {
    name: string;
    chapterId: string;
}

export interface Organization {
    _id: string;
    name: string;
    chapters: Chapter[];
}