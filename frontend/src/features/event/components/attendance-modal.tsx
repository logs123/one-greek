import React from 'react';
import { ActiveEvent } from '../../../types/eventTypes';
import { IoIosClose } from 'react-icons/io';
import { useVerfiyAttendanceMutation } from '../api/eventApi';

interface AttendanceModalProps {
    selectedEvent: ActiveEvent | null;
    isOpen: boolean;
    onClose: () => void;
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ selectedEvent, isOpen, onClose }) => {
    const [] = useVerfiyAttendanceMutation();

    
    if (!isOpen || !selectedEvent) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full'>
               <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold'>PNM Attendance</h2>
                    <button
                        type='button'
                        className=''
                        onClick={onClose}
                    >
                        <IoIosClose size={32} />
                    </button>
                </div>
                <div>
                    {selectedEvent.attendees?.map((attendee) => (
                        <div
                            key={attendee.user._id}
                            className='flex items-center'
                        >
                            <div className='h-12 w-12 rounded-full overflow-hidden'>
                                <img
                                    src={attendee.user.profilePicture}
                                    alt='Profile Picture'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <p>{attendee.user.firstName} {attendee.user.lastName}</p>
                            <button

                            >

                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AttendanceModal;