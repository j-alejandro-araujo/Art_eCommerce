import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
import GlobalContext from './GlobalContext';
import CartContext from './CartContext';
import { NavDrawer } from './Drawer';

const Navbar = () => {
  const { user, handleSignout } = useContext(GlobalContext);
  const { cart } = useContext(CartContext);

  return (
    <nav>
      <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
        {/* Top Side */}
        <Link to="/">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
            ART<span className="font-bold text-[#EE2D25]">STORE</span>
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
        <div className="flex items-center cursor-pointer">
          <div>
            {user && (
              <div
                onClick={handleSignout}
                className="relative group whitespace-nowrap">
                Sign out
                <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </div>
            )}
            {!user && (
              <Link to="/sign-in" className="relative group whitespace-nowrap">
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
              <span className="cart-badge">{cart.length}</span>
            )}
          </Link>
        </div>
      </div>

      <div>
        <div className="bg-white shadow-md max-w-[1640px] mx-auto flex justify-between items-center p-4">
          {/* Bottom Side */}
          <div className="z-50">
            <NavDrawer />
          </div>
          <Link to="/products">
            <p className="cursor-pointer relative group whitespace-nowrap">
              ALL
              <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </p>
          </Link>
          <p className="cursor-pointer relative group whitespace-nowrap">
            PAINT
            <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </p>
          <p className="cursor-pointer hidden sm:block relative group whitespace-nowrap">
            CANVAS
            <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </p>
          <p className=" cursor-pointer relative group whitespace-nowrap">
            BRUSHES
            <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </p>
          <p className="cursor-pointer hidden sm:block relative group whitespace-nowrap">
            DRAWING
            <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </p>
          <p className="cursor-pointer relative group whitespace-nowrap">
            SCULPTING
            <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </p>
          <p className="cursor-pointer hidden sm:block relative group whitespace-nowrap">
            PENCILS
            <span className="cursor-pointer absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </p>
        </div>
        <Outlet />
      </div>
    </nav>
  );
};

export default Navbar;
