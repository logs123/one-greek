import React, { useState } from 'react';
import Logo from '../../assets/images/logo-alt-white.png';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../../features/auth/api/authApi';
import Spinner from '../ui/spinner/spinner';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { CgProfile } from 'react-icons/cg';
import { IoLogOutOutline } from 'react-icons/io5';

type LayoutProps = {
    children: React.ReactNode;
}

const ActiveLayout = ({ children }: LayoutProps) => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [logout, { isLoading }] = useSendLogoutMutation();

    const handleNavigate = (path: string) => {
        if (location.pathname !== path) {
            navigate(path)
        } else {
            setIsModalOpen(false);
        }
    }
    
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error('Logout failed:', err);
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
        <div className='flex flex-col lg:flex-row h-screen bg-[#E4EFF3]'>
            <div className='hidden fixed z-50 h-full lg:flex lg:flex-col justify-between bg-[#325D6C] w-64 px-6 gap-8'>
                <div className='flex flex-col'>
                    <img
                        src={Logo}
                        alt='Alt Logo'
                        className='my-[70px] self-center'
                    />
                    <nav className='flex flex-col text-white space-y-6 text-lg'>
                        <Link
                            to='/'
                            className={`w-full text-left p-2 pl-4 rounded-lg ${location.pathname === '/' ? 'bg-[#4f8698] font-bold' : 'hover:bg-[#4f8698]'}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to='/events'
                            className={`w-full text-left p-2 pl-4 rounded-lg ${location.pathname === '/events' ? 'bg-[#4f8698] font-bold' : 'hover:bg-[#4f8698]'}`}
                        >
                            Events
                        </Link>
                        <Link
                            to='/recruitment'
                            className={`w-full text-left p-2 pl-4 rounded-lg ${location.pathname === '/recruitment' ? 'bg-[#4f8698] font-bold' : 'hover:bg-[#4f8698]'}`}
                        >
                            Recruitment
                        </Link>
                    </nav>
                </div>
                <button
                    type='button'
                    className='bg-pacific-blue hover:bg-turquoise-blue text-white font-bold py-2 px-4 rounded-2xl mb-8'
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            </div>
            <div className='lg:hidden fixed z-50 w-full flex items-center bg-[#325D6C] justify-between p-4'>
                <img
                    src={Logo}
                    alt='Alt Logo'
                    className='w-48'
                />
                <button
                    type='button'
                    className={`relative p-2 rounded-full ${isModalOpen ? 'bg-white bg-opacity-50' : 'hover:bg-white hover:bg-opacity-20'}`}
                    onClick={() => setIsModalOpen(!isModalOpen)}
                >
                    <img
                        src={auth?.profilePicture}
                        alt='Profile Picture'
                        className='h-12 w-12 rounded-full object-cover'
                    />
                </button>
                {isModalOpen && (
                    <div className='absolute flex flex-col right-1 top-[100px] border-gray-200 bg-white justify-center w-44 rounded-lg shadow-xl drop-shadow z-50'>
                        <button
                            type='button'
                            className='flex justify-between items-center px-3 py-2 hover:bg-gray-300 hover:bg-opacity-25 rounded-t-lg'
                            onClick={() => handleNavigate('/')}
                        >
                            <p className='font-bold'>Dashboard</p>
                            <LuLayoutDashboard size={20} />
                        </button>
                        <hr className='h-px bg-gray-300 border-0'/>
                        <button
                            type='button'
                            className='flex justify-between items-center px-3 py-2 hover:bg-gray-300 hover:bg-opacity-25'
                            onClick={() => handleNavigate('/events')}
                        >
                            <p className='font-bold'>Events</p>
                            <FaRegCalendarAlt size={20} />
                        </button>
                        <hr className='h-px bg-gray-300 border-0'/>
                        <button
                            type='button'
                            className='flex justify-between items-center px-3 py-2 hover:bg-gray-300 hover:bg-opacity-25'
                            onClick={() => handleNavigate('/recruitment')}
                        >
                            <p className='font-bold'>Recruitment</p>
                            <IoPeople size={20} />
                        </button>
                        <hr className='h-px bg-gray-300 border-0'/>
                        <button
                            type='button'
                            className='flex justify-between items-center px-3 py-2 hover:bg-gray-300 hover:bg-opacity-25'
                            onClick={() => handleNavigate('/profile')}
                        >
                            <p className='font-bold'>Profile</p>
                            <CgProfile size={20} />
                        </button>
                        <hr className='h-px bg-gray-300 border-0'/>
                        <button
                            type='button'
                            className='flex justify-between items-center px-3 py-2 hover:bg-gray-300 hover:bg-opacity-25 rounded-b-lg'
                            onClick={handleLogout}
                        >
                            <p className='font-bold'>Logout</p>
                            <IoLogOutOutline size={20} />
                        </button>
                    </div>
                )}
            </div>
            <div className='flex-1 flex-col px-4 lg:px-14 py-4 lg:py-0 mt-24 lg:mt-0 ml-0 lg:ml-64'>
                {children}
            </div>
        </div>
    );
}

export default ActiveLayout;