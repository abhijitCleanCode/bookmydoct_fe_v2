"use client";
import { TestTube2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import { FaGear, FaUserDoctor } from "react-icons/fa6"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }) {
    const path = usePathname();

    const [navigation, setNavigation] = useState([
        { name: 'Doctors', href: '/clinicAdmin/doctors', icon: FaUserDoctor, current: false },
        { name: 'Settings', href: '/clinicAdmin/settings', icon: FaGear, current: false },
        { name: 'Appointments', href: '/clinicAdmin/appointments', icon: FaCalendarAlt, current: false },
        { name: 'Tests', href: '/clinicAdmin/tests', icon: TestTube2, current: false },
        { name: 'Booked Test', href: '/clinicAdmin/bookedTest', icon: FaEye, current: false },
    ]);

    useEffect(() => {
        const nav = navigation.map((item) => {
            return {
                ...item,
                current: item.href === path
            }
        });
        setNavigation(nav);
    }, [path])

    return (
        <>
            <Toaster />
            <div className="flex w-full min-h-screen">
                <div className="flex w-1/4 flex-col gap-y-5 overflow-y-auto bg-primary/20 px-6">
                    <div className="flex justify-between shrink-0 pt-5  items-center">

                        <Link className='flex items-center max-md:justify-center' href='/'>
                            <Image
                                src={'/logo.svg'}
                                width={100}
                                height={40}
                                alt='logo'
                                priority
                                className='w-auto h-[55px]'
                            />
                        </Link>

                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-primary text-white'
                                                        : ' hover:bg-primary/30 hover:text-white',
                                                    'group flex items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                )}
                                            >
                                                <item.icon
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        item.current ? 'text-white' : '',
                                                        'size-4 shrink-0',
                                                    )}
                                                />
                                                <p className="hidden md:block">{item.name}</p>

                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>

                {children}

            </div>
        </>
    )
}
