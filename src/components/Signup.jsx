import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Button, Input } from './index.js';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth.js';
import { loginUser } from '../store/userSlice.js';
import { useForm } from 'react-hook-form';

function Signup() {

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const signup = async (data) => {

        try {
            const response = await authService.createAccount(data)

            if (response) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(loginUser(userData))
                navigate("/");
            }
        } catch (error) {
            console.log("error when trying to signup user : ", error);
            setError(error.message);
        }
    }

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit(signup)} >
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                    Sign up to our platform
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
                    
                </div>

                <Button
                    type='submit'
                    children={"Create a account"}
                />

                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    already registered?{" "}
                    <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
                        Login account
                    </a>
                </div>
            </form>
        </div>
    )
}

export default Signup