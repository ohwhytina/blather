import gql from 'graphql-tag';

export const QUERY_BLABS = gql `
  query blabs($username: String) {
    blabs(username: $username) {
      _id
      blabText
      createdAt
      username
      imageUrl
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_BLAB = gql `
  query blab($id: ID!) {
    blab(_id: $id) {
      _id
      blabText
      createdAt
      username
      imageUrl
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_USER = gql `
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      blabs {
        _id
        blabText
        createdAt
        commentCount
        imageUrl
      }
    }
  }
`;

export const QUERY_ME = gql `
  {
    me {
      _id
      username
      email
      friendCount
      blabs {
        _id
        blabText
        imageUrl
        createdAt
        commentCount
        comments {
          _id
          createdAt
          commentBody
          username
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql `
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;