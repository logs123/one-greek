import { UPDATE_PROFILE_IMAGE, USER_STATE_CHANGE } from "../constants";

const initialState = {
    currentUser: null,
    userID: null,
    loaded: false,
    photoURL: null
}

export const auth = (state = initialState, action) => {
    if (action.type === USER_STATE_CHANGE) {
        return {
            ...state,
            currentUser: action.currentUser,
            userID: action.userID,
            loaded: action.loaded,
            photoURL: action.photoURL
        }
    } else if (action.type === UPDATE_PROFILE_IMAGE) {
        return {
            ...state,
            photoURL: action.photoURL
        }
    } else {
        return state;
    }
}