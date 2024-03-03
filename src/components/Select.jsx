import { ID } from 'appwrite'
import React from 'react'

function Select({
    label,
    options,
    className="",
    ID,
    ...props
}, ref) { // pass your reference
  return (
    <div>
        <label htmlFor={ID}>{label}</label>
        <select id={ID}
            ref={ref}
            className={ ` ${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            {...props}
        >
            {options?.map(option => (
                <option key={option.value} value={option.value} >{option.name}</option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select) // this is also a one syntax for forwording a references