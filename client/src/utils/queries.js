import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postBody
        createdAt
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      postBody
      username
      createdAt
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      postBody
      username
      createdAt
      comments {
        _id
        commentBody
        username
        createdAt
      }
    }
  }
`;

export const QUERY_DOGS = gql`
  query getDogs {
    dogs {
        _id
        name
        type
        breeder
        image
        description
        akcLink
    }
  }
`;

export const QUERY_SINGLE_DOG = gql`
  query getSingleDog($dogId: ID!) {
    dog(dogId: $dogId) {
      _id
      name
      type
      breeder
      image
      description
      akcLink
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts {
        _id
        postBody
        username
        createdAt
      }
    }
  }
`;