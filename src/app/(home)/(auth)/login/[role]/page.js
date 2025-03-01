'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import useAuthStore from '@/zustandStore/authStore';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { EyeClosed, EyeIcon, EyeOffIcon } from 'lucide-react';

export default function Login() {
    const { role } = useParams();
    const router = useRouter();
    const { user } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading } = useAuthStore();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }
        console.log(role);

        try {
            await login({ email: formData.email, password: formData.password }, role);

            if (role === 'clinic') {
                router.push('/clinicAdmin/settings');
            } else if (role === 'admin') {
                router.push('/admin');
            } else if (role === 'user') {
                router.replace('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex min-h-full lg:mb-10 flex-1 items-center ">
                <div className="flex flex-1 w-[60%] flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>

                            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                            <p className="mt-2 text-sm/6 text-gray-500">
                                Don&apos;t have an account ?{' '}
                                <Link href={`/register/${role}`} className="font-semibold text-primary hover:underline">
                                    Register
                                </Link>
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form action="#" method="POST" onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                placeholder='Your email address'
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className='w-full relative'>
                                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2 flex justify-between items-center gap-2">
                                            <input
                                                id="password"
                                                name="password"
                                                placeholder='Your password'
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                autoComplete="current-password"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                            />
                                            <button
                                                type='button'
                                                onClick={() => setShowPassword(!showPassword)}
                                                className=' text-gray-500 hover:text-gray-700'
                                            >
                                                {showPassword ? (
                                                    <EyeClosed className='h-4 w-4' />
                                                ) : (
                                                    <EyeIcon className='h-4 w-4' />
                                                )}
                                            </button>
                                        </div>

                                    </div>

                                    <div className="flex items-center justify-end">

                                        <div className="text-sm/6">
                                            <Link href="/forgetPassword" className="font-semibold text-primary hover:underline">
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-primary hover:opacity-80  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Processing..' : 'Sign in'}
                                        </button>
                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>

                </div>
                <div className="hidden w-[40%] flex-1  lg:flex">
                    <Image
                        alt=""
                        src="/login.svg"
                        height={400}
                        width={400}
                        className="object-cover"
                    />
                </div>
            </div>
        </>
    );
}
