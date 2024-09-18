
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Navbar = () => {
        const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
        return (
                <nav className="bg-gray-800 p-4 z-30 sticky top-0">
                <div className="container mx-auto flex justify-between items-center ">
                  <div className="text-white text-2xl font-bold">
                    <Link to="/">BOOK LIBRARY</Link>
                  </div>
                  <div className="hidden md:flex space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/about-us" className="text-white hover:text-gray-300">About</Link>
                    <Link to="/blog" className="text-white hover:text-gray-300">Blog</Link>
                    <Link to="/signUp" className="text-white hover:text-gray-300">SignUp</Link>
                    <Link to="/Login" className="text-white hover:text-gray-300">login</Link>
                  </div>
                  <div className="md:hidden">
                    <button onClick={toggleDropdown} className="text-white focus:outline-none">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                {isOpen && (
                  <div className="md:hidden bg-gray-700">
                    <ul className="flex flex-col items-center space-y-2 p-4">
                      <li>
                        <Link to="/" className="text-white hover:text-gray-300" onClick={toggleDropdown}>Home</Link>
                      </li>
                      <li>
                        <Link to="/about-us" className="text-white hover:text-gray-300" onClick={toggleDropdown}>About</Link>
                      </li>
                      <li>
                        <Link to="/Login" className="text-white hover:text-gray-300" onClick={toggleDropdown}>login</Link>
                      </li>
                      <li>
                        <Link to="/signUp" className="text-white hover:text-gray-300" onClick={toggleDropdown}>Signup</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </nav>
            );
          };
          

export default Navbar;