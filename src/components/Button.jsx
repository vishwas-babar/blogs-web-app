import React from 'react'

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-700",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (

    <button
      type={type}
      className={`w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className} ${bgColor} ${textColor}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button