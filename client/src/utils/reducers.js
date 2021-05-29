import { useReducer } from 'react';
import {
    UPDATE_BLAB_IMAGE,
    UPDATE_BLABS,
    UPDATE_USERS,
    CURRENT_USER
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
        case UPDATE_BLAB_IMAGE:
            return {
                ...state,
                imageUrl: action.imageUrl
            }
        case CURRENT_USER:
            return {
                ...state,
                currentUser:
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