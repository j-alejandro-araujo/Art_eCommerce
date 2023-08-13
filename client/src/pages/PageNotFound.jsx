import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">
          Uh oh, we could not find the page you were looking for!
        </h3>
        <p className="text-gray-500">
          <Link to="/products" className="text-blue-500 hover:underline">
            Return to the catalog
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
