import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
}
`;

export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
}
`;
//TODO: work on saving book
export const SAVE_BOOK = gql`
 mutation saveBook($book: BookInput) {
  saveBook(book: $book) {
    _id
    username
    email
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;

//TODO: work on removing saved book
export const REMOVE_BOOK = gql`
  mutation deleteBook($bookId: String) {
  deleteBook(bookId: $bookId) {
    _id
    username
    email
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;
