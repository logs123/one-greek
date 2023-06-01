import { CHAPTER_LIST_LOAD, ORG_LIST_LOAD, UPDATE_SELECTED_ORG, UPDATE_SELECTED_CHAPTER } from "../constants";

const initialState = {
    orgs: [],
    chapters: [],
    selectedOrg: null,
    selectedChapter: null
}

export const orgs = (state = initialState, action) => {
    switch (action.type) {
        case ORG_LIST_LOAD:
            return {
                ...state,
                orgs: action.orgs
            }
        case CHAPTER_LIST_LOAD:
            return {
                ...state,
                chapters: action.chapters
            }
        case UPDATE_SELECTED_ORG:
            return {
                ...state,
                selectedOrg: action.org
            }
        case UPDATE_SELECTED_CHAPTER:
            return {
                ...state,
                selectedChapter: action.chapter
            }
        default:
            return state;
    }
}