import React, { useState } from 'react'
import { Button, Select, Input } from "./index.js"
import { useNavigate, Link } from 'react-router-dom';
import authService from '../appwrite/auth.js';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice.js';
import { useForm } from 'react-hook-form'; // this is for form handling

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();

    const [error, setError] = useState('');



    const login = async (data) => {
        setError('') // clean the error
        try {
            const session = await authService.loginAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(loginUser(data))
                navigate("/") // navigate user if login is successful
            }
        } catch (error) {
            setError(error.message)
            console.log("error when user trying to login");
        }
    }

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit(login)} >
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                    Sign in to our platform
                </h5>
                <div>
                    <Input
                        type="email"
                        name="email"
                        label="Email:"
                        placeholder="johndoe54@gmail.com"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "invalid email address"
                            }
                        })}
                    />
                </div>
                <div>
                    <Input
                        type="password"
                        name="password"
                        label="password:"
                        placeholder="enter your password"
                        {...register("password", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) || "add strong password"
                            }
                        })}
                    />
                </div>
                <div className="flex items-start">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                defaultValue=""
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                required=""
                            />
                        </div>
                        <label
                            htmlFor="remember"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Remember me
                        </label>
                    </div>
                    {error && <span>{error}</span>}
                    <a
                        href="#"
                        className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                    >
                        Lost Password?
                    </a>
                </div>

                <Button
                    type='submit'
                    children={"Login to your account"}
                />
                
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{" "}
                    <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
                        Create account
                    </a>
                </div>
            </form>
        </div>

    )
}

export default Login;