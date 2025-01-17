import React from 'react';
import { ActiveUser } from '../../../types/userTypes';
import { IoIosClose } from 'react-icons/io';
import VerifyButton from './verify-button';

interface VerifyModalProps {
    actives: ActiveUser[];
    isOpen: boolean;
    onClose: () => void;
}

const VerifyModal: React.FC<VerifyModalProps> = ({ actives, isOpen, onClose }) => {
    const sortedUsers = actives.filter(user => !user.isVerified)

    if (!isOpen) return null;

    return (
        <div className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-50'>
            <div className='bg-white w-full max-w-lg p-6 rounded-lg'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className=''>Add Members</h2>
                    <button
                        className='text-gray-500 hover:text-gray-700'
                        onClick={() => onClose()}>
                        <IoIosClose size={32} />
                    </button>
                </div>
                {sortedUsers.map((user) => (
                    <div
                        key={user._id}
                        className='flex items-center justify-between pr-2'
                    >
                        <div className='flex items-center gap-2'>
                            <img
                                src={user.profilePicture}
                                alt='User Profile Picture'
                                className='h-12 w-12 rounded-full object-cover'
                            />
                            <div>{user.firstName} {user.lastName}</div>
                        </div>
                        <div>{user.email}</div>
                        <VerifyButton userId={user._id}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VerifyModal;