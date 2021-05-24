const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    blabs: [Blab]
    friends: [User]

  }

  type Blab {
    _id: ID
    blabText: String
    imageUrl: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }



  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    blabs(username: String): [Blab]
    blab(_id: ID!): Blab
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addImage(blabId: ID!, imageUrl: String!): Blab
    addBlab(blabText: String!): Blab
    addLike(blabId: ID!): Blab!
    addComment(blabId: ID!, commentBody: String!): Blab
    likeComment(_id:ID): Comment
    removeBlab(blabId: ID!): User
    removeFriend(friendId: ID): User

  }
`;

module.exports = typeDefs;

//    likeBlab(_id: ID): Blab
//    likeComment(_id:ID): Comment