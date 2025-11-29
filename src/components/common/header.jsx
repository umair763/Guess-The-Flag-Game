import React, { useState } from "react";
import logo from "../../assets/images/logo.png";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="mx-auto fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-50 bg-white/10 backdrop-blur-md border border-gray-700 rounded-bl-4xl rounded-br-4xl shadow-md">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="Guess The Flag" className="h-10 w-10 md:h-12 md:w-12 object-contain" />

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 text-white ml-auto">
          <a href="#home" className="hover:underline">
            Home
          </a>
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden ml-auto">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md px-6 pb-4 border border-gray-700 rounded-b-xl">
          <nav className="flex flex-col space-y-2 text-white">
            <a href="#home" className="hover:underline">
              Home
            </a>
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
