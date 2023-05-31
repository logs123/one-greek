import { CREATE_ANNOUNCEMENT, CURRENT_USER_GET_ANNOUNCEMENTS, DELETE_ANNOUNCEMENT } from "../constants";

const initialState = {
    currentUserAnnouncements: null
}

export const announcement = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_USER_GET_ANNOUNCEMENTS:
            return {
                ...state,
                currentUserAnnouncements: action.currentUserAnnouncements
            }
        case CREATE_ANNOUNCEMENT:
            return {
                ...state,
                currentUserAnnouncements: action.currentUserAnnouncements
            }
        case DELETE_ANNOUNCEMENT:
            return{
                ...state,
                currentUserAnnouncements: action.currentUserAnnouncements
            }
        default:
            return state;
    }
}