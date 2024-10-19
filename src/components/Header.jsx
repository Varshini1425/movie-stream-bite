import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const LogoutButton = () => {
    const [user, loading] = useAuthState(auth);

    const handleLogout = async () => {
      try {
        await signOut(auth);
        toast.success("User logged out successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    if (loading) {
      return <p>Loading....</p>;
    }

    return (
      user && (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 items-center"
          onClick={handleLogout}
        >
          Logout
        </button>
      )
    );
  };

  const activeClass =
    "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 active";
  const inActiveClass =
    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  const navLinkThings = [
    { to: "/", name: "Home" },
    { to: "movies/popular", name: "Popular" },
    { to: "movies/top", name: "Top" },
    { to: "movies/upcoming", name: "Upcoming" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryTerm = e.target.search.value;
    e.target.reset();
    setIsMobileSearchOpen(false);
    return navigate(`/search?q=${queryTerm}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 sm:p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="./movieBiteIcon.svg" className="h-8" alt="MovieBite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MovieBite
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:order-2 items-center">
          <div className="relative mr-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="search-navbar"
                name="search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </form>
          </div>
          <LogoutButton />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex md:space-x-8">
          {navLinkThings.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? activeClass : inActiveClass
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMobileSearch}
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2 me-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu and Search */}
        <div
          className={`${
            isMobileMenuOpen || isMobileSearchOpen ? "flex" : "hidden"
          } w-full md:hidden flex-col mt-3`}
        >
          {isMobileSearchOpen && (
            <form onSubmit={handleSubmit} className="mb-3">
              <input
                type="text"
                id="search-navbar-mobile"
                name="search"
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </form>
          )}
          {isMobileMenuOpen && (
            <>
              <ul className="flex flex-col font-medium">
                {navLinkThings.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        isActive ? activeClass : inActiveClass
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <LogoutButton />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
