const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Dog {
    _id: ID
    name: String
    type: String
    breeder: String
    image: String,
    description: String,
    akcLink: String
  }


  type User {
    _id: ID
    username: String
    password: String
    email: String
    savedDogs: [Dog]!
  }

  type Post {
    _id: ID
    postBody: String
    username: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentBody: String
    username: String
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
    posts(username: String): [Post]
    post(postId: ID!): Post
    dogs(username: String): [Dog]
    dog(dogId: ID!): Dog
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!, email: String!, password: String!): User
    addPost(postBody: String!): Post
    addComment(postId: ID!, commentBody: String!): Post
    saveDog(dogId: ID!): User
    removeDog(dogId: ID!): User
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
