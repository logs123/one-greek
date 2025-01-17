import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Logo from '../../assets/images/logo-alt-white.png';
import { useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../../features/auth/api/authApi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { CgProfile } from 'react-icons/cg';
import { IoLogOutOutline } from 'react-icons/io5';
import Spinner from '../ui/spinner/spinner';

type LayoutProps = {
    children: React.ReactNode;
}

const PnmLayout = ({ children }: LayoutProps) => {
    const auth = useAuth();

    const [isNavModalOpen, setIsNavModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const [logout, { isLoading }] = useSendLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/', { replace: true });
        } catch (err) {
            console.log('Logout failed:', err);
        }
    }

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Spinner/>
            </div>
        )
    }

    return (
        <div className='flex flex-col h-screen bg-[#E4EFF3]'>
            <div className='flex justify-between items-center w-full bg-pacific-blue py-2 px-4 border-b-2 border-gray-200'>
                <img
                    src={Logo}
                    alt='Alt Logo'
                    className='h-10'
                />
                <button
                    type='button'
                    className={`relative p-2 rounded-full ${isNavModalOpen ? 'bg-white bg-opacity-50' : 'hover:bg-white hover:bg-opacity-20'}`}
                    onClick={() => setIsNavModalOpen(!isNavModalOpen)}
                >
                    <img
                        src={auth?.profilePicture}
                        alt='Profile Picture'
                        className='h-12 w-12 rounded-full object-cover'
                    />
                </button>
            </div>
            {isNavModalOpen && (
                <div className='absolute flex flex-col right-1 top-[84px] border-gray-200 bg-white justify-center w-40 rounded-lg shadow-xl drop-shadow'>
                    <button
                        type='button'
                        className='flex justify-between items-center px-3 py-1 hover:bg-gray-300 hover:bg-opacity-25 rounded-t-lg'
                        onClick={() => navigate('/')}
                    >
                        <p className='font-bold'>Dashboard</p>
                        <LuLayoutDashboard size={20} />
                    </button>
                    <hr className='h-px bg-gray-300 border-0'/>
                    <button
                        type='button'
                        className='flex justify-between items-center px-3 py-1 hover:bg-gray-300 hover:bg-opacity-25'
                        onClick={() => navigate('/profile')}
                    >
                        <p className='font-bold'>Profile</p>
                        <CgProfile size={20} />
                    </button>
                    <hr className='h-px bg-gray-300 border-0'/>
                    <button
                        type='button'
                        className='flex justify-between items-center px-3 py-1 hover:bg-gray-300 hover:bg-opacity-25 rounded-b-lg'
                        onClick={handleLogout}
                    >
                        <p className='font-bold'>Logout</p>
                        <IoLogOutOutline size={20} />
                    </button>
                </div>
            )}
            {children}
        </div>
    );
}

export default PnmLayout;