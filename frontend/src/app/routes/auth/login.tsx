import { useState } from 'react';
import AuthLayout from '../../../components/layouts/auth-layout';
import Logo from '../../../assets/images/logo-full.png';
import { LoginForm } from '../../../features/auth/components/login-form';
import SignupModal from '../../../features/auth/components/signup-modal';
import { useLoginMutation, useSignupMutation } from '../../../features/auth/api/authApi';
import { LoginCredentials, SignupPayload } from '../../../types/authTypes';
import Spinner from '../../../components/ui/spinner/spinner';
import { useGetOrganizationsQuery } from '../../../features/organization/api/organizationApi';

const LoginRoute = () => {
    const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);
    const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
    const [signup, { isLoading: isSignupLoading, error: signupError}] = useSignupMutation();

    const { data: organizations = [] } = useGetOrganizationsQuery();

    const handleLogin = async (credentials: LoginCredentials) => {
        try {
            await login(credentials).unwrap();
        } catch (err) {
            console.error('Login failed:', err);
        }
    }

    const handleSignup = async (payload: SignupPayload) => {
        try {
            await signup(payload).unwrap();
        } catch (err) {
            console.log('Signup failed:', err);
        }
    }

    if (isLoginLoading || isSignupLoading) {
        return (
            <div className="flex justify-center items-center h-svh w-full">
                <Spinner />
            </div>
        )
    }

    return (
        <AuthLayout>
            <div className='flex flex-col justify-center items-center gap-y-4'>
                <img
                    src={Logo}
                    alt='Logo'
                    className='block w-72 lg:w-96'
                />
                <h1 className='hidden lg:block'>Simplifying Greek Life.</h1>
            </div>
            <LoginForm
                login={handleLogin}
                error={loginError}
                onSignup={() => setIsSignupModalOpen(true)}
            />
            <SignupModal
                signup={handleSignup}
                error={signupError}
                organizations={organizations}
                isOpen={isSignupModalOpen}
                onClose={() => setIsSignupModalOpen(false)}
            />
        </AuthLayout>
    );
}

export default LoginRoute;