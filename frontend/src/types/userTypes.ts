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