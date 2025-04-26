"use client";
import DoctorsSection from "@/components/home/DoctorsSection";
import Features from "@/components/home/Features";
import { Hero } from "@/components/home/HeroSection";
import Process from "@/components/home/ProcessSection";
import SpecializationsSection from "@/components/home/SpecializationsSection";
import LoadingComp from "../loading";
import { useEffect, useState } from "react";
import AppSection from "@/components/home/AppSection";
import { useSearchParams } from "next/navigation";
import { userStore } from "@/zustandStore/userStore";
import DoctorCard from "@/components/home/DoctorCard";
import ClinicCard from "@/components/home/ClinicCard";
import StatsSection from "@/components/home/StatsSection";

const Home = () => {

    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    return (
        <main>
            <div className={`transition-opacity duration-200`}>
                <Hero setIsSearching={setIsSearching} setSearchResults={setSearchResults} setIsLoading={setIsLoading} />
                {isSearching ? (isLoading ? (
                    <LoadingComp />
                ) :
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        {searchResults.length === 0 && <p className="text-center text-sm md:text-xl">No Doctor or Clinic/Hospital found</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {searchResults.map((rs) => (
                                <div key={rs.id}>
                                    {rs.role === 'doctor' && <DoctorCard doctor={rs} />}
                                    {rs.role === 'clinic' && <ClinicCard clinic={rs} />}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : <>
                    <Process />
                    <SpecializationsSection />
                    <Features />
                    <StatsSection />
                    <DoctorsSection />
                    <AppSection />
                </>}
            </div>
        </main>
    );
};

export default Home;