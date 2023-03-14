import { USER_GET_PROFILE_IMAGE } from "../constants";

const initialState = {
    url: null
}

export const storage = (state = initialState, action) => {
    switch (action.type) {
        case USER_GET_PROFILE_IMAGE:
            return {
                ...state,
                url: action.url,
            }
        default:
            return state;
    }
}