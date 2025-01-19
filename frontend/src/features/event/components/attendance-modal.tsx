import React, { useMemo, useState } from 'react';
import { ActiveEvent } from '../../../types/eventTypes';
import { IoIosClose } from 'react-icons/io';
import { useVerfiyAttendanceMutation } from '../api/eventApi';

interface AttendanceModalProps {
    events: ActiveEvent[];
    selectedEvent: ActiveEvent | null;
    isOpen: boolean;
    onClose: () => void;
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ events, selectedEvent, isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [verify, { isLoading }] = useVerfiyAttendanceMutation();

    const eventData = useMemo(
        () => events.find((event) => event._id === selectedEvent?._id) || null,
        [events, selectedEvent]
    );

    const filteredAttendees = useMemo(() => {
        if (!eventData?.attendees) return [];
        return eventData.attendees.filter((attendee) => {
            const fullName = `${attendee.user.firstName} ${attendee.user.lastName}`.toLowerCase();
            return fullName.includes(searchQuery.toLowerCase());
        });
    }, [eventData?.attendees, searchQuery]);

    const handleVerify = async (userId: string) => {
        try {
            await verify({ eventId: selectedEvent?._id || '', userId }).unwrap();
        } catch (error) {
            console.error('Verification failed', error);
        }
    };

    if (!isOpen || !selectedEvent || !eventData) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">PNM Attendance</h2>
                    <button
                        type="button"
                        className=""
                        onClick={onClose}
                    >
                        <IoIosClose size={32} />
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-blue"
                    />
                </div>
                <div className="max-h-80 overflow-y-auto">
                    {filteredAttendees.map((attendee) => (
                        <div
                            key={attendee.user._id}
                            className="flex items-center border-b mt-2 pb-2"
                        >
                            <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                                <img
                                    src={attendee.user.profilePicture}
                                    alt="Profile Picture"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="flex-1">{attendee.user.firstName} {attendee.user.lastName}</p>
                            <button
                                disabled={isLoading || attendee.verified}
                                className={`text-white rounded py-1 px-2 ${attendee.verified ? 'bg-gray-300' : 'bg-pacific-blue hover:bg-turquoise-blue'}`}
                                onClick={() => handleVerify(attendee.user._id)}
                            >
                                {attendee.verified ? 'Confirmed' : 'Confirm'}
                            </button>
                        </div>
                    ))}
                    {filteredAttendees.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">No attendees found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendanceModal;
