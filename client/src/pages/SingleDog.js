import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SaveDog from '../components/saveDog/saveDog'

import { QUERY_SINGLE_DOG } from '../utils/queries';

const linkStyle = {
    color: "#66ccff",
};
  
  const titleStyle = {
    backgroundColor: "#66ccff",
    padding: "20px",
};
  
  const dogStyle = {
    padding: "20px",
    backgroundColor: '#212429',
    justifyContent: 'Center'
};
  

const SingleDog = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { dogId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_DOG, {
    // pass URL parameter
    variables: { dogId: dogId },
  });

  const dog = data?.dog || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="dogs">
        <h1 style={titleStyle}>DOG NAME SHOULD BE = {dog.name}</h1>
          <div className="row" key={dog._id} style={dogStyle}>
          <div className="col-sm-8">
            <div className="card text-center">
              <div className="card-header" style={titleStyle}>{dog.type}</div>
              <div className="card-body">
                <h5 className="card-title">{dog.name}</h5>
                <img className="img1" src={dog.image}></img>
                <p className="card-text">
                  {dog.description}
                  
                </p>
                <a href={dog.akcLink} className="btn btn-dark" style={linkStyle}>
                  Learn More About This Breed
                </a>
                <br></br>
                <br></br>
                <SaveDog />
              </div>
              {/* <div class="card-footer text-muted">XXX</div> */}
            </div>
          </div>
        </div>
      </section>
  )

};

export default SingleDog;