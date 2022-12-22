import { ORG_LIST_LOAD, USER_STATE_CHANGE } from "../constants";

const initialState = {
    currentUser: null,
    loaded: false,
    orgs: []
}

export const auth = (state = initialState, action) => {
    if (action.type === USER_STATE_CHANGE) {
        return {
            ...state,
            currentUser: action.currentUser,
            loaded: action.loaded
        }
    } else if (action.type === ORG_LIST_LOAD) {
        return {
            ...state,
            orgs: action.orgs
        }
    } else {
        return state;
    }
}