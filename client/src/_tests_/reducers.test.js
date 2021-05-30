// import our actions
import {
    UPDATE_BLABS,
    UPDATE_USERS,
    // ADD_BLAB
} from '../utils/actions';
import { reducer } from '../utils/reducers';
// create a sample of what our global state will look like
const initialState = {
    blabs: [
        //{

        //         "_id": "1",
        //         "blabText": "meow",
        //         "createdAt": "May 29th, 2021 at 9:31 am",
        //         "username": "forks",
        //         "commentCount": 0,
        //         "imageUrl": "http://res.cloudinary.com/insertyourcloudnamehere/image/upload/v1622298722/svg7rjnkpp1d0afinyhc.png",
        //         "comments": []
        //     },
        // {
        //     "_id": "2",
        //     "blabText": "IT WORKS!",
        //     "createdAt": "May 28th, 2021 at 11:7 am",
        //     "username": "forks",
        //     "commentCount": 0,
        //     "imageUrl": "http://res.cloudinary.com/insertyourcloudnamehere/image/upload/v1622298773/yt6bvzxkno8txl0skmnu.jpg",
        //     "comments": []
        // }
    ],
    users: [],

};

test('UPDATE_BLABS', () => {
    let newState = reducer(initialState, {
        type: UPDATE_BLABS,
        blabs: [{}, {}, {}]
    });

    expect(newState.blabs.length).toBe(3);
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

// test('ADD_BLAB', () => {
//     let newState = reducer(initialState, {
//         type: ADD_BLAB,
//         blabs: [{}]
//     });

//     expect(newState.blabs.length).toBe(1);
//     expect(initialState.blabs.length).toBe(0);
// });

// test('REMOVE_BLAB', () => {
//     let newState = reducer(initialState, {
//         type: REMOVE_BLAB,
//         _id: '1'
//     });

//     expect(newState.blabs.length).toBe(0);
//     // expect(newState.blabs[0]._id).toBe('2');

//     // let newState2 = reducer(newState1, {
//     //     type: REMOVE_BLAB,
//     //     _id: '2'
//     // });

//     // expect(newState2.blabs.length).toBe(0);

//     expect(initialState.blabs.length).toBe(1);
// });