import React, { useEffect, useState } from 'react';
import { ActiveEvent, EditEventPayload } from '../../../types/eventTypes';
import { IoIosClose } from 'react-icons/io';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { useUpdateEventMutation } from '../api/eventApi';

interface EditEventModalProps {
    selectedEvent: ActiveEvent | null;
    isOpen: boolean;
    onClose: () => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({ selectedEvent, isOpen, onClose }) => {
    if (!isOpen || !selectedEvent) return null;

    const [isFormValid, setIsFormValid] = useState<boolean>(true);
    const [updateEvent, { isLoading }] = useUpdateEventMutation();

    const timeZone = 'America/Phoenix';
    const [formData, setFormData] = useState<EditEventPayload>({
        eventId: selectedEvent?._id || '',
        updateData: {
            name: selectedEvent.name,
            start: selectedEvent.start,
            end: selectedEvent.end,
            locationName: selectedEvent.location?.name || '',
            locationAddress: selectedEvent.location?.address || '',
            visibility: selectedEvent.visibility
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const payload: EditEventPayload = {
                eventId: formData.eventId,
                updateData: {
                    name: formData.updateData.name.trim(),
                    start: formData.updateData.start,
                    end: formData.updateData.end,
                    locationName: formData.updateData.locationName,
                    locationAddress: formData.updateData.locationAddress,
                    visibility: formData.updateData.visibility,
                }
            }
            updateEvent(payload);
        } catch (error) {
            console.error('Create event failed:', error);
        }

        onClose();
    };

    useEffect(() => {
        const { updateData } = formData;
        const isFormComplete = Boolean(updateData.name && updateData.start && updateData.end && updateData.visibility);
        setIsFormValid(isFormComplete);
    }, [formData]);

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-2xl shadow-lg max-w-md w-full'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold'>Edit Event</h2>
                    <button
                        type='button'
                        className=''
                        onClick={onClose}
                    >
                        <IoIosClose size={32} />
                    </button>
                </div>
                <form
                    className='space-y-4'
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Name</label>
                        <input
                            type='text'
                            id='name'
                            value={formData.updateData.name}
                            required
                            className='w-full px-3 py-2 border rounded-lg'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, updateData: {...formData.updateData, name: e.target.value}})}
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Location Name</label>
                        <input
                            type='text'
                            id='locationName'
                            value={formData.updateData.locationName}
                            required
                            className='w-full px-3 py-2 border rounded-lg'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, updateData: {...formData.updateData, locationName: e.target.value}})}
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Location Address</label>
                        <input
                            type='text'
                            id='locationAddress'
                            value={formData.updateData.locationAddress}
                            required
                            className='w-full px-3 py-2 border rounded-lg'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, updateData: {...formData.updateData, locationAddress: e.target.value}})}
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Start Date & Time</label>
                        <input
                            type='datetime-local'
                            id='start'
                            value={formatInTimeZone(formData.updateData.start, timeZone, 'yyyy-MM-dd\'T\'HH:mm')}
                            onChange={(e) => {
                                const localTime = e.target.value;
                                const zonedDate = toZonedTime(new Date(localTime), timeZone);
                                setFormData(() => ({ ...formData, updateData: {...formData.updateData, start: zonedDate }}));
                            }}
                            className='w-full px-3 py-2 border rounded-lg'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>End Date & Time</label>
                        <input
                            type='datetime-local'
                            id='end'
                            value={formatInTimeZone(formData.updateData.end, timeZone, 'yyyy-MM-dd\'T\'HH:mm')}
                            onChange={(e) => {
                                const localTime = e.target.value;
                                const zonedDate = toZonedTime(new Date(localTime), timeZone);
                                setFormData(() => ({ ...formData, updateData: {...formData.updateData, end: zonedDate }}));
                            }}
                            className='w-full px-3 py-2 border rounded-lg'
                            required
                        />
                    </div>
                    <div className='flex items-center space-x-2'>
                        <input
                            type='checkbox'
                            id='visibility'
                            checked={formData.updateData.visibility === 'private'}
                            className='w-4 h-4 accent-pacific-blue'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, updateData: {...formData.updateData, visibility: e.target.checked ? 'private' : 'public'}})
                            }
                        />
                        <label htmlFor='visibility' className='text-sm font-medium text-gray-700'>
                            Private
                        </label>
                    </div>
                    
                    <div className='flex justify-end space-x-4'>
                        <button
                            type='submit'
                            className={`bg-pacific-blue hover:bg-turquoise-blue text-white font-bold py-2 px-4 rounded ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            Update Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEventModal;