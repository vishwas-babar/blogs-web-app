
import React from 'react';
import { LogoutBtn, Container } from "../index.js";
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function TopNav() {

    const authStatus = useSelector((state) => state.status);


    // in production apps we crate components like that so we dont have to repeat html again and again for each and anytiem when we want to add extra component in future its to easy to add it here
    const navItems = [
        {
            name: "Home",
            path: "/",
            active: true

        },
        {
            name: "Login",
            path: "/login",
            active: true

        },
        {
            name: "signup",
            path: "/signup",
            active: true

        },
        {
            name: "all Posts",
            path: "/all-posts",
            active: true

        },
        {
            name: "add Posts",
            path: "/add-posts",
            active: true

        },
    ]

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a
      href="https://flowbite.com/"
      className="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-8"
        alt="Flowbite Logo"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Flowbite
      </span>
    </a>
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <LogoutBtn />
    </div>
    <div
      className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-sticky"
    >
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        
        {navItems.map(item => item.active ? (
             <li key={item.name}>
          <NavLink
            to={item.path}
            className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
            aria-current="page"
          >
            {item.name}
          </NavLink>
        </li>
        ) : null)} 
      </ul>
    </div>
  </div>
</nav>

  )
}

export default TopNav