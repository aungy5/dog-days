import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
//import './about.css'
import '../../App.css'

const linkStyle = {
    color: '#66ccff'
}

const pStyle = {
    margin: '30px'
}

const divStyle = {
    paddingBottom: '25px'
}

const titleStyle = {
    backgroundColor: "#66ccff",
    padding: "20px",
};

const About = () => {
    
    // const [matches, setMatches] = useState(window.matchMedia("(max-height: 450px)").matches)

    // useEffect(() => {
    //     const eventHandler = (e) => setMatches( e.matches );
    //     window.matchMedia("(max-width: 400px)").addListener(eventHandler)
    // }, []);

    return (

    <div className="jumbotron">
  <h1 className="display-4" style={titleStyle}>Welcome</h1>

  <img className="img1" id="scaledImg" src="https://github.com/aungy5/ecommerce-site/raw/main/client/public/images/running dogs.jpeg" alt="dogsRunning"></img> 
  
  {/* {matches && (
  <img className="img" src="https://github.com/aungy5/ecommerce-site/raw/main/client/public/images/running dogs.jpeg" alt="dogsRunning" style={imgStyle}></img> 
  )}

  {!matches && (
  <img className="img" src="https://github.com/aungy5/ecommerce-site/raw/main/client/public/images/running dogs.jpeg" alt="dogsRunning" style={imgSmall}></img> )} */}

  <p className="lead" style={pStyle}>Welcome to DogDays, we are so happy you are here! Whether you are looking to purchase a dog, need help with what food or toys to buy, or just want to look at some cute puppy pictures, we have a community of dog lovers eager to help you out! Please be sure to check out the Posts section to see what our users are saying about the dogs we have helped them purchase, as this information can be very helpful in your search for a furry companion! Click the button below to view our current selection of available dogs. </p>
  <hr className="my-4"></hr>
  <p></p>
  {/* <p className="lead"> */}
  <div className="buttons" style={divStyle}>
  <button type="button" className="btn btn-dark">
      <Link to="/dogs" style={linkStyle}>
      View Our Dogs!
      </Link>
    </button>
    <br></br>
    <br></br>
    <button type="button" className="btn btn-dark">
      <Link to="/posts" style={linkStyle}>
      View Our Blog!
      </Link>
    </button>
    </div>
  {/* </p> */}
</div>
    )
}

export default About;