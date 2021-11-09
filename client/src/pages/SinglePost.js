import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/commentList/commentList';
import CommentForm from '../components/commentForm/commentForm';

import { QUERY_SINGLE_POST } from '../utils/queries';

const titleStyle = {
  backgroundColor: '#66ccff',
  padding: '20px'
}

const dogStyle = {
  padding: "20px",
  //backgroundColor: 'black',
  justifyContent: 'Center'
};

const quoteStyle = {
  fontSize: '1.5rem',
  fontStyle: 'italic',
  border: '2px dotted #1a1a1a',
  lineHeight: '1.5',
}

const commentStyle = {
  color: 'white',
  padding: '20px'
}

const SinglePost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="post">
    <h1 style={titleStyle}>Post Discussion</h1>
          <div className="row bg-dark" style={dogStyle}>
          <div className="col-sm-8">
            <div class="card text-center">
              <div class="card-header" style={titleStyle}>{post.createdAt}</div>
              <div class="card-body">
                <h5 class="card-title">{post.postBody}</h5>
                {/* <img src={dog.image} style={imgStyle}></img> */}
                <p class="card-text">
                  -Posted by {post.username}
                  
                </p>
                {/* <a href={dog.akcLink} class="btn btn-dark"></a> */}
              </div>
              {/* <div class="card-footer text-muted">XXX</div> */}
            </div>
          </div>
            <div className="bg-dark" style={commentStyle}>
              <CommentList comments={post.comments} />
            </div>

            <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
              <CommentForm postId={post._id} />
            </div>

        </div>
      </section>
  )

  // return (
  //   <React.Fragment>
  //       <h3 class="singlePost" style={titleStyle}>{post.username} posted on {post.createdAt}</h3>
  //       <blockquote style={quoteStyle}>
  //         {post.postBody}
  //       </blockquote>

  //       <div className="bg-dark" style={commentStyle}>
  //      <CommentList comments={post.comments} />
  //       </div>

  //       <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
  //       <CommentForm postId={post._id} />
  //       </div>

  //     </React.Fragment>
  // )
  
  
  // return (
  //   <div className="my-3">
  //     <h3 className="">
  //       {post.username} <br />
  //       <span style={{ fontSize: '1rem' }}>
  //         had this post on {post.createdAt}
  //       </span>
  //     </h3>
  //     <div className="bg-light py-4">
  //       <blockquote
  //         className="p-4"
  //         style={{
  //           fontSize: '1.5rem',
  //           fontStyle: 'italic',
  //           border: '2px dotted #1a1a1a',
  //           lineHeight: '1.5',
  //         }}
  //       >
  //         {post.postBody}
  //       </blockquote>
  //     </div>

  //     <div className="my-5">
  //       <CommentList comments={post.comments} />
  //     </div>
  //     <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
  //       <CommentForm postId={post._id} />
  //     </div>
  //   </div>
  // );
};

export default SinglePost;