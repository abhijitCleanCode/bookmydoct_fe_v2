"use client"

import { useRouter } from "next/navigation"
import DoctorCard from "./DoctorCard"
import { Button } from "../ui/button"
import { useState, useEffect } from "react"
import { userStore } from "@/zustandStore/userStore"
import useAuthStore from "@/zustandStore/authStore"
import LoadingComp from "@/app/loading"

export default function DoctorsSection() {
    const router = useRouter()
    const { availableDoctors, getAvailable3Doctors } = userStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if(availableDoctors.length === 0){
            setIsLoading(true);
            getAvailable3Doctors().then((doctors) => {
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
        }
    }, [getAvailable3Doctors]);

    if(isLoading){
        return (
            <div className="flex justify-center items-center">
                <LoadingComp />
            </div>
        )
    }

    return (
        <section className="w-full px-8 py-8 mx-auto">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 text-primary">Our Doctors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {
                        
                        availableDoctors?.length !== 0 &&
                        availableDoctors?.map((doctor) => (
                            <div key={doctor.id}>
                                <DoctorCard doctor={doctor} />
                            </div>
                        ))
                    }
                </div>
                {
                    availableDoctors?.length === 0 &&
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-lg font-semibold">No doctors available</p>
                    </div>
                }
                {
                    availableDoctors?.length !== 0 &&
                    <div className="flex justify-center">
                        <Button 
                            className="mt-8 max-w-[180px] hover:animate-pulse rounded-lg " 
                            onClick={() => {
                                router.push('/doctors')
                            }}
                            variant="outline"
                        >
                            <span className="text-sm lg:text-[16px] font-medium">View All Doctors</span>
                        </Button>
                    </div>
                }
            </div>
        </section>
    )
}
