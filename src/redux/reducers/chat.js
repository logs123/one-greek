import { CREATE_MESSAGE, GET_MESSAGE_PREVIEWS } from "../constants";


const initialState = {
    previews: []
}

export const chat = (state = initialState, action) => {
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
        default:
            return state;
    }
}