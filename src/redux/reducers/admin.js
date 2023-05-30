import { UNVERIFIED_LIST_LOAD, VERIFY, DENY } from "../constants";

const initialState = {
    unverified: []
}

export const admin = (state = initialState, action) => {
    if (action.type === UNVERIFIED_LIST_LOAD) {
        return {
            ...state,
            unverified: action.unverified
        }
    } else if (action.type === VERIFY) {
        return {
            ...state,
            unverified: action.unverified
        }
    } else if (action.type === DENY) {
        return {
            ...state,
            unverified: action.unverified
        }
    } else {
        return state;
    }
}