import Image from "next/image";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative py-24 bg-[url('/aboutUsHero.jpg')] bg-cover bg-center bg-opacity-30">
                <div className="container mx-auto px-4">
                    <div className=" text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Connecting Compassion</h1>
                        <p className="text-xl md:text-2xl ">Bringing healthcare professionals and patients closer.</p>
                    </div>

                </div>
            </div>

            {/* About Section */}
            <div className="text-center my-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">About us</h2>
                <p className="text-lg text-gray-600">
                    At BookMyDoct, we prioritize compassionate and personalized healthcare, ensuring every patient receives the utmost care and attention.
                </p>
            </div>
            <div className="container mx-auto px-4 pb-10 flex gap-6">
                <div className="max-w-4xl mx-auto">


                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-4">Innovation</h3>
                            <p className="text-gray-600">
                                Our clinic/hospital revolutionizes healthcare by integrating cutting-edge technology with a patient-first approach, making advanced treatments accessible to all.
                            </p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-4">Customer-Centric</h3>
                            <p className="text-gray-600">
                                We are dedicated to building lasting relationships with our patients, providing continuous support and care throughout their healthcare journey.
                            </p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-4">Expertise</h3>
                            <p className="text-gray-600">
                                Our team comprises seasoned professionals with decades of experience, committed to delivering exceptional healthcare services.
                            </p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-4">Integrity</h3>
                            <p className="text-gray-600">
                                Transparency and honesty are the cornerstones of our practice, ensuring open communication and trust with our patients at every step.
                            </p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-16">
                        <button className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
                            Get Started
                        </button>
                    </div>
                </div>
                <Image
                    src="/aboutUs.svg"
                    alt="Hero Image"
                    width={500}
                    height={300}
                    className="mx-auto lg:block hidden"
                />
            </div>
        </div>
    )
}