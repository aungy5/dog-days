import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navigation.css";
import Auth from "../../utils/auth";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

const navStyle = {
  color: "#66ccff",
};

const imgStyle = {
  height: "40px",
  width: "40px",
};

const activeLink = {
  fontWeight: "bold",
};

const barStyle = {
  width: "100%",
  padding: "15px",
};

function Navigation(props) {
  function showNav() {
    if (Auth.loggedIn()) {
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <a className="navbar-brand" style={navStyle} href="/"> <img src="https://github.com/aungy5/ecommerce-site/raw/main/client/public/images/whitepaw.png" style={imgStyle}></img> DogDays </a>
            {/* <Navbar.Brand href="#home">DogDays</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/about" style={navStyle}>Welcome</Nav.Link>
                <Nav.Link href="/dogs" style={navStyle}>Dogs</Nav.Link>
                <Nav.Link href="/posts" style={navStyle}>Posts</Nav.Link>
                <Nav.Link href="/contact" style={navStyle}>Contact</Nav.Link>
                <a href="/" className="nav-link" onClick={() => Auth.logout()} style={navStyle}>Logout</a>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );

    } else {
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <a className="navbar-brand" style={navStyle} href="/"> <img src="https://github.com/aungy5/ecommerce-site/raw/main/client/public/images/whitepaw.png" style={imgStyle}></img> DogDays </a>
            {/* <Navbar.Brand href="#home">DogDays</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/about" style={navStyle}>Welcome</Nav.Link>
                <Nav.Link href="/dogs" style={navStyle}>Dogs</Nav.Link>
                <Nav.Link href="/posts" style={navStyle}>Posts</Nav.Link>
                <Nav.Link href="/contact" style={navStyle}>Contact</Nav.Link>
                <Nav.Link href="/signup" style={navStyle}>Signup</Nav.Link>
                <Nav.Link href="/login" style={navStyle}>Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-dark"
      style={barStyle}
    >
      {/* <a class="navbar-brand" style={navStyle} href="#"> <img src="https://github.com/aungy5/ecommerce-site/raw/main/client/public/images/whitepaw.png" style={imgStyle}></img> DogDays </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup"> */}
      <div className="navbar-nav">{showNav()}</div>
      {/* </div> */}
    </nav>
  );
}

export default Navigation;
