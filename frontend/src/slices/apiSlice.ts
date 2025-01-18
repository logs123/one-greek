import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../stores/store';
import { setCredentials } from './authSlice';
import { AccessToken } from '../types/authTypes';

// render: 'https://api.onegreek.com',
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.onegreek.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    }
});

const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data as AccessToken }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            if (refreshResult?.error?.status === 403) {
                (refreshResult.error.data as { message: string }).message = 'Your login has expired.';
            }
            return refreshResult;
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['PNMChapter', 'PNMEvent', 'ActiveUser', 'ActiveEvent', 'ActiveChapter'],
    endpoints: (_builder) => ({})
});