import { useState } from 'react';
import ActiveLayout from '../../../components/layouts/active-layout';
import Spinner from '../../../components/ui/spinner/spinner';
import { useCreateEventMutation, useDeleteEventMutation, useGetActiveEventsQuery } from '../../../features/event/api/eventApi';
import ActiveEvents from '../../../features/event/components/active-events';
import useAuth from '../../../hooks/useAuth';
import CreateEventModal from '../../../features/event/components/create-modal';
import { ActiveEvent, EventPayload } from '../../../types/eventTypes';
import DeleteEventModal from '../../../features/event/components/delete-modal';
import AttendanceModal from '../../../features/event/components/attendance-modal';
import { IoMdAdd } from 'react-icons/io';
import QRModal from '../../../features/event/components/qr-modal';

const EventRoute = () => {
    const auth = useAuth();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<ActiveEvent | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState<boolean>(false);
    const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);

    const { data: events = [], isLoading: isEventsLoading } = useGetActiveEventsQuery({ chapterId: auth?.chapter || '' }, { skip: !auth?.chapter });
    const [createEvent, { isLoading: isCreateEventLoading, error: createEventError }] = useCreateEventMutation();
    const [deleteEvent, { isLoading: isDeleteEventLoading, error: deleteEventError }] = useDeleteEventMutation();

    const handleCreateEvent = async (payload: EventPayload) => {
        try {
            await createEvent(payload).unwrap();
        } catch (error) {
            console.error('Error creating event:', error);
        }
    }

    const handleDeleteEvent = async (eventId: string) => {
        try {
            await deleteEvent({ eventId }).unwrap();
        } catch (error) {
            console.error('Error creating event:', error);
        }
    }

    if (!auth || isEventsLoading || isCreateEventLoading || isDeleteEventLoading) {
        return (
            <ActiveLayout>
                <div className='flex h-full justify-center items-center'>
                    <Spinner/>
                </div>
            </ActiveLayout>
        )
    }

    return (
        <ActiveLayout>
            <div className='px-4 lg:px-14 bg-[#E4EFF3]'>
                <div className='hidden lg:flex h-[184px] py-8 gap-[86px]'>
                    <div className='flex-1 h-full bg-white rounded-2xl flex items-center shadow drop-shadow'>
                        <div className='ml-10 font-bold text-3xl'>Events</div>
                    </div>
                    {auth.roles.includes('Admin') &&
                        <div className='flex justify-center items-end'>
                            <div>
                                <button
                                    type='button'
                                    className='text-white rounded-lg px-3 py-2 bg-pacific-blue hover:bg-turquoise-blue flex items-center justify-between shadow drop-shadow hover:drop-shadow-xl'
                                    onClick={() => setIsCreateModalOpen(true)}
                                >
                                    <IoMdAdd size={28}/>
                                    <p className='text-lg'>Create</p>
                                </button>
                            </div>
                        </div>
                    }
                </div>
                <div className='lg:hidden flex mb-4'>
                    <div className='flex w-full justify-between gap-4'>
                        <div className='flex-1 h-full bg-white rounded-lg p-1 flex justify-center items-center shadow drop-shadow'>
                            <div className='font-bold text-xl'>Events</div>
                        </div>
                        {auth.roles.includes('Admin') &&
                            <button
                                type='button'
                                className='text-white rounded-lg px-2 bg-pacific-blue hover:bg-turquoise-blue flex items-center justify-between shadow drop-shadow hover:drop-shadow-xl'
                                onClick={() => setIsCreateModalOpen(true)}
                            >
                                <IoMdAdd size={20}/>
                                <p className='text-lg'>Create</p>
                            </button>
                        }
                    </div>
                </div>
                {events ? 
                    <ActiveEvents
                        events={events}
                        isDeleteLoading={isDeleteEventLoading}
                        onDeleteOpen={() => setIsDeleteModalOpen(true)}
                        onAttendanceOpen={() => setIsAttendanceModalOpen(true)}
                        onQROpen={() => setIsQRModalOpen(true)}
                        setSelectedEvent={setSelectedEvent}
                    />
                :
                    <div className='flex justify-center items-center'>
                        No Upcoming Events
                    </div>
                }
                <CreateEventModal
                    createEvent={handleCreateEvent}
                    isLoading={isCreateEventLoading}
                    error={createEventError}
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                />
                <DeleteEventModal
                    selectedEvent={selectedEvent}
                    deleteEvent={handleDeleteEvent}
                    isLoading={isDeleteEventLoading}
                    error={deleteEventError}
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                />
                <AttendanceModal
                    events={events}
                    selectedEvent={selectedEvent}
                    isOpen={isAttendanceModalOpen}
                    onClose={() => setIsAttendanceModalOpen(false)}
                />
                <QRModal
                    selectedEvent={selectedEvent}
                    isOpen={isQRModalOpen}
                    onClose={() => setIsQRModalOpen(false)}
                />
            </div>
        </ActiveLayout>
    )
}

export default EventRoute;