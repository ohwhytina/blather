import gql from 'graphql-tag';

export const LOGIN_USER = gql `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql `
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BLAB = gql `
mutation addBlabImage($blabText: String,$imageUrl: String){
  addBlabImage(blabText: $blabText, imageUrl: $imageUrl){
    _id
    username
    imageUrl
    createdAt
    
  }
}
`;

export const ADD_COMMENT = gql `
mutation addComment($blabId: ID!, $commentBody: String!) {
    addComment(blabId: $blabId, commentBody: $commentBody) {
        _id
        commentCount
        comments {
            _id
            commentBody
            createdAt
            username
        }
    }
}
`;

export const ADD_FRIEND = gql `
mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
        _id
        username
        friendCount
        friends {
            _id
            username
        }
    }
}
`;
export const ADD_LIKE = gql `
mutation addLike($id: ID!) {
    addLike(likeId: $id) {
        _id
        username
        likeCount
        likes {
            _id
            username
        }
    }
}
`;

export const REMOVE_FRIEND = gql `
mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
        _id
        username
        friends {
            _id
            username
        }
    }
}
`;