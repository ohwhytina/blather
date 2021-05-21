const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    blabs: [Blab]
    friends: [User]
    images: [Image]
  }

  type Blab {
    _id: ID
    blabText: String
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

  type Image {
    _id: ID
    url: String
    caption: String
    createdAt: String
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
    imagesByUser(username: String!): [Image]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBlab(blabText: String!): Blab
    likeBlab(_id: ID): Blab
    addComment(blabId: ID!, commentBody: String!): Blab
    addFriend(friendId: ID!): User
    likeComment(_id:ID): Comment
    addImage(url: String!, caption: String!, username: String!): [Image]
  }
`;

module.exports = typeDefs;

// imagesByUser(username: String!): [Image]