import React from 'react'
import { NavLink } from 'react-router-dom'

function SideNav({ options, sideNavView, closeSideNav }) {
    return (
        <div className={`fixed z-50 w-2/3 sm:w-1/2 top-0 right-0 bottom-0 bg-slate-800 transition-all duration-500 ease-linear ${sideNavView}`}>
            <div className='logodiv w-full flex justify-between ml-5 mt-5'>
                <a
                    href="#"
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

                <div onClick={closeSideNav} className=' size-10 rounded-full mr-8 transition-all duration-300 active:scale-90 hover:scale-105 shadow-md shadow-slate-200 flex items-center justify-center'>
                    <i className='bx bxs-right-arrow  text-white'></i>
                </div>

            </div>


            <div className='mt-5 flex flex-col gap-2 w-full'>
                {options.map(item => item.active ? (
                    <a key={item.name}>
                        <NavLink
                            to={item.path}
                            onClick={closeSideNav}
                            className={({ isActive }) => `pl-5 text-white hover:scale-105  transition-all duration-300 ease-linear  py-2 flex items-center ${isActive ? "border border-white border-spacing-1" : ""}`} aria-current="page"
                        >
                            {item.name}
                        </NavLink>
                    </a>
                ) : null)}

            </div>
        </div>
    )
}

export default SideNav