import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        // Redirect to the home page
        navigate('/');
      };
  return (
    <header className="bg-pink-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">De'Licious</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-pink-200">Home</Link></li>
          <li><Link to="/ask" className="hover:text-pink-200">Ask</Link></li>
          <li>
            <Link to="/cart" className="hover:text-pink-200">
              <FaShoppingCart size={24} />
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;