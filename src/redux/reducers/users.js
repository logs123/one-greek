import { GET_USERS_BY_CHAPTER } from "../constants";

const initialState = {
    chapterUsers: []
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_BY_CHAPTER:
            return {
                ...state,
                chapterUsers: action.chapterUsers
            }
        default:
            return state;
    }
}