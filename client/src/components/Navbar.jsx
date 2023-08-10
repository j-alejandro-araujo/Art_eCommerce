import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
import GlobalContext from './GlobalContext';
import CartContext from './CartContext';
import { NavDrawer } from './Drawer';
import logo from '../logo.png';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { user, handleSignout } = useContext(GlobalContext);
  const { cart } = useContext(CartContext);

  return (
    <nav>
      <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
        {/* Top Side */}
        <Link to="/" className="flex">
          <img src={logo} alt="logo" className="w-16 h-16 hidden sm:block" />
          <h1 className="text-2xl sm:text-3xl lg:text-5xl pt-3">
            ART<span className="font-bold text-[#EE2D25]">MANIA</span>
          </h1>
        </Link>
        {/* Search Input */}
        <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[300px] m:w-[400px] lg:w-[600px]">
          <SearchBar />
        </div>
        <div className="flex items-center cursor-pointer">
          <div>
            {user && (
              <div
                onClick={handleSignout}
                className="relative group whitespace-nowrap text-lg">
                Sign out
                <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </div>
            )}
            {!user && (
              <Link
                to="/sign-in"
                className="relative group whitespace-nowrap text-lg">
                Sign in
                <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            )}
          </div>
          <p className="mr-3 ml-3">|</p>
          {/* Shopping Cart */}
          <Link to="/cart" className="hover:text-[#EE2D25] mr-3">
            <FontAwesomeIcon icon={faCartShopping} />
            {cart.length > 0 && (
              <span className="cart-badge text-red-600">{cart.length}</span>
            )}
          </Link>
        </div>
      </div>

      <div>
        <div className="bg-white shadow-md max-w-[1640px] mx-auto flex justify-between items-center p-4 pb-8 px-10">
          {/* Bottom Side */}
          <div className="z-50">
            <NavDrawer />
          </div>
          <Link to="/products">
            <p className="cursor-pointer hidden sm:block relative group whitespace-nowrap text-lg">
              All
              <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </p>
          </Link>
          <Link to="/paint">
            <p className="cursor-pointer hidden sm:block relative group whitespace-nowrap text-lg">
              Paint
              <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </p>
          </Link>
          <Link to="/canvas">
            <p className="cursor-pointer hidden sm:block relative group whitespace-nowrap text-lg">
              Canvas
              <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </p>
          </Link>
          <Link to="/brushes">
            <p className=" cursor-pointer hidden sm:block relative group whitespace-nowrap text-lg">
              Brushes
              <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </p>
          </Link>
          <Link to="/drawing">
            <p className="cursor-pointer hidden sm:block relative group whitespace-nowrap text-lg">
              Drawing
              <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </p>
          </Link>
          <Link to="/sculpting">
            <p className="cursor-pointer hidden sm:block relative group whitespace-nowrap text-lg">
              Sculpting
              <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </p>
          </Link>
          <Link to="/pencils">
            <p className="cursor-pointer hidden sm:block relative group whitespace-nowrap text-lg">
              Pencils
              <span className="cursor-pointer absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </p>
          </Link>
        </div>
        <Outlet />
      </div>
    </nav>
  );
};

export default Navbar;
