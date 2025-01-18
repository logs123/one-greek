import React from 'react';
import { useToggleAdminMutation } from '../api/userApi';
import { MdAddModerator } from "react-icons/md";
import { MdRemoveModerator } from "react-icons/md";

interface AdminButtonProps {
    userId: string;
    position?: string;
    profilePicture: string;
    isAdmin: boolean;
}

const AdminButton: React.FC<AdminButtonProps> = ({ userId, position, profilePicture, isAdmin }) => {
    const [toggleAdmin, { isLoading }] = useToggleAdminMutation();

    const handleToggleAdmin = async () => {
        try {
            await toggleAdmin({ userId, position }).unwrap();
        } catch (error) {
            console.error('Error toggling admin:', error);
        }
    }

    return (
        <button
            type='button'
            disabled={isLoading}
            className='flex relative hover:opacity-90'
            onClick={handleToggleAdmin}
        >
            <img
                src={profilePicture}
                alt='Profile Picture'
                className='w-10 h-10 rounded-full object-cover'
            />
            {isAdmin ?
                <MdRemoveModerator size={16} className='absolute bottom-0 right-0 text-pacific-blue hover:text-turquoise-blue' />
            :
                <MdAddModerator size={16} className='absolute bottom-0 right-0 text-pacific-blue hover:text-turquoise-blue' />
            }
        </button>   
    );
}

export default AdminButton;