import { CURRENT_USER_GET_ANNOUNCEMENTS } from "../constants";

const initialState = {
    currentUserAnnouncements: null,
}

export const announcement = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_USER_GET_ANNOUNCEMENTS:
            return {
                ...state,
                currentUserAnnouncements: action.currentUserAnnouncements,
            }
        default:
            return state;
    }
}