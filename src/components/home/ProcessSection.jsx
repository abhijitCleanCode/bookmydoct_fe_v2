"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCalendar, FaSearch } from "react-icons/fa";
import {FaHeartCircleCheck } from 'react-icons/fa6';

export default function Process(){
    const router = useRouter();
    return(
        <section className="relative container mx-auto px-4 py-4 md:py-8 lg:px-8">
            <h2 className="text-4xl font-semibold text-primary mb-8 text-center  ">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="divide-y overflow-hidden rounded-lg bg-white shadow hover:shadow-xl duration-200 hover:-translate-y-2 ease-linear" onClick={()=>{
                router.push("/");
            }}>
                <div className="overflow-hidden">
                    <Image src="/searchDoctor.jpg" height="1000" width="1000" className="h-96 w-full object-cover" alt="thumbnail" />
                </div>
                <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
                    <FaSearch/>
                         Search Doctor
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                        Find the best doctors for your check-up.
                    </p>
                </div>
            </div>
            <div className="divide-y  overflow-hidden rounded-lg bg-white shadow hover:shadow-xl duration-200 hover:-translate-y-2 ease-linear" onClick={()=>{
                router.push('/specializations')
            }}>
                <div className="overflow-hidden">
                    <Image src="/appointment.jpg" height="1000" width="1000" className="h-96 w-full object-cover" alt="thumbnail" />
                </div>
                <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
                    <FaCalendar/>
                        Appointment
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                        Schedule visit to the doctor.
                    </p>
                </div>
            </div>
            <div className="divide-y overflow-hidden rounded-lg bg-white shadow hover:shadow-xl duration-200 hover:-translate-y-2 ease-linear" onClick={()=>{
                router.push("/doctors")
            }}>
                <div className="overflow-hidden">
                    <Image src="/solution.jpg" height="1000" width="1000" className="h-96 w-full object-cover" alt="thumbnail" />
                </div>
                <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
                    <FaHeartCircleCheck/>
                        Get Solution
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                        Get professional medical solution.
                    </p>
                </div>
            </div>
        </div>
        <div className="absolute -z-10 top-72 md:-top-28 -left-20 w-full h-full">
            <div className="absolute top-0 left-0 w-80 h-80 bg-[#69c2f5] opacity-50 rounded-full mix-blend-multiply filter blur-xl  animate-blob"/>
        </div>
        </section>
    )
}