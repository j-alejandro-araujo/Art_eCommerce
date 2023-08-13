import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const tokenKey = 'react-context-jwt';

export function useAuth() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const { user, token } = JSON.parse(auth);
      setUser(user);
      setToken(token);
    }
    setIsAuthorizing(false);
  }, []);

  function handleSignin(auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    const { user, token } = auth;
    setUser(user);
    setToken(token);
  }

  function handleSignout() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
    navigate(-1);
  }

  return { user, token, isAuthorizing, handleSignin, handleSignout };
}
