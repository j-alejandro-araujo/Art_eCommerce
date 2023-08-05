import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticate } from '../lib/api';

export default function AuthForm({ action, onSignIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState();

  async function handleSubmit(event) {
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
  }

  const altRoute = action === 'sign-up' ? '/sign-in' : '/sign-up';
  const altActionMessage =
    action === 'sign-up' ? 'Sign in instead' : 'Register now';
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
            className="form-input"
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
            className="form-input"
          />
        </label>
      </div>
      <div className="flex justify-between items-center">
        <small>
          <Link className="text-gray-600" to={altRoute}>
            {altActionMessage}
          </Link>
        </small>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {actionBtnText}
        </button>
      </div>
      {error && <div className="text-red-500 mt-2">Error: {error.message}</div>}
    </form>
  );
}
