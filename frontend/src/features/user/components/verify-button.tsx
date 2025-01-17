import React from 'react';
import { useVerifyMemberMutation } from '../api/userApi';
import { FaCheck } from "react-icons/fa";

interface VerifyButtonProps {
    userId: string;
}

const VerifyButton: React.FC<VerifyButtonProps> = ({ userId }) => {
    const [verify, { isLoading }] = useVerifyMemberMutation();

    const handleVerify = async () => {
        try {
            await verify({ userId }).unwrap();
        } catch (error) {
            console.error('Error verifying:', error);
        }
    }

    return (
        <button
            type='button'
            disabled={isLoading}
            className=''
            onClick={handleVerify}
        >
            <FaCheck size={20} className='text-pacific-blue hover:text-turquoise-blue' />
        </button>
    );
}

export default VerifyButton;