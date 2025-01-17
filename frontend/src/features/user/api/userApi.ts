import { apiSlice } from "../../../slices/apiSlice";
import { ActiveUser } from "../../../types/userTypes";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        toggleFollowChapter: builder.mutation<void, { userId: string; chapterId: string }>({
            query: ({ userId, chapterId }) => ({
                url: '/users/follow',
                method: 'POST',
                body: { userId, chapterId }
            }),
            invalidatesTags: (_result, _error, { chapterId }) => [{ type: 'PNMChapter', id: chapterId }]
        }),
        getActiveMemebers: builder.query<ActiveUser[], { chapterId: string }>({
            query: ({ chapterId }) => `/users/actives?chapterId=${chapterId}`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ _id }) => ({ type: 'ActiveUser' as const, id: _id }))]
                    : [{ type: 'ActiveUser' as const }]
        }),
        verifyMember: builder.mutation<void, { userId: string }>({
            query: ({ userId }) => ({
                url: '/users/verify',
                method: 'POST',
                body: { userId }
            }),
            invalidatesTags: (_result, _error, { userId }) => [{ type: 'ActiveUser', id: userId }]
        }),
        toggleAdmin: builder.mutation<void, { userId: string; position?: string }>({
            query: ({ userId, position }) => ({
                url: '/users/admin',
                method: 'POST',
                body: { userId, position }
            }),
            invalidatesTags: (_result, _error, { userId }) => [{ type: 'ActiveUser', id: userId }]
        })
    })
});

export const {
    useToggleFollowChapterMutation,
    useGetActiveMemebersQuery,
    useVerifyMemberMutation,
    useToggleAdminMutation,
} = userApi;