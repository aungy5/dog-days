import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const formStyle = {
  justifyContent: 'Center'
}

const titleStyle = {
  backgroundColor: '#66ccff',
  padding: '20px',
  color: 'black'
}

const linkStyle = {
  color: '#66ccff'
}

const CommentForm = ({ postId }) => {
  const [commentBody, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          postId,
          commentBody,
          username: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentBody' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="p-3 bg-dark text-light" style={formStyle}>

      <h4 style={titleStyle}>What do YOU have to say about this Post?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-12">
              <textarea
                name="commentBody"
                placeholder="Add your comment..."
                value={commentBody}
                className="form-input w-50"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-12">
              <button className="btn btn-light btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your posts. Please{' '}
          <Link to="/login" style={linkStyle}>login</Link> or <Link to="/signup" style={linkStyle}>signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
