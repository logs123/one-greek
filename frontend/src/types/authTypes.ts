import { JwtPayload } from 'jwt-decode';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    firstName: string;
    lastName: string;
    studentId: string;
    phoneNumber: string;
    email: string;
    password: string;
    organization: string;
    roles: string;
    profilePicture: File | null;
    chapter: string;
    city: string;
    state: string;
    country: string;
    gradeLevel: string;
    major: string;
    secondMajor: string;
    minor: string;
    gpa: string;
    instagram: string;
    linkedin: string;
    hasAgreedToTerms: boolean;
}

export interface SignupPayload {
    email: string;
    password: string;
    roles: string[];
    firstName: string;
    lastName: string;
    phoneNumber: string;
    studentId: string;
    profilePicture: File | null;
    socialMediaHandles?: {
        Instagram?: string;
        LinkedIn?: string;
    }
    organization: string;
    chapter?: string;
    pnmInfo?: {
        city?: string;
        state?: string;
        country?: string;
        gradeLevel?: string;
        major?: string;
        secondMajor?: string;
        minor?: string;
        gpa?: string;
    }
    hasAgreedToTerms: boolean;
}

export interface AccessToken {
    accessToken: string;
}

export interface LogoutResponse {
    success: boolean;
}

export interface CustomJwtPayload extends JwtPayload {
    id: string;
    roles: string[];
    isVerified: boolean;
    email: string;
    name: string;
    phoneNumber: string;
    studentId: number;
    profilePicture: string;
    organization: string;
    chapter?: string;
    pnmInfo?: {
        city?: string;
        state?: string;
        country?: string;
        gradeLevel?: string;
        major?: string;
        secondMajor?: string;
        minor?: string;
        gpa?: string;
        chaptersFollowing: string[];
    }
    socialMediaHandles?: {
        Instagram?: string;
        LinkedIn?: string;
    }
}