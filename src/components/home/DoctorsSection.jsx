"use client";

import { useRouter } from "next/navigation";
import DoctorCard from "./DoctorCard";
import { Button } from "../ui/Button";
import { useState, useEffect } from "react";
import { userStore } from "@/zustandStore/userStore";
import useAuthStore from "@/zustandStore/authStore";

export default function DoctorsSection({ setIsLoading }) {
  const router = useRouter();
  const [avbDoctors, setAvbDoctors] = useState([]);
  const { search } = userStore();

  useEffect(() => {
    let mounted = true;

    const loadDoctors = async () => {
      try {
        setIsLoading(true);
        const data = await search("", "doctor", "");
        if (mounted) {
          const availableDoctors = data?.data?.slice(0, 3).map((doctor) => ({
            id: doctor._id,
            name: doctor?.fullName,
            specialization: doctor?.specialization,
            image: "/doctor.png",
            description: `${doctor?.fullName} has ${
              doctor?.experience ? doctor.experience : "significant"
            } years of experience as ${doctor.specialization}`,
            qualification: doctor?.medicalDegree,
            experience: doctor?.experience || 0,
          }));
          setAvbDoctors(availableDoctors);
        }
      } catch (error) {
        console.error("Error loading doctors:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadDoctors();

    return () => {
      mounted = false;
    };
  }, [search, setIsLoading]);

  return (
    <section className="w-full py-8 mx-auto">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Our Doctors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {avbDoctors?.length !== 0 &&
            avbDoctors?.map((doctor) => (
              <div key={doctor.id}>
                <DoctorCard doctor={doctor} />
              </div>
            ))}
        </div>
        {avbDoctors?.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-semibold">No doctors available</p>
          </div>
        )}
        {avbDoctors?.length !== 0 && (
          <div className="flex justify-center">
            <Button
              className="mt-8 max-w-[180px] hover:animate-pulse rounded-lg "
              onClick={() => {
                router.push("/doctors");
              }}
              variant="outline"
            >
              <span className="text-sm lg:text-[16px] font-medium">
                View All Doctors
              </span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
