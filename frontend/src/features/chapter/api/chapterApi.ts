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
            providesTags: (result, error, chapterId) =>
                result
                    ? [{ type: 'ActiveChapter' as const, id: result._id }]
                    : [{ type: 'ActiveChapter' as const, id: chapterId }],
        })
    })
});

export const {
    useGetPNMChaptersQuery,
    useGetChapterQuery,
} = chapterApi;