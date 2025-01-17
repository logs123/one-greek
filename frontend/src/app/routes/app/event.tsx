import { useState } from "react";
import ActiveLayout from "../../../components/layouts/active-layout";
import Spinner from "../../../components/ui/spinner/spinner";
import { useCreateEventMutation, useDeleteEventMutation, useGetActiveEventsQuery } from "../../../features/event/api/eventApi";
import ActiveEvents from "../../../features/event/components/active-events";
import useAuth from "../../../hooks/useAuth";
import CreateEventModal from "../../../features/event/components/create-modal";
import { EventPayload } from "../../../types/eventTypes";
import DeleteEventModal from "../../../features/event/components/delete-modal";

const EventRoute = () => {
    const auth = useAuth();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<string>('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const { data: events = [], isLoading: isEventsLoading } = useGetActiveEventsQuery({ chapterId: auth?.chapter || '' }, { skip: !auth?.chapter });
    const [createEvent, { isLoading: isCreateEventLoading, error: createEventError }] = useCreateEventMutation();
    const [deleteEvent, { isLoading: isDeleteEventLoading, error: deleteEventError }] = useDeleteEventMutation();

    const handleCreateEvent = async (payload: EventPayload) => {
        try {
            await createEvent(payload).unwrap();
        } catch (error) {
            console.log('Error creating event:', error);
        }
    }

    const handleDeleteEvent = async (eventId: string) => {
        try {
            await deleteEvent({ eventId }).unwrap();
        } catch (error) {
            console.log('Error creating event:', error);
        }
    }

    if (!auth || isEventsLoading || isCreateEventLoading || isDeleteEventLoading) {
        return (
            <ActiveLayout>
                <div className="flex h-full justify-center items-center">
                    <Spinner/>
                </div>
            </ActiveLayout>
        )
    }

    return (
        <ActiveLayout>
            <div className='flex justify-between items-center mb-4'>
                <p className='font-bold text-lg'>Events</p>
                {auth.roles.includes('Admin') && (
                    <button
                        type='button'
                        className='text-white rounded-lg py-1 px-3 bg-pacific-blue hover:bg-turquoise-blue'
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Create Event
                    </button>
                )}
            </div>
            <ActiveEvents
                events={events}
                isDeleteLoading={isDeleteEventLoading}
                onDeleteOpen={() => setIsDeleteModalOpen(true)}
                setSelectedEvent={setSelectedEvent}
            />
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
        </ActiveLayout>
    )
}

export default EventRoute;