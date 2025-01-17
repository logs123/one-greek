import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '../types/authTypes';

const useAuth = () => {
    const token = useSelector(selectCurrentToken);

    if (token) {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        
        const {
            id,
            roles,
            isVerified,
            email,
            name,
            phoneNumber,
            studentId,
            profilePicture,
            organization,
            chapter,
            pnmInfo,
            socialMediaHandles
        } = decoded;

        return {
            id,
            roles,
            isVerified,
            email,
            name,
            phoneNumber,
            studentId,
            profilePicture,
            organization,
            chapter,
            pnmInfo,
            socialMediaHandles
        };
    }
}

export default useAuth;