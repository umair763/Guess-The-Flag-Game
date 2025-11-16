import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Left: Copyright */}
        <div className="text-sm">&copy; {new Date().getFullYear()} MyCompany. All rights reserved.</div>

        {/* Right: Links */}
        <div className="flex space-x-4 text-sm">
          <a href="#privacy" className="hover:underline">
            Privacy
          </a>
          <a href="#terms" className="hover:underline">
            Terms
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
