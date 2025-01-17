import React from 'react';
import { useToggleAdminMutation } from '../api/userApi';
import { MdAddModerator } from "react-icons/md";
import { MdRemoveModerator } from "react-icons/md";

interface AdminButtonProps {
    userId: string;
    position?: string;
    isAdmin: boolean;
}

const AdminButton: React.FC<AdminButtonProps> = ({ userId, position, isAdmin }) => {
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
            className=''
            onClick={handleToggleAdmin}
        >
            {isAdmin ?
                <MdRemoveModerator size={16} className='text-pacific-blue hover:text-turquoise-blue' />
            :
                <MdAddModerator size={16} className='text-pacific-blue hover:text-turquoise-blue' />
            }
        </button>
    )
}

export default AdminButton;