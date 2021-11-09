import React from "react";

const commentStyle = {
  color: "black"
};

const titleStyle = {
  backgroundColor: "#66ccff",
  padding: "10px",
  color: 'black'
};

const divStyle = {
  justifyContent: "Center",
  padding: '20px'
};

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <section className="comments">
      <h1 style={titleStyle}>Comments</h1>
      {comments &&
        comments.map((comment) => (
          <div className="row" style={divStyle} key={comment._id}>
            <div className="col-sm-8">
            <div className="card">
              <div className="card-header" style={commentStyle}>Comment</div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p style={commentStyle}>
                    {comment.commentBody}
                  </p>
                  <footer className="blockquote-footer">
                    Posted by {comment.username} on {comment.createdAt}
                    {/* <cite title="Source Title">{comment.username}</cite> */}
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
          </div>
        ))}
    </section>
  );
};

export default CommentList;

// return (
//   <>
//     <h3
//       // className="p-5 display-inline-block"
//       className="p-5"
//       style={{ borderBottom: '1px dotted #1a1a1a' }}
//     >
//       Comments
//     </h3>
//     <div className="row" style={divStyle}>
//       {comments &&
//         comments.map((comment) => (
//           <div key={comment._id} className="col-12 mb-3 pb-3">
//             <div className="w-50" style={titleStyle}>
//               <h5 className="card-header" style={commentStyle}>
//                 {comment.username} commented{' '}
//                 <span style={{ fontSize: '0.825rem' }}>
//                   on {comment.createdAt}
//                 </span>
//               </h5>
//               <p className="comment" style={commentStyle}>{comment.commentBody}</p>
//             </div>
//           </div>
//         ))}
//     </div>
//   </>
// );
