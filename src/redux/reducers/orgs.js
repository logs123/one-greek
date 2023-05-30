import { CHAPTER_LIST_LOAD, ORG_LIST_LOAD, UPDATE_SELECTED_ORG, UPDATE_SELECTED_CHAPTER } from "../constants";

const initialState = {
    orgs: [],
    chapters: [],
    selectedOrg: null,
    selectedChapter: null
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
    } else if (action.type === UPDATE_SELECTED_ORG) {
        return {
            ...state,
            selectedOrg: action.payload
        }
    } else if (action.type === UPDATE_SELECTED_CHAPTER) {
        return {
            ...state,
            selectedChapter: action.payload
        }
    } else {
        return state;
    }
}