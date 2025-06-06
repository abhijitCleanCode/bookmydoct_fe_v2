import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button";

export default function ClinicCard ({clinic}) {
    const router = useRouter();
    return(
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative h-48 w-full">
                <Image
                    src='/clinic.jpg'
                    alt={clinic?.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {clinic?.name}
                </h3>
                
                <div className="flex items-start space-x-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-gray-600 leading-relaxed truncate hover:cursor-pointer" title={clinic?.address}>
                        {clinic?.address?.length > 50 ? `${clinic?.address?.slice(0,46)}...` : clinic?.address}
                    </h3>
                </div>

                <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-3 transition-colors"
                    onClick={() => {
                        router.push(`/doctors?clinicId=${clinic.id}`)
                    }}
                >
                    <span className="font-medium">View Available Doctors</span>
                </Button>
            </div>
        </div>
    )
}