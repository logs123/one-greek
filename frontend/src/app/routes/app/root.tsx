import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import PersistLogin from '../../../features/auth/components/persist-login';
import AppLayout from '../../../components/layouts';
import LoginRoute from '../auth/login';
import DashboardRoute from './dashboard';
import UnverifiedRoute from '../auth/unverified';
import ProfileRoute from './profile';
import RequireAuth from '../../../features/auth/components/require-auth';
import EventRoute from './event';
import RecruitmentRoute from './recruitment';

const AppRoot = () => {
    const auth = useAuth();

    return (
        <Routes>
            <Route element={<PersistLogin />}>
                <Route element={<AppLayout />}>
                    <Route index path='/' element={auth ? ((auth.roles.includes('PNM') || auth.isVerified) ? <DashboardRoute /> : <UnverifiedRoute/>) : <LoginRoute />} />
                    
                    <Route element={<RequireAuth allowedRoles={['Active']} />}>
                        <Route path='/events' element={<EventRoute />} />
                        <Route path='/recruitment' element={<RecruitmentRoute />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={['PNM', 'Active']} />}>
                        <Route path='/profile' element={auth ? ((auth.roles.includes('PNM') || auth.isVerified) ? <ProfileRoute /> : <UnverifiedRoute/>) : <LoginRoute />} />
                    </Route>
                    
                    <Route path='/*' element={<Navigate to='/' replace />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoot;