import { useSendLogoutMutation } from "../../../features/auth/api/authApi";

const ActiveNavbar = () => {
    const [logout, { isLoading }] = useSendLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.log('Logout failed:', err);
        }
    }

    return (
        <div className='flex flex-col h-screen w-56'>
            <div className='p-4'>User Info</div>
            <div className='flex-1 p-4'>
                <div>Link 1</div>
                <div>Link 2</div>
                <div>Link 3</div>
            </div>
            <div className='p-4 mt-auto'>
                <button
                    type='button'
                    className='bg-pacific-blue hover:bg-turquoise-blue text-white font-bold py-2 px-4 rounded w-full'
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            </div>
        </div>
    )
}

export default ActiveNavbar;