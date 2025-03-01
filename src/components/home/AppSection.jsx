import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default function AppSection () {
    return (
        <section className="w-full  py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center md:text-left">
                            BookMyDoct App coming soon
                        </h1>
                        <div className="space-y-4 text-lg text-gray-600">
                            <p className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                Book Doctor Appointments Instantly
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                Schedule Lab Tests from Home
                            </p>
                        </div>
                        <div className="mt-8 text-center md:text-left">
                            <Link href="/">
                                <Button className="px-8 py-3">Contact us</Button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative w-[300px] ">
                            <Image
                                src="/mobile.png"
                                width={280}
                                height={560}
                                alt="BookMyDoct Mobile App"
                                className=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}