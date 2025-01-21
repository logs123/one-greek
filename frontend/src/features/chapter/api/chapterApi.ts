import { apiSlice } from '../../../slices/apiSlice';
import { ActiveChapter, PNMChapter } from '../../../types/chapterTypes';

export const chapterApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPNMChapters: builder.query<PNMChapter[], string>({
            query: (userId) => `/chapters?userId=${userId}`,
            providesTags: (result) => 
                result
                    ? [...result.map(({ chapterId }) => ({ type: 'PNMChapter' as const, id: chapterId }))]
                    : [{type: 'PNMChapter' as const }]
        }),
        getChapter: builder.query<ActiveChapter, string>({
            query: (chapterId) => `/chapters/${chapterId}`,
            providesTags: (result, _error, chapterId) =>
                result
                    ? [{ type: 'ActiveChapter' as const, id: result._id }]
                    : [{ type: 'ActiveChapter' as const, id: chapterId }],
        }),
        togglePNMVote: builder.mutation<void, { chapterId: string; pnmId: string; userId: string; semesterName: string; vote: string; }>({
            query: ({ chapterId, pnmId, userId, semesterName, vote }) => ({
                url: '/chapters/pnm/vote',
                method: 'POST',
                body: { chapterId, pnmId, userId, semesterName, vote }
            }),
            invalidatesTags: (_result, _error, { pnmId }) => [{ type: 'PNMUser', id: pnmId }, { type: 'PNMUser', id: 'LIST' }]
        }),
        togglePNMNote: builder.mutation<void, { chapterId: string; pnmId: string; userId: string; semesterName: string; note: string }>({
            query: ({ chapterId, pnmId, userId, semesterName, note }) => ({
                url: '/chapters/pnm/note',
                method: 'POST',
                body: { chapterId, pnmId, userId, semesterName, note }
            }),
            invalidatesTags: (_result, _error, { pnmId }) => [{ type: 'PNMUser', id: pnmId }, { type: 'PNMUser', id: 'LIST' }]
        }),
        togglePNMFinalVote: builder.mutation<void, { chapterId: string; pnmId: string; semesterName: string; vote: string; }>({
            query: ({ chapterId, pnmId, semesterName, vote }) => ({
                url: '/chapters/pnm/finalvote',
                method: 'POST',
                body: { chapterId, pnmId, semesterName, vote }
            }),
            invalidatesTags: (_result, _error, { pnmId }) => [{ type: 'PNMUser', id: pnmId }, { type: 'PNMUser', id: 'LIST' }]
        }),
    })
});

export const {
    useGetPNMChaptersQuery,
    useGetChapterQuery,
    useTogglePNMVoteMutation,
    useTogglePNMNoteMutation,
    useTogglePNMFinalVoteMutation,
} = chapterApi;