import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticate } from '../lib/api';

const AuthenticationForm = ({ action, onSignIn }) => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [autofillValues, setAutofillValues] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, password } = Object.fromEntries(formData.entries());
    try {
      const result = await authenticate(action, username, password);
      if (action === 'sign-up') {
        navigate('/sign-in');
      } else if (result.user && result.token) {
        onSignIn(result);
      }
    } catch (err) {
      setError(err);
    }
  };

  const showGuestButton = action === 'sign-in';

  const handleGuestLogin = () => {
    if (showGuestButton) {
      const autofillUsername = 'guest';
      const autofillPassword = 'guest';
      setAutofillValues({
        username: autofillUsername,
        password: autofillPassword,
      });
    }
  };

  const altRoute = action === 'sign-up' ? '/sign-in' : '/sign-up';
  const altActionMessage = action === 'sign-up' ? 'Sign in' : 'Register here!';
  const actionBtnText = action === 'sign-up' ? 'Register' : 'Log In';

  return (
    <form className="w-100" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">
          Username:
          <input
            required
            autoFocus
            type="text"
            name="username"
            className="form-input ml-2"
            defaultValue={autofillValues.username}
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Password:
          <input
            required
            type="password"
            name="password"
            className="form-input ml-2"
            defaultValue={autofillValues.password}
          />
        </label>
      </div>
      <div className="flex justify-between items-center">
        <small>
          <Link className="text-gray-600" to={altRoute}>
            {altActionMessage}
          </Link>
        </small>
        {showGuestButton && (
          <button
            type="button"
            onClick={handleGuestLogin}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2">
            Continue as guest
          </button>
        )}
        <button
          type="submit"
          className="bg-[#2BA3C6] hover:bg-[#1b81a0] text-white font-bold py-2 px-4 rounded">
          {actionBtnText}
        </button>
      </div>
      {error && <div className="text-red-500 mt-2">Error: {error.message}</div>}
    </form>
  );
};

export default AuthenticationForm;
