import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../components/AuthenticationForm';
import GlobalContext from '../components/GlobalContext';

export default function AuthenticationPage({ action }) {
  const navigate = useNavigate();
  const { user, handleSignin } = useContext(GlobalContext);

  useEffect(() => {
    if (user) navigate('/products');
  }, [user, navigate]);

  const greeting = action === 'sign-in' ? 'Sign in' : 'Register';

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center mb-6">{greeting}</h2>
        <div className="card p-3">
          <AuthenticationForm
            key={action}
            action={action}
            onSignIn={handleSignin}
          />
        </div>
      </div>
    </div>
  );
}
