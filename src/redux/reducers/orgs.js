import { ORG_LIST_LOAD } from "../constants";

const initialState = {
    orgs: []
}

export const orgs = (state = initialState, action) => {
    if (action.type === ORG_LIST_LOAD) {
        return {
            ...state,
            orgs: action.orgs
        }
    } else {
        return state;
    }
}