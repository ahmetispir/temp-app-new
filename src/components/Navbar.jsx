import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg sticky top-0 z-50  ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold hover:opacity-90 transition">
          MyWebsite
        </NavLink>
        <div className="space-x-6">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-yellow-300 transition ${isActive ? "text-yellow-300" : ""}`
            }
          >
            Hakkımızda
          </NavLink>
          <NavLink
            to="/references"
            className={({ isActive }) =>
              `hover:text-yellow-300 transition ${isActive ? "text-yellow-300" : ""}`
            }
          >
            Referanslar
          </NavLink>
          <NavLink
            to="/works"
            className={({ isActive }) =>
              `hover:text-yellow-300 transition ${isActive ? "text-yellow-300" : ""}`
            }
          >
            Neler Yapıyoruz
          </NavLink>
          <NavLink
            to="/login"
            className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
