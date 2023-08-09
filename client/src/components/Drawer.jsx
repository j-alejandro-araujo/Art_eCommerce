import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export function NavDrawer() {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <button
        onClick={openDrawer}
        className="cursor-pointer flex justify-center">
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
                  <ul className="mb-4 space-y-5">
                    <li className="cursor-pointer sm:block relative group whitespace-nowrap">
                      PAINT
                      <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </li>
                    <li className="cursor-pointer sm:block relative group whitespace-nowrap">
                      CANVAS
                      <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </li>
                    <li className="cursor-pointer sm:block relative group whitespace-nowrap">
                      BRUSHES
                      <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </li>
                    <li className="cursor-pointer sm:block relative group whitespace-nowrap">
                      DRAWING
                      <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </li>
                    <li className="cursor-pointer sm:block relative group whitespace-nowrap">
                      SCULPTING
                      <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </li>
                    <li className="cursor-pointer sm:block relative group whitespace-nowrap">
                      PENCILS
                      <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </li>
                    <li className="cursor-pointer sm:block relative group whitespace-nowrap">
                      FRAMING
                      <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </li>
                    <li className="cursor-pointer sm:block relative group whitespace-nowrap">
                      PRINTMAKING
                      <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </li>
                    <li className="cursor-pointer sm:block relative group whitespace-nowrap">
                      FABRIC
                      <span className="absolute inset-x-0 bottom-[-5px] h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
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