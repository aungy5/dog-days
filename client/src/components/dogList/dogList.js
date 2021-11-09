import React from "react";
import { Link } from "react-router-dom";

import '../../App.css'

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

const imgStyle = {
  height: "300px",
  width: "500px",
};

const dogList = ({ dogs }) => {
  if (!dogs.length) {
    return <h3>No dogs Yet</h3>;
  }


    return (
      <section className="dogs">

        <h1 style={titleStyle}>Our Dogs</h1>
        {dogs.map((dog) => (
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
              </div>
              {/* <div class="card-footer text-muted">XXX</div> */}
            </div>
          </div>
        </div>
        ))}
      </section>
    )
};

export default dogList;
