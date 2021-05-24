// import our actions
import {
    UPDATE_BLAB_IMAGE,
    UPDATE_BLAB_TEXT
} from '../utils/actions';
import { reducer } from '../utils/reducers';
// create a sample of what our global state will look like
const initialState = {
    blabText: "smeg",
    imageUrl: ""
};
test('UPDATE_BLAB_TEXT', () => {
    let newState = reducer(initialState, {
        type: UPDATE_BLAB_TEXT,
        blabText: "more smeg!"
    });

    expect(newState.blabText.length).toBe(10);
    expect(initialState.blabText.length).toBe(4);

});
test('UPDATE_BLAB_IMAGE', () => {
    let newState = reducer(initialState, {
        type: UPDATE_BLAB_IMAGE,
        imageUrl: "https://www.farms.com"
    });

    expect(newState.imageUrl.length).toBe(21);
    expect(initialState.imageUrl.length).toBe(0);
});