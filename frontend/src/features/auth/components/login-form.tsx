import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { LoginCredentials } from '../../../types/authTypes';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface LoginFormProps {
    login: (payload: LoginCredentials) => void;
    error?: SerializedError | FetchBaseQueryError;
    onSignup: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ login, error, onSignup }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<LoginCredentials>({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(formData);
    }

    const getErrorMessage = (): string | null => {
        if (error && 'status' in error) {
            if (error.status === 400 && typeof error.data === 'object') {
                return 'Missing email or password';
            } else if (error.status === 401 && typeof error.data === 'object') {
                return 'Incorrect Password';
            }
            return `Error: ${error.status}`;
        } else if (error && 'message' in error) {
            return error.message || 'Unknown error occurred';
        }
        return null;
    }

    const errMsg = getErrorMessage();

    return (
        <div className='flex justify-center items-center'>
            <form
                className='flex flex-col gap-y-4 p-4 bg-gray-200 rounded-lg px-4 py-6'
                onSubmit={handleSubmit}
            >
                {errMsg && (
                    <div
                        role='alert'
                        className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'
                    >
                        <strong>Error: </strong>
                        <span>{errMsg}</span>
                    </div>
                )}
                <input
                    type='email'
                    id='email'
                    value={formData.email}
                    placeholder='Email'
                    autoComplete='false'
                    required
                    className='border border-gray-300 text-gray-900 focus:placeholder-gray-300 rounded-lg block w-80 p-3'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                />
                <div className='relative'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        value={formData.password}
                        placeholder='Password'
                        required
                        className='border border-gray-300 text-gray-900 focus:placeholder-gray-300 rounded-lg block w-80 p-3'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                        type='button'
                        className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 hover:text-gray-900'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </button>
                </div>
                <button
                    type='submit'
                    className='bg-pacific-blue hover:bg-turquoise-blue text-white font-bold py-2 px-4 rounded'
                >
                    Log In
                </button>
                <hr className='h-px bg-gray-300 border-0'/>
                <button
                    type='button'
                    className='bg-pacific-blue hover:bg-turquoise-blue text-white font-bold py-2 px-4 rounded'
                    onClick={onSignup}
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}