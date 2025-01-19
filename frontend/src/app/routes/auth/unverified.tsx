import Logo from '../../../assets/images/logo-full.png';
import Spinner from '../../../components/ui/spinner/spinner';
import { useSendLogoutMutation } from '../../../features/auth/api/authApi';

const UnverifiedRoute = () => {
    const [logout, { isLoading }] = useSendLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error('Logout failed:', err);
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-svh w-full">
                <Spinner />
            </div>
        )
    }

    return (
        <div className='flex flex-col px-4 gap-8 h-screen justify-center items-center bg-[#E4EFF3]'>
            <img
                src={Logo}
                alt='Logo'
                className='h-12'
            />
            <div className='flex flex-col items-center gap-4 border-red-300 border rounded-lg p-6 bg-red-100'>
                <div className='text-center text-2xl font-bold text-red-500'>Pending Verification</div>
                <div className='text-center'>Please wait for your chapter leadership to accept your account.</div>
            </div>
            <div className='flex'>
                <button
                    type='button'
                    className='bg-pacific-blue hover:bg-turquoise-blue text-white font-bold py-2 px-4 rounded-lg ml-2'
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default UnverifiedRoute;