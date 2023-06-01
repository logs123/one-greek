import { UNVERIFIED_LIST_LOAD, VERIFY, DENY } from "../constants";

const initialState = {
    unverified: []
}

export const admin = (state = initialState, action) => {
    switch (action.type) {
        case UNVERIFIED_LIST_LOAD:
            return {
                ...state,
                unverified: action.unverified
            }
        case VERIFY:
            return {
                ...state,
                unverified: action.unverified
            }
        case DENY:
            return {
                ...state,
                unverified: action.unverified
            }
        default:
            return state;
    }
}