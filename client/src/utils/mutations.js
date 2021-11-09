import { gql } from '@apollo/client';

export const LOGIN = gql`
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

export const ADD_USER = gql`
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

export const ADD_POST = gql`
  mutation addPost($postBody: String!) {
    addPost(postBody: $postBody) {
      _id
      postBody
      username
      createdAt
      comments {
        _id
        commentBody
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentBody: String!) {
    addComment(postId: $postId, commentBody: $commentBody) {
      _id
      postBody
      username
      createdAt
      comments {
        _id
        commentBody
        createdAt
      }
    }
  }
`;