'use client';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { EyeClosed, EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import useAuthStore from '@/zustandStore/authStore';
import { useRouter } from 'next/navigation';

export default function PatientSignUp() {
    const { signup, isLoading } = useAuthStore();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const userdata = {
            fullName: formData.name,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            address: formData.address,
            password: formData.password,
        };

        try {
            await signup(userdata, 'user');

            router.replace('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-row-reverse lg:mb-10 flex-1 items-center ">
                <div className="flex flex-1 w-[60%] flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-10 xl:px-10">
                    <div className="w-full mx-auto max-w-lg">
                        <div>

                            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Register your account</h2>
                            <p className="mt-2 text-sm/6 text-gray-500">
                                Already have an account ?{' '}
                                <Link href={`/login/user`} className="font-semibold text-primary hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form action="#" method="POST" onSubmit={handleSubmit} className="space-y-6">
                                    <div className='space-y-2'>
                                        <Label htmlFor='name'>Full Name</Label>
                                        <input
                                            id='name'
                                            name='name'
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                            placeholder='Your Full Name'
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='email'>Email</Label>
                                        <input
                                            id='email'
                                            name='email'
                                            type='email'
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                            placeholder='Your Email Address'
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='phoneNumber'>Phone Number</Label>
                                        <input
                                            id='phoneNumber'
                                            name='phoneNumber'
                                            type='tel'
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                            placeholder='+912545454545'
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='address'>Address</Label>
                                        <input
                                            id='address'
                                            name='address'
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                            placeholder='Your Address'
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='password'>Password</Label>
                                        <div className='relative'>
                                            <input
                                                id='password'
                                                name='password'
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                                placeholder='Enter at least 8+ characters'
                                            />
                                            <button
                                                type='button'
                                                onClick={togglePassword}
                                                className='absolute right-3 top-1/2 -translate-y-1/2'
                                            >
                                                {showPassword ? (
                                                    <EyeClosed className='h-5 w-5 text-gray-500' />
                                                ) : (
                                                    <EyeIcon className='h-5 w-5 text-gray-500' />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='confirmPassword'>Confirm Password</Label>
                                        <div className='relative'>
                                            <input
                                                id='confirmPassword'
                                                name='confirmPassword'
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                required
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                                placeholder='Confirm your password'
                                            />
                                            <button
                                                type='button'
                                                onClick={toggleConfirmPassword}
                                                className='absolute right-3 top-1/2 -translate-y-1/2'
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeClosed className='h-5 w-5 text-gray-500' />
                                                ) : (
                                                    <EyeIcon className='h-5 w-5 text-gray-500' />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-primary hover:opacity-80  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Processing..' : 'Register'}
                                    </button>
                                </form>
                            </div>


                        </div>
                    </div>

                </div>
                <div className="hidden w-[40%] flex-1 justify-end items-center  lg:flex">
                    <Image
                        alt=""
                        src="/register.svg"
                        height={1000}
                        width={400}
                        className="object-cover h-[400px]"
                    />
                </div>
            </div>
        </>
    );
}
