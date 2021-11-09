import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
//import { ApolloProvider } from '@apollo/client'

const titleStyle = {
    backgroundColor: '#66ccff',
    padding: '20px'
  }
  
const linkStyle = {
    color: '#66ccff',
  }
  
  const errorStyle = {
    backgroundColor: 'black',
    color: '#66ccff'
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px'
  }

  const padding = {
    padding: '10px'
  }

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="login">
            <h1 style={titleStyle}>Login</h1>
            <br/>
            <Link to="/signup">
            <button className="btn btn-dark" style={linkStyle}>Go to Signup Page</button>
            </Link>

            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={formStyle}>
                <input
                  className="form-input"
                  style={padding}
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  style={padding}
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />

          <button className="btn btn-dark" style={linkStyle}>Login</button>
        </form>
        )}

        {error ? (
            <div style={errorStyle}>
              <h3>Form Errors:</h3>
              <p className="error">The user credentials provided are incorrect, please try again. {error.message}</p>
            </div>
          ) : null}
        </div> 
  );
};

export default Login;




/* <div className="login" style={padding}>
            <h1 style={titleStyle}>Login</h1>
            <br/>
            <Link to="/signup">
            <button className="btn btn-dark" style={linkStyle} onSubmit={handleSubmit}>Go to Signup Page</button>
            </Link>
        <form>
          <div className="form-group" style={padding}>
            <label htmlFor="email">EMAIL</label>
            <textarea name="email" id="email" placeholder="Enter your email here..." className="form-control" onChange={handleChange}></textarea>
          </div>
          <div className="form-group" style={padding}>
            <label htmlFor="password">PASSWORD</label>
            <textarea name="password" id="password" placeholder="Enter your password here..." className="form-control" onChange={handleChange}></textarea>
          </div>

          {error ? (
            <div style={errorStyle}>
              <h3>Form Errors:</h3>
              <p className="error">The user credentials provided are incorrect, please try again.</p>
            </div>
          ) : null}

          <button className="btn btn-dark" style={linkStyle} onSubmit={handleSubmit}>Login</button>
        </form>
        </div> */