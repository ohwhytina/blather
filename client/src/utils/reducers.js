import { useReducer } from 'react';
import {
    UPDATE_BLAB_TEXT,
    UPDATE_BLAB_IMAGE
} from "./actions";
export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_BLAB_TEXT:
            return {
                ...state,
                blabText: action.blabText
            }
        case UPDATE_BLAB_IMAGE:
            return {
                ...state,
                imageUrl: action.imageUrl
            }
        default:
            return state;
    }

}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}
// BlabList
// BlabForm