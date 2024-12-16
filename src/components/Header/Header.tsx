import React from "react";
import Image from "next/image";

const Header = () => {
  return (
      <header className="w-full h-20 flex items-center text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font">
        <div className="container flex items-center mx-auto max-lg:px-4">
          <nav className="flex items-center text-base lg:w-2/5 md:ml-auto max-md:mr-auto">
            <a href="http://localhost:3000/page/1" className="mr-5 font-medium hover:text-gray-900">
              Home
            </a>
            <a href="#_" className="mr-5 font-medium hover:text-gray-900">
              About
            </a>
            <a href="#_" className="font-medium hover:text-gray-900">
              Contact
            </a>
          </nav>
          <a className="flex justify-center items-center order-first mb-4 font-medium text-gray-900 lg:order-none lg:w-1/5 title-font lg:items-center lg:justify-center md:mb-0 max-sm:hidden">
            <Image src="/images/logo.webp" alt="Logo"
              width={50}
              height={50}
              className="w-14 h-14 rounded-full"/>
          </a>
          <div className="inline-flex items-center h-full ml-5 lg:w-2/5 lg:justify-end lg:ml-0">
            <a href="#_" className="mr-5 font-medium hover:text-gray-900 text-blue-900">
              Login
            </a>
            <a
              href="#_"
              className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-blue-900 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>
  );
};

export default Header;
