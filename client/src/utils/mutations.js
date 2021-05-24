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
mutation addBlab($blabText: String!) {
    addBlab(blabText: $blabText) {
        _id
        blabText
        createdAt
        imageUrl
        username
        commentCount
        comments {
            _id
        }
    }
}
`;
export const ADD_IMAGE = gql `
mutation addImage($blabId: ID!, $imageUrl: String!){
  addImage(blabId: $blabId, imageUrl: $imageUrl){
    _id
    blabText
    createdAt
    imageUrl
    username
  }
}`;
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
// export const ADD_LIKE = gql `
// mutation addLike($id: ID!) {
//     addLike(likeId: $id) {
//         _id
//         username
//         likeCount
//         likes {
//             _id
//             username
//         }
//     }
// }
// `;


export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: ID!) {
    removeFriend(friendId: $friendId) {
      _id
      username
        friends {
        _id
        username
        friends {
            _id
            username
        }
    }
  }
`;

export const REMOVE_BLAB = gql`
  mutation removeBlab($blabId: ID!) {
    removeBlab(blabId: $blabId) {
      _id
      blabText
      createdAt
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;

