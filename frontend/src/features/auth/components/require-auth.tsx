import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

interface RequireAuthProps {
    allowedRoles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
    const location = useLocation();
    const { roles } = useAuth() || {};

    const content = (
        roles?.some((role: string) => allowedRoles.includes(role)) ?
            <Outlet />
            :
            <Navigate to='/' state={{ from: location }} replace />
    );
    
    return content;
}

export default RequireAuth;