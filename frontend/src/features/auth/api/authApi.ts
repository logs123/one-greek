import { apiSlice } from '../../../slices/apiSlice'
import { logOut, setCredentials } from '../../../slices/authSlice';
import { AccessToken, LoginCredentials, LogoutResponse, SignupPayload } from '../../../types/authTypes';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AccessToken, LoginCredentials>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken } = data;
                    dispatch(setCredentials({ accessToken }));
                    localStorage.setItem('persist', 'true');
                } catch (err) {
                    console.error(err);
                }
            }
        }),
        signup: builder.mutation<AccessToken, SignupPayload>({
            query: (payload) => {
                const formData = new FormData();

                formData.append('email', payload.email.trim());
                formData.append('password', payload.password);
                formData.append('roles', JSON.stringify(payload.roles));
                formData.append('firstName', payload.firstName.trim());
                formData.append('lastName', payload.lastName.trim());
                formData.append('phoneNumber', payload.phoneNumber.trim());
                formData.append('studentId', payload.studentId);
                if (payload.profilePicture) formData.append('profilePicture', payload.profilePicture);
                if (payload.socialMediaHandles) formData.append('socialMediaHandles', JSON.stringify(payload.socialMediaHandles));
                formData.append('organization', payload.organization);
                if (payload.chapter) formData.append('chapter', payload.chapter);
                if (payload.pnmInfo) formData.append('pnmInfo', JSON.stringify(payload.pnmInfo));
                formData.append('hasAgreedToTerms', String(payload.hasAgreedToTerms));
                
                return {
                    url: '/auth/signup',
                    method: 'POST',
                    body: formData,
                }
            },
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken } = data;
                    dispatch(setCredentials({ accessToken }));
                    localStorage.setItem('persist', 'true');
                } catch (err) {
                    console.error(err);
                }
            } 
        }),
        sendLogout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logOut());
                    localStorage.setItem('persist', 'false');
                    dispatch(apiSlice.util.resetApiState());
                } catch (err) {
                    console.error(err);
                }
            }
        }),
        refresh: builder.mutation<AccessToken, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken } = data;
                    dispatch(setCredentials({ accessToken }));
                } catch (err) {
                    console.error(err);
                    localStorage.setItem('persist', JSON.stringify(false));
                }
            }
        }),
    })
});

export const {
    useLoginMutation,
    useSignupMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApi;