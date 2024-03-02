import React, { useId } from 'react'

const Input = React.forwardRef(({
    type,
    name = "",
    label,
    className = "",
    ...props

}, ref) => {
    const Id = useId();

    return (
        <>

            <div>

                {label && <label
                    htmlFor={Id}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {label}
                </label>}
                <input
                    type={type}
                    name={name}
                    id={Id}
                    className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${className}`}
                    required=""
                    ref={ref}
                    {...props}
                />
            </div>

        </>
    )
})

export default Input