import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const hStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'Center',
  padding: '10px',
  backgroundColor: '#66ccff'
}

const pStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'Center',
  padding: '10px'
}

const linkStyle = {
  color: '#66ccff'
}

const PostForm = () => {
  const [postBody, setPostBody] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, posts: [...me.posts, addPost] } },
      // });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          postBody,
          username: Auth.getProfile().data.username,
        },
      });

      setPostBody('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'postBody' && value.length <= 280) {
      setPostBody(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <div className="form" style={hStyle}>
      <h3>What's on your mind?</h3>
      </div>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="form"
            onSubmit={handleFormSubmit}
            style={pStyle}
          >
            <div className="col-12">
              <textarea
                name="postBody"
                placeholder="Type your post here..."
                value={postBody}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12">
              <button className="btn btn-dark" type="submit" style={linkStyle}>
                Add Post
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <div className="form" style={pStyle}>
        <p>
          You need to be logged in to share your posts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
        </div>
      )}
    </div>
  );
};

export default PostForm;
