import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faSearch,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  // const navigate = useNavigate();

  // const handleAllClick = () => {
  //   navigate('/product');
  return (
    <>
      <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
        {/* Top Side */}
        <Link to="/">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
            ART<span className="font-bold">DEPOT</span>
          </h1>
        </Link>
        {/* Search Input */}
        <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
          <FontAwesomeIcon icon={faSearch} />
          <input
            className="bg-transparent p-2 w-full focus:outline-none"
            type="search"
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center">
          <p>Sign in</p>
          <p>|</p>
          {/* Shopping Cart */}
          <button>
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </div>
      </div>

      <div>
        <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
          {/* Bottom Side */}
          <Link to="products">
            ALL
            <FontAwesomeIcon icon={faBars} />
          </Link>
          <p>PAINT</p>
          <p>CANVAS</p>
          <p>BRUSHES</p>
          <p>DRAWING</p>
          <p>SCULPTING</p>
          <p>PENCILS</p>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
