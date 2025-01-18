import { apiSlice } from '../../../slices/apiSlice';
import { ActiveEvent, EventPayload, PNMEvent, PNMEventsPaylod } from '../../../types/eventTypes';

export const eventApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPnmEvents: builder.query<PNMEvent[], PNMEventsPaylod>({
            query: ({userId, organizationId}) => `/events/pnm?userId=${userId}&organizationId=${organizationId}`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ _id }) => ({ type: 'PNMEvent' as const, id: _id }))]
                    : [{ type: 'PNMEvent' as const }]
        }),
        checkIntoEvent: builder.mutation<void, { userId: string, eventId: string }>({
            query: ({ userId, eventId }) => ({
                url: '/events/pnm/checkin',
                method: 'POST',
                body: { userId, eventId }
            }),
            invalidatesTags: (_result, _error, { eventId }) => [{ type: 'PNMEvent', id: eventId }]
        }),
        getActiveEvents: builder.query<ActiveEvent[], { chapterId: string }>({
            query: ({ chapterId }) => `/events/active?chapterId=${chapterId}`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ _id }) => ({ type: 'ActiveEvent' as const, id: _id })), { type: 'ActiveEvent', id: 'LIST' }]
                    : [{ type: 'ActiveEvent', id: 'LIST' }]
        }),
        deleteEvent: builder.mutation<void, { eventId: string }>({
            query: ({ eventId }) => ({
                url: '/events',
                method: 'DELETE',
                body: { eventId },
            }),
            invalidatesTags: (_result, _error, { eventId }) => [{ type: 'ActiveEvent', id: eventId }, { type: 'ActiveEvent', id: 'LIST' }]
        }),
        createEvent: builder.mutation<void, EventPayload>({
            query: (payload) => ({
                url: '/events',
                method: 'POST',
                body: { ...payload },
            }),
            invalidatesTags: [{ type: 'ActiveEvent', id: 'LIST' }]
        }),
        updateEvent: builder.mutation<void, { eventId: string; updateData: Record<string, any> }>({
            query: ({ eventId, updateData }) => ({
                url: `/events/${eventId}`,
                method: 'PATCH',
                body: updateData
            }),
            invalidatesTags: (_result, _error, { eventId }) => [{ type: 'ActiveEvent', id: eventId }, { type: 'ActiveEvent', id: 'LIST' }],
        }),
        verfiyAttendance: builder.mutation<void, { eventId: string; userId: string; }>({
            query: ({ eventId, userId }) => ({
                url: '/events/verify',
                method: 'POST',
                body: { eventId, userId }
            }),
            invalidatesTags: (_result, _error, { eventId }) => [{ type: 'ActiveEvent', id: eventId }]
        }),
    })
});

export const {
    useGetPnmEventsQuery,
    useCheckIntoEventMutation,
    useGetActiveEventsQuery,
    useDeleteEventMutation,
    useCreateEventMutation,
    useUpdateEventMutation,
    useVerfiyAttendanceMutation,
} = eventApi;