"use client"
import React, { useState } from 'react';
import { FaUser, FaPhone, FaCity, FaNotesMedical, FaClipboardCheck, FaPhoneAlt, FaCalendarCheck, FaProcedures } from 'react-icons/fa';
import { GiKidneys, GiStomach, GiEye } from 'react-icons/gi';
import { TbMedicineSyrup } from 'react-icons/tb';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { Eye } from 'lucide-react';
import toast from 'react-hot-toast';

// Surgery types data
const surgeryTypes = [
    { name: "Piles" },
    { name: "Hernia" },
    { name: "Anal Fissure" },
    { name: "Gall Stones" },
    { name: "Circumcision" },
    { name: "Kidney Stone" },
    { name: "Varicose Veins" },
    { name: "Appendicitis" },
    { name: "Lipoma Removal" },
    { name: "Cataract" },
    { name: "Gynecomastia" },
    { name: "Fistula" },
];

const SurgeryIcon = ({ name }) => {
    switch (name) {
        case "Piles":
            return <MdOutlineHealthAndSafety className="text-primary text-2xl" />;
        case "Hernia":
            return <GiStomach className="text-primary text-2xl" />;
        case "Anal Fissure":
            return <MdOutlineHealthAndSafety className="text-primary text-2xl" />;
        case "Gall Stones":
            return <TbMedicineSyrup className="text-primary text-2xl" />;
        case "Circumcision":
            return <MdOutlineHealthAndSafety className="text-primary text-2xl" />;
        case "Kidney Stone":
            return <GiKidneys className="text-primary text-2xl" />;
        case "Varicose Veins":
            return <MdOutlineHealthAndSafety className="text-primary text-2xl" />;
        case "Appendicitis":
            return <GiStomach className="text-primary text-2xl" />;
        case "Lipoma Removal":
            return <MdOutlineHealthAndSafety className="text-primary text-2xl" />;
        case "Cataract":
            return <Eye className="text-primary text-2xl" />;
        case "Gynecomastia":
            return <MdOutlineHealthAndSafety className="text-primary text-2xl" />;
        case "Fistula":
            return <MdOutlineHealthAndSafety className="text-primary text-2xl" />;
        default:
            return null;
    }
};
const BookSurgeryPage = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.target);

        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
        try {

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                toast.success("You will be contacted withing 24 hours");
                event.target.reset();
            } else {
                toast.error("Something went wrong!");
                setResult(data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <section className="w-full py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl font-bold text-center text-primary mb-4">
                        General Surgery Services
                    </h1>
                    <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                        Our skilled surgeons provide a wide range of surgical procedures with the highest standards of care and safety.
                    </p>
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="w-full py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-primary mb-8">
                        Schedule Your Surgery
                    </h2>
                    <p className="text-center text-gray-600 mb-8">
                        Our expert surgeons are ready to assist you. Fill out the form below to book your surgery.
                    </p>
                    <form onSubmit={onSubmit} className="space-y-6 w-full bg-white p-8 shadow-lg rounded-lg">
                        <div className="flex-1 w-full flex flex-col md:flex-row gap-4">
                            <div className="flex flex-1 items-center border border-gray-300 rounded-md p-3">
                                <FaUser className="text-gray-400 mr-2" />
                                <input
                                    id='name'
                                    name='name'
                                    type="text"
                                    placeholder="Name*"
                                    className="outline-none w-full"
                                    required
                                />
                            </div>
                            <div className="flex flex-1 items-center border border-gray-300 rounded-md p-3">
                                <FaPhone className="text-gray-400 mr-2" />
                                <input
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    type="tel"
                                    placeholder="Phone Number*"
                                    className="outline-none w-full"
                                    required
                                />
                            </div>
                            <div className="flex flex-1 items-center border border-gray-300 rounded-md p-3">
                                <FaCity className="text-gray-400 mr-2" />
                                <input
                                    id='city'
                                    name='city'
                                    type="text"
                                    placeholder="City"
                                    className="outline-none w-full"
                                />
                            </div>
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-md p-3">
                            <FaNotesMedical className="text-gray-400 mr-2" />
                            <textarea
                                id='query'
                                name='query'
                                placeholder="Write your query*"
                                className="flex-1 outline-none"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Book Surgery"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Process Section */}
            <section className="w-full py-12 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-primary mb-12">
                        How It Works
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-all">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <FaClipboardCheck className="text-primary text-3xl" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Fill Form</h3>
                            <p className="text-gray-600">Complete the simple booking form with your details and requirements</p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-all">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <FaPhoneAlt className="text-primary text-3xl" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">We'll Contact You</h3>
                            <p className="text-gray-600">Our team will reach out to discuss your needs and answer any questions</p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-all">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <FaCalendarCheck className="text-primary text-3xl" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Surgery Booking</h3>
                            <p className="text-gray-600">We schedule your procedure with the right specialist at a convenient time</p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-all">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <FaProcedures className="text-primary text-3xl" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Get Surgery</h3>
                            <p className="text-gray-600">Receive your procedure with our expert surgeons and comprehensive care</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Surgery Types Section */}
            <section className="w-full py-16 bg-gradient-to-r from-gray-50 to-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-primary mb-6">
                        General Surgeries We Offer
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                        Our team specializes in a wide range of surgical procedures to address various conditions
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {surgeryTypes.map((surgery, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
                                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                                    <SurgeryIcon name={surgery.name} />
                                </div>
                                <h3 className="font-semibold text-gray-800">{surgery.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
};

export default BookSurgeryPage;

