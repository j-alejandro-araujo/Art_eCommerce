import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from './lib/api';

const tokenKey = 'react-context-jwt';

export function useAuth() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = sessionStorage.getItem(tokenKey);
    if (auth) {
      const { user, token } = JSON.parse(auth);
      setUser(user);
      setToken(token);
    }
    setIsAuthorizing(false);
  }, []);

  async function handleSignup(username, password) {
    try {
      const auth = await signUp(username, password);
      handleSignin(auth);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignin(auth) {
    sessionStorage.setItem(tokenKey, JSON.stringify(auth));
    const { user, token } = auth;
    setUser(user);
    setToken(token);
    navigate(-1);
  }

  function handleSignout() {
    sessionStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
    navigate('/');
  }

  return {
    user,
    token,
    isAuthorizing,
    handleSignup,
    handleSignin,
    handleSignout,
  };
}
