"use client";
import { FloatingDock } from "../ui/floating-dock";
import { FaBone, FaChevronCircleRight, FaEye, FaHeart, FaTeeth, FaTooth } from "react-icons/fa";

const links = [
    {
      title: "Orthopedics",
      icon: (
        <FaBone className="h-full w-full text-neutral-500 " />
      ),
      href: "?specialization=Orthopedics",
    },
 
    {
      title: "Cardiologist",
      icon: (
        <FaHeart className="h-full w-full text-neutral-500 " />
      ),
      href: "?specialization=Cardiologist",
    },
    {
      title: "Dentist",
      icon: (
        <FaTooth className="h-full w-full text-neutral-500 " />
      ),
      href: "?specialization=Dentist",
    },
    {
      title: "View All",
      icon: (
        <FaEye className="h-full w-full text-neutral-500 " />
      ),
      href: "/specializations",
      
    },
    
  ];

export default function SpecializationsSection() {
    return (
        <section className="container mx-auto px-4 py-12 md:py-12 lg:px-8 flex justify-between gap-2 items-center">
           <div> <h2 className="text-primary text-4xl font-semibold mb-2">Our Medical Specialities</h2>
            <p className="text-gray-600 text-lg flex items-center gap-2">Find the right specialist for your health needs <FaChevronCircleRight className="sm:block hidden"/></p> </div>
            <div className="flex items-center justify-center">
      <FloatingDock
        mobileClassName={""}
        items={links}
      />
    </div>
        </section>
    )
}
