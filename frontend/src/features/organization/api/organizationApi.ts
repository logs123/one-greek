import { apiSlice } from '../../../slices/apiSlice';
import { Organization } from '../../../types/organizationTypes';

export const organizationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrganizations: builder.query<Organization[], void>({
            query: () => '/organizations'
        }),
    })
});

export const {
    useGetOrganizationsQuery,
} = organizationApi;