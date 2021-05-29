// import our actions
import {
    UPDATE_BLAB_IMAGE,
    UPDATE_BLABS,
    UPDATE_USERS,
    UPDATE_COMMENTS
} from '../utils/actions';
import { reducer } from '../utils/reducers';
// create a sample of what our global state will look like
const initialState = {
    blabs: [],
    users: [],
    comments: [],
    imageUrl: ""
};

test('UPDATE_BLAB_IMAGE', () => {
    let newState = reducer(initialState, {
        type: UPDATE_BLAB_IMAGE,
        imageUrl: "https://www.farms.com"
    });

    expect(newState.imageUrl.length).toBe(21);
    expect(initialState.imageUrl.length).toBe(0);
});
test('UPDATE_BLABS', () => {
    let newState = reducer(initialState, {
        type: UPDATE_BLABS,
        blabs: [{}, {}]
    });

    expect(newState.blabs.length).toBe(2);
    expect(initialState.blabs.length).toBe(0);
});
test('UPDATE_USERS', () => {
    let newState = reducer(initialState, {
        type: UPDATE_USERS,
        users: [{}, {}]
    });

    expect(newState.users.length).toBe(2);
    expect(initialState.users.length).toBe(0);
});
test('UPDATE_COMMENTS', () => {
    let newState = reducer(initialState, {
        type: UPDATE_COMMENTS,
        comments: [{}, {}]
    });

    expect(newState.comments.length).toBe(2);
    expect(initialState.comments.length).toBe(0);
});