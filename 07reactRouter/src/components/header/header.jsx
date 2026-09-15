import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 py-2.5">
        <div className="relative flex items-center mx-auto max-w-screen-xl">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=200&q=80"
              className="mr-3 h-12 w-12 object-cover rounded"
              alt="Logo"
            />
          </Link>

          {/* Navigation */}
          <ul className="absolute left-1/2 -translate-x-1/2 flex gap-10 font-medium">

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `duration-200 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } hover:text-orange-700`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `duration-200 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } hover:text-orange-700`
                }
              >
                About us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `duration-200 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } hover:text-orange-700`
                }
              >
                Contact us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/github"
                className={({ isActive }) =>
                  `duration-200 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } hover:text-orange-700`
                }
              >
                Github
              </NavLink>
            </li>

          </ul>

          {/* Login / Get Started */}
          <div className="ml-auto flex items-center gap-2">

            <Link
              to="#"
              className="text-gray-800 hover:bg-gray-50 font-medium rounded-lg text-sm px-4 py-2"
            >
              Log in
            </Link>

            <Link
              to="#"
              className="text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-4 py-2"
            >
              Get started
            </Link>

          </div>

        </div>
      </nav>
    </header>
  );
}