import React from 'react';
import { ActiveEvent } from '../../../types/eventTypes';
import { format } from 'date-fns';
import { FaMapPin, FaRegTrashAlt } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';

interface ActiveEventsProps {
    events: ActiveEvent[];
    isDeleteLoading: boolean;
    onDeleteOpen: () => void;
    onAttendanceOpen: () => void;
    setSelectedEvent: (eventId: ActiveEvent) => void;
}

const ActiveEvents: React.FC<ActiveEventsProps> = ({ events, isDeleteLoading, onDeleteOpen, onAttendanceOpen, setSelectedEvent }) => {
    const auth = useAuth();
    const sortedEvents = Array.isArray(events)
        ? [...events]
            .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
        : [];
    
    return (
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {sortedEvents?.map((event) => (
                <div
                    key={event._id}
                    className='bg-white shadow-lg drop-shadow-lg rounded-lg p-4 flex flex-col'
                >
                    <p className='font-bold text-lg'>{event.name}</p>
                    <p className='text-xs mb-2'>{event.type}</p>
                    <div className='flex justify-between mb-2'>
                        <p className='text-xs text-gray-500'>{format(new Date(event.start), 'M/dd/yy')}</p>
                        <p className='text-xs text-gray-500'>{format(new Date(event.start), 'h:mmaaa')}-{format(new Date(event.end), 'h:mmaaa')}</p>
                    </div>
                    <div className='flex items-center gap-1 mb-3'>
                        <img
                            src={event.author.profilePicture}
                            alt='Profile Picture'
                            className='h-5 w-5 rounded-full'
                        />
                        <p className='text-xs'>{event.author.firstName} {event.author.lastName}</p>
                    </div>
                    {event.location?.name && (
                        <div className='flex items-center'>
                            <p className='text-sm'>{event.location?.name}</p>
                        </div>
                    )}
                    {event.location?.address && (
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location.address)}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500 text-sm hover:underline w-fit flex items-center gap-2'
                        >
                            <FaMapPin size={12} color='red'/>
                            {event.location.address}
                        </a>
                    )}
                    {auth?.roles.includes('Admin') && ( 
                        <div className='flex justify-between items-center mt-4'>
                            <button
                                type='button'
                                disabled={isDeleteLoading}
                                className=''
                                onClick={() => {
                                    setSelectedEvent(event);
                                    onAttendanceOpen();
                                }}
                            >
                                <p className='text-white text-xs rounded-lg py-2 px-2 bg-pacific-blue hover:bg-turquoise-blue'>View PNMs</p>
                            </button>
                            <button
                                type='button'
                                disabled={isDeleteLoading}
                                className='ml-2'
                                onClick={() => {
                                    setSelectedEvent(event);
                                    onDeleteOpen();
                                }}
                            >
                                <FaRegTrashAlt size={16} color={'gray'}/>
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ActiveEvents;