import React from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ActiveEvent } from '../../../types/eventTypes';
import { IoIosClose } from 'react-icons/io';

interface DeleteEventModalProps {
    selectedEvent: ActiveEvent | null;
    deleteEvent: (eventId: string) => void;
    isLoading: boolean;
    error?: SerializedError | FetchBaseQueryError;
    isOpen: boolean;
    onClose: () => void;
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({ selectedEvent, deleteEvent, isLoading, error, isOpen, onClose }) => {
    const handleDelete = () => {
        try {
            if (!selectedEvent) return null;
            deleteEvent(selectedEvent._id);
            onClose();
        } catch (err: any) {
            console.error('Delete event failed:', error);
        }
    }

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-2xl shadow-lg max-w-sm flex flex-col items-center'>
                <div className="flex justify-between w-full items-center mb-4">
                    <h2 className='text-lg font-semibold'>
                        Delete Event?
                    </h2>
                    <button
                        type="button"
                        className=""
                        onClick={onClose}
                    >
                        <IoIosClose size={32} color={'gray'} />
                    </button>
                </div>
                <p className='text-gray-600 mb-6'>
                    This action cannot be undone.
                </p>
                <div className='flex justify-end space-x-4'>
                    <button
                        className='px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-xl'
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteEventModal;