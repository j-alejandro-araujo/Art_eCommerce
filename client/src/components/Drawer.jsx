import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export function NavDrawer() {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <button onClick={openDrawer} className="cursor-pointer">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div
        className={`fixed inset-0 overflow-hidden transition-opacity ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        } ${open ? 'opacity-100' : 'opacity-0'}`}>
        <div
          className={`absolute inset-0 ${
            open ? 'bg-black opacity-50' : 'bg-transparent'
          } transition-opacity`}
          onClick={closeDrawer}></div>
        <div
          className={`absolute inset-y-0 left-0 pr-10 max-w-full flex z-50 transform transition-transform ${
            open
              ? 'translate-x-0 transition duration-300 ease-out'
              : '-translate-x-full transition duration-300 ease-in'
          }`}>
          <div className="w-screen max-w-md">
            <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
              <div className="flex-1 h-0 overflow-y-auto">
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between py-2 px-4 p-0">
                    <h2 className="text-3xl font-bold cursor-pointer hover:text-[#2BA3C6]">
                      Hello, sign in
                    </h2>
                    <button className="text-blue-gray" onClick={closeDrawer}>
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="fa-2x hover:text-[#EE2D25]"
                      />
                    </button>
                  </div>
                  <hr className="my-4 border-t border-gray-400" />
                  <ul className="mb-4 space-y-2">
                    <li className="hover:bg-[#2ba2c628] rounded-3xl cursor-pointer text-center py-2">
                      PAINT
                    </li>
                    <li className="hover:bg-[#2ba2c628] rounded-3xl cursor-pointer text-center py-2">
                      CANVAS
                    </li>
                    <li className="hover:bg-[#2ba2c628] rounded-3xl cursor-pointer text-center py-2">
                      BRUSHES
                    </li>
                    <li className="hover:bg-[#2ba2c628] rounded-3xl cursor-pointer text-center py-2">
                      DRAWING
                    </li>
                    <li className="hover:bg-[#2ba2c628] rounded-3xl cursor-pointer text-center py-2">
                      SCULPTING
                    </li>
                    <li className="hover:bg-[#2ba2c628] rounded-3xl cursor-pointer text-center py-2">
                      PENCILS
                    </li>
                    <li className="hover:bg-[#2ba2c628] rounded-3xl cursor-pointer text-center py-2">
                      FRAMING
                    </li>
                    <li className="hover:bg-[#2ba2c628] rounded-3xl cursor-pointer text-center py-2">
                      PRINTMAKING
                    </li>
                    <li className="hover:bg-[#2ba2c628] rounded-3xl cursor-pointer text-center py-2">
                      FABRIC
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
