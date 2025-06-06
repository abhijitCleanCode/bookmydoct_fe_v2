import { Microscope, Pill, Stethoscope, Video } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { FaMicroscope, FaPills, FaStethoscope, FaVideo } from 'react-icons/fa'
import Link from 'next/link'

const services = [
  {
    icon: FaMicroscope,
    title: "Book Lab Test",
    description: "Get accurate diagnostics with our state-of-the-art lab facilities.",
    action: "Book Now",
    href: "/labTest",
    image: "/booklabtest.jpg"
  },
  {
    icon: FaPills,
    title: "Buy Medicine",
    description: "Order prescribed medications from our certified online pharmacy.",
    action: "Coming Soon",
    href: "/",
    image: "/medicine.jpg"
  },
  {
    icon: FaStethoscope,
    title: "Book Surgery",
    description: "Schedule consultations with expert surgeons for your medical needs.",
    action: "Book Surgery",
    href: "/surgery",
    image: "/surgery.jpg"
  },
  {
    icon: FaVideo,
    title: "Online Video Consultation",
    description: "Get the consultation right from your home thorugh Video Consultation",
    action: "Coming Soon",
    href: "/",
    image: "/videoconsult.jpg"
  }
]

export default function Features() {
  return (
    <div className="container px-10 mx-auto pt-8 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.title}
            className="group relative overflow-hidden rounded-2xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300"
          >
            <div className="absolute inset-0">
              <Image
                src={service.image}
                alt={service.title}
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
            </div>
            
            <div className="relative p-8 h-full flex flex-col justify-end">
              <div className="p-3 rounded-full bg-primary backdrop-blur-sm w-fit mb-4">
                <service.icon 
                  className="w-8 h-8 text-white"
                  strokeWidth={1.5}
                />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                {service.title}
              </h3>
              
              <p className="text-gray-200 mb-6">
                {service.description}
              </p>
              
              <Button
                variant="solid"
                className="max-w-[300px] transition-colors rounded-lg"
                
              >
                <Link href={service.href}>{service.action}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

