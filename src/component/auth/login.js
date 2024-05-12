import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function attemptLogin() {
    axios
      .post('https://medicalstore.mashupstack.com/api/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        setErrorMessage('');
        var user = {
          email: email,
          token: response.data.token,
        };
        dispatch(setUser(user));
        navigate('/medicines');
      })
      .catch((error) => {
        if (error.response.data.errors) {
          setErrorMessage(Object.values(error.response.data.errors).join(''));
        } else if (error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to login user. Please contact admin');
        }
      });
  }

  return (
    <div className="background">
      <div className="container pt-5">
        <div className="row">
          <div className="col-8 offset-2 text-light">
            <h1>Login</h1>
            {errorMessage ? (
              <div className="alert alert-danger">{errorMessage}</div>
            ) : (
              ''
            )}
            <div className="form-group text-secondary">
             
              <input
                type="text"
                className="form-control"
                value={email}
                placeholder='Email:'
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
             
              <input
                type="password"
                className="form-control"
                value={password}
                placeholder='Password:'
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary float-right"
                onClick={attemptLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
