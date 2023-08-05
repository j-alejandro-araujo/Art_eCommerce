import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../components/AuthenticationForm';
import GlobalContext from '../components/GlobalContext';

export default function AuthenticationPage({ action }) {
  const navigate = useNavigate();
  const { user, handleSignIn } = useContext(GlobalContext);

  useEffect(() => {
    if (user) navigate('/products');
  }, [user, navigate]);

  const welcomeMessage =
    action === 'sign-in' ? 'Please sign in' : 'Register here!';

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow">
        <header className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Register Below
          </h2>
          <p className="text-gray-600">{welcomeMessage}</p>
        </header>
        <div className="card p-3">
          <AuthenticationForm
            key={action}
            action={action}
            onSignIn={handleSignIn}
          />
        </div>
      </div>
    </div>
  );
}
