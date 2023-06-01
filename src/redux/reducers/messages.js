import { CREATE_MESSAGE, GET_MESSAGE_PREVIEWS, GET_USER_MESSAGES } from "../constants";


const initialState = {
    messages: {},
    previews: []
}

export const messages = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MESSAGE:
            return {
                ...state,
                previews: [
                    ...state.previews,
                    {
                        id: action.chatID,
                        title: action.title,
                        otherPersonName: null
                    }
                ]
            }
        case GET_MESSAGE_PREVIEWS:
            return {
                ...state,
                previews: action.previews
            }
        case GET_USER_MESSAGES:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.chatID]: action.messages
                }
            }
        default:
            return state;
    }
}