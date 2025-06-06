import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { FaGooglePlay, FaApple, FaMobile } from "react-icons/fa";

export default function AppSection() {
    return (
        <section className="w-full py-24 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center md:text-left">
                            BookMyDoct Mobile App Coming Soon
                        </h1>
                        <p className="text-gray-600 mb-8 text-center md:text-left max-w-lg">
                            Experience healthcare at your fingertips. Our mobile app makes managing your health easier than ever.
                        </p>
                        
                        <div className="space-y-5 text-lg text-gray-700 mb-8">
                            <p className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="text-green-600 text-sm">✓</span>
                                </span>
                                Book Doctor Appointments Instantly
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="text-green-600 text-sm">✓</span>
                                </span>
                                Schedule Lab Tests from Home
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="text-green-600 text-sm">✓</span>
                                </span>
                                Access Medical Records Anytime
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="text-green-600 text-sm">✓</span>
                                </span>
                                Get Medication Reminders
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                                <FaApple className="text-xl" />
                                <div className="text-left">
                                    <div className="text-xs">Download on the</div>
                                    <div className="text-sm font-semibold">App Store</div>
                                </div>
                            </button>
                            
                            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                                <FaGooglePlay className="text-xl" />
                                <div className="text-left">
                                    <div className="text-xs">GET IT ON</div>
                                    <div className="text-sm font-semibold">Google Play</div>
                                </div>
                            </button>
                        </div>
                        
                        <div className="mt-8 text-center md:text-left">
                            <Link href="/">
                                <Button className="px-8 py-3">Get Notified on Launch</Button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative w-[300px] ">
                            {/* <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 transform -translate-y-1/4"></div> */}
                            <Image
                                src="/mobile.png"
                                width={500}
                                height={900}
                                alt="BookMyDoct Mobile App"
                                className="transform scale-125"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}