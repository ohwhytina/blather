import { useReducer } from 'react';
import {
    UPDATE_BLABS,
    UPDATE_USERS,
    UPDATE_CURRENT_USER,
    ADD_BLAB

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
        case UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
            }

            // case ADD_BLAB:
            //     return {
            //         ...state,
            //         blabs: [...state.blabs, action.blab]
            //     }

        default:
            return state;
    }

}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}