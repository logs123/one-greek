import React from 'react';
import { useCheckIntoEventMutation } from '../api/eventApi';

interface CheckinButtonProps {
    userId: string;
    eventId: string;
}

const CheckinButton: React.FC<CheckinButtonProps> = ({ userId, eventId }) => {
    const [checkIntoEvent, { isLoading }] = useCheckIntoEventMutation();

    const handleCheckin = async () => {
        try {
            await checkIntoEvent({ userId, eventId }).unwrap();
        } catch (error) {
            console.error('Error checkin in:', error);
        }
    }

    return (
        <button
            type='button'
            disabled={isLoading}
            className='text-white w-[85%] rounded-2xl py-1 px-2 bg-pacific-blue hover:bg-turquoise-blue'
            onClick={handleCheckin}
        >
            Check In
        </button>
    )
}

export default CheckinButton;