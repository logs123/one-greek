import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../stores/store';
import { AccessToken } from '../types/authTypes';

interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AccessToken>) => {
            const { accessToken } = action.payload;
            state.token = accessToken;
        },
        logOut: (state) => {
            state.token = null
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;