import { useReducer } from 'react';
import {
    UPDATE_BLAB_IMAGE,
    UPDATE_BLABS,
    UPDATE_USERS,
    UPDATE_COMMENTS
} from "./actions";
export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_BLABS:
            return {
                ...state,
                blabs: [...action.blabs]
            }
        case UPDATE_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case UPDATE_COMMENTS:
            return {
                ...state,
                comments: [...action.comments]
            }
        case UPDATE_BLAB_IMAGE:
            return {
                ...state,
                imageUrl: action.imageUrl
            }

            // case ADD_BLAB:
            //     return {
            //         ...state,
            //         blabText: action.blabText,
            //         imageUrl: action.imageUrl
            //     }
        default:
            return state;
    }

}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}