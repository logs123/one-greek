import { ORG_LIST_LOAD } from "../constants";
import { CHAPTER_LIST_LOAD } from "../constants";

const initialState = {
    orgs: [],
    chapters: []
}

export const orgs = (state = initialState, action) => {
    if (action.type === ORG_LIST_LOAD) {
        return {
            ...state,
            orgs: action.orgs
        }
    } else if (action.type === CHAPTER_LIST_LOAD) {
        return {
            ...state,
            chapters: action.chapters
        }
    } else {
        return state;
    }
}