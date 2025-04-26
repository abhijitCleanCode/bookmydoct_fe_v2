'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from '@/components/ui/card'
import useAuthStore from '@/zustandStore/authStore'
import toast from 'react-hot-toast'
import axiosApi from '@/lib/axios'

import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { razorpayModal } from '@/lib/razorpay'

import { useParams, usePathname, useRouter } from 'next/navigation'

import Link from 'next/link'
import { userStore } from '@/zustandStore/userStore'
import LoadingComp from '@/app/loading'
import { Check } from 'lucide-react'
import { FaCalendar, FaClinicMedical, FaInfoCircle, FaStreetView, FaSubscript } from 'react-icons/fa'

export default function AppointmentBookingForm() {
    const { getDoctorById, getSlotDetails, bookAppointment, loading } = userStore();
    const { user } = useAuthStore();
    const [formData, setFormData] = useState({
        clinicId: "",
        fullName: "",
        phoneNumber: "",
        age: "",
        gender: "male",
        healthInsured: false,
        billingAddress: "",
        termsAccepted: false,
        appointmentDate: '',
    })
    const { doctorId } = useParams();

    const [doctorPrice, setdoctorPrice] = useState(0);
    const [selectedClinic, setSelectedClinic] = useState(null)
    const [doctor, setDoctor] = useState(null)
    const [clinics, setClinics] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [platformFees, setPlatformFees] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [inactiveNext, setInactiveNext] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = () => setCurrentStep(prev => prev + 1);
    const handleBack = () => setCurrentStep(prev => prev - 1);

    const fetchDoctor = async (docId) => {
        const res = await getDoctorById(docId);
        setDoctor(res.doctor)
        setPlatformFees(res.platformFee)
    }

    useLayoutEffect(() => {
        if (user?.role === 'clinic') {
            toast.error(`Clinic can't book doctor appointment`);
            router.replace('/')
        } else {
            fetchDoctor(doctorId);
        }
    }, [])

    const router = useRouter();

    const getClinics = async () => {
        try {
            setIsLoading(true);
            const promiseArray = doctor?.clinics.map((clinicId) => {
                return axiosApi.get(`/user/clinic/${clinicId}`)
            })
            const clinics = await Promise.all(promiseArray);
            setClinics(clinics.map(c => c.data.clinicDetails))
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (doctor) {
            getClinics()
        }
    }, [doctor])

    useEffect(() => {
        if (doctor && selectedClinic && selectedSlot && formData?.appointmentDate) {
            getSlotDetails(doctor?._id, selectedClinic?._id, selectedSlot, format(new Date(formData.appointmentDate), 'dd-MM-yyyy')).then((res) => {

                if (res.bookedSlot === res.maxSlots || res.bookedSlot > res.maxSlots) {
                    toast.error(`All slots are booked for this day. Please select another day.`)
                    setAvailableSlots([]);
                    setSelectedSlot(null);
                }
            })
        }
    }, [selectedSlot])


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

    }

    const handleSelectChange = (name, value) => {
        if (name === 'appointmentDate' && value) {

            setFormData(prev => ({ ...prev, [name]: value }))
            const dayOfWeek = value.toString().split(" ")[0].toUpperCase()
            setAvailableSlots([]);
            setSelectedSlot(null);
            doctor.appointmentsSchedule.find(a => a.clinicId === selectedClinic._id).schedule.map((s) => {
                if (s.day === dayOfWeek) {
                    setAvailableSlots((slot) => ([...slot, s]))
                }
            })
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }))

        if (name === 'clinicId') {
            const clinic = clinics.find(c => c._id === value)
            setSelectedClinic(clinic || null)
            setdoctorPrice(doctor?.fees.find(f => f.clinicId === clinic._id)?.fee || 0)
        }
    }

    const handleCheckboxChange = (name, checked) => {
        setFormData(prev => ({ ...prev, [name]: checked }))
    }


    const validateForm = () => {
        if (!formData.fullName) return false;
        if (!formData.phoneNumber) return false;
        if (!formData.age) return false;
        if (!formData.billingAddress) return false;
        if (!formData.termsAccepted) return false;
        return true;
    }

    const handleSubmit = async (e) => {
        if (!user) {
            router.replace('/signin/patient')
            toast.error('Please login to book an appointment')
        }
        e.preventDefault()
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                const appointment = { ...formData, doctorId: doctor._id, appointmentDate: format(new Date(formData.appointmentDate), 'dd-MM-yyyy'), scheduledId: selectedSlot };
                const res = await bookAppointment(appointment);
                const options = {
                    "key": `${res.key_id}`, // Enter the Key ID generated from the Dashboard
                    "currency": "INR",
                    "name": "BookMyDoct",
                    "description": "Book Appointment",
                    "order_id": `${res.order_id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "callback_url": `${process.env.NEXT_PUBLIC_API_URL}/user/payment-success/appointment/redirect`,
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                razorpayModal(options);
                setIsSubmitting(false);

            } catch (err) {
                console.log(err)
                setIsSubmitting(false);
            }
        } else {
            toast.error('Please fill all the fields')
        }
    }


    //function that returns true on the available day of doctor
    const isAvailable = (date) => {
        const day = new Date(date).getDay();
        const days = {
            0: 'SUN',
            1: 'MON',
            2: 'TUE',
            3: 'WED',
            4: 'THU',
            5: 'FRI',
            6: 'SAT'
        }
        return doctor.appointmentsSchedule.find(schedule => schedule.clinicId === selectedClinic._id).schedule.map(schedule => schedule.day).includes(days[day]) && (new Date() < date);
    };


    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen">
            <h1 className="text-center text-4xl mb-8 font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Book Appointment
            </h1>
            <p className="text-center md:text-xl mb-5">
                Schedule an appointment with {doctor?.fullName}.
            </p>

            {/* Enhanced Stepper - Matching Lab Test Design */}
            <div className="mb-12">
                <div className="flex justify-between relative">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex flex-col items-center relative z-10">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                                ${currentStep >= step
                                    ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg'
                                    : 'bg-white border-2 border-gray-200'} 
                                transition-all duration-300 ease-in-out`}>
                                {currentStep > step ? (
                                    <Check className="w-6 h-6" />
                                ) : (
                                    <span className="text-lg font-semibold">
                                        {step === 1 ? <FaClinicMedical /> :
                                            step === 2 ? <FaCalendar /> :
                                                step === 3 ? <FaInfoCircle /> : <FaStreetView />}
                                    </span>
                                )}
                            </div>
                            <div className={`mt-3 text-sm font-medium
                                ${currentStep >= step ? 'text-primary' : 'text-gray-500'}`}>
                                {step === 1 ? 'Select Clinic' :
                                    step === 2 ? 'Schedule' :
                                        step === 3 ? 'Fill Details' : 'Summary'}
                            </div>
                        </div>
                    ))}
                    {/* Progress Bar */}
                    <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200">
                        <div className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${((currentStep - 1) / 3) * 100}%` }} />
                    </div>
                </div>
            </div>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                    {/* Step 1: Clinic Selection */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Your Preferred Clinic</h2>
                            <div>
                                <label htmlFor="clinicId" className="block text-lg font-semibold text-gray-900 mb-2">
                                    Select Your Preferred Clinic
                                </label>
                                <Select onValueChange={(value) => { handleSelectChange("clinicId", value); setInactiveNext(false) }}>
                                    <SelectTrigger id="clinicId" className="h-14 bg-gray-50 border-2 border-gray-200 rounded-lg">
                                        {selectedClinic?.name || "Choose a clinic/hospital"}
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[300px]">
                                        {clinics ? clinics?.map((clinic) => (
                                            <SelectItem key={clinic._id} value={clinic._id}>
                                                <div className="py-2">
                                                    <div className="font-medium text-gray-900">{clinic.name}</div>
                                                    <div className="text-sm text-gray-500">{clinic.address}</div>
                                                </div>
                                            </SelectItem>
                                        )) :
                                            <p className='text-center p-4'>Loading clinics...</p>
                                        }
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedClinic && (
                                <Card className="border-2 border-blue-100 bg-blue-50">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold text-blue-900 mb-3">Selected Location</h3>
                                        <div className="space-y-2">
                                            <p className="text-xl font-medium text-gray-900">{selectedClinic.name}</p>
                                            <p className="text-gray-600">{selectedClinic.address}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}

                    {/* Step 2: Schedule */}
                    {currentStep === 2 && selectedClinic && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Choose Your Schedule</h2>
                            <div className="flex flex-col gap-5">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
                                    <Calendar
                                        mode="single"
                                        selected={formData.appointmentDate}
                                        onSelect={(date) => handleSelectChange("appointmentDate", date)}
                                        className="rounded-xl border-2  p-4 bg-white shadow-sm w-full flex justify-center"
                                        disabled={(date) => !isAvailable(date)}
                                    />
                                </div>

                                <div>
                                    {formData.appointmentDate && availableSlots.length > 0 && (
                                        <div className='w-full'>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots</h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                {availableSlots.map((s) => (
                                                    <button
                                                        key={s._id}
                                                        onClick={() => setSelectedSlot(s._id)}
                                                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${selectedSlot === s._id
                                                            ? 'bg-primary text-white border-primary'
                                                            : 'border-gray-200 hover:border-blue-400'
                                                            }`}
                                                    >
                                                        <span className="block text-center">
                                                            {s.startTime} - {s.endTime}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Patient Details */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Personal Details</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        className="h-12 bg-gray-50 border-2 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="+1234567890"
                                        className="h-12 bg-gray-50 border-2 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                                    <Input
                                        id="age"
                                        name="age"
                                        type="number"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        className="h-12 bg-gray-50 border-2 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                    <Select onValueChange={(value) => handleSelectChange("gender", value)} defaultValue={formData.gender}>
                                        <SelectTrigger id="gender" className="h-12 bg-gray-50 border-2 rounded-lg">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
                                <Input
                                    id="billingAddress"
                                    name="billingAddress"
                                    value={formData.billingAddress}
                                    onChange={handleInputChange}
                                    className="h-12 bg-gray-50 border-2 rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Summary */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Booking Summary</h2>
                            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                                <h3 className="font-medium text-gray-700 mb-2">Appointment Details</h3>
                                <div className="space-y-2">
                                    <p><span className="text-gray-600">Clinic:</span> {selectedClinic?.name}</p>
                                    <p><span className="text-gray-600">Doctor:</span> {doctor?.fullName}</p>
                                    <p><span className="text-gray-600">Date:</span> {formData.appointmentDate ? format(new Date(formData.appointmentDate), 'dd MMMM yyyy') : ''}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="healthInsured"
                                        checked={formData.healthInsured}
                                        onCheckedChange={(checked) => handleCheckboxChange("healthInsured", checked)}
                                        className="h-5 w-5"
                                    />
                                    <div>
                                        <label htmlFor="healthInsured" className="text-sm font-medium text-gray-900">Health Insurance Coverage</label>
                                        <p className="text-sm text-gray-500">I confirm that I have active health insurance</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onCheckedChange={(checked) => handleCheckboxChange("termsAccepted", checked)}
                                        className="h-5 w-5"
                                    />
                                    <div>
                                        <label htmlFor="termsAccepted" className="text-sm font-medium text-gray-900">Terms & Conditions</label>
                                        <p className="text-sm text-gray-500">
                                            I agree to the <Link href='/termsAndConditions' className='text-blue-600 hover:underline'>Terms and Conditions</Link> and <Link href='/refundPolicy' className='text-blue-600 hover:underline'>Refund Policy</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Doctor Consultation Fee:</span>
                                    <span className="text-lg font-semibold">{doctorPrice ? `₹${doctorPrice}` : "TBD"}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">* Consultation fee is payable at the clinic</p>
                                <div className="flex justify-between items-center pt-4 border-t border-blue-200">
                                    <span className="text-gray-900 font-medium">Platform Fee:</span>
                                    <span className="text-xl font-bold text-blue-600">₹{platformFees || "0"}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        {currentStep > 1 && (
                            <Button onClick={handleBack} variant="outline"
                                className="px-6 py-2 text-base">
                                Previous
                            </Button>
                        )}
                        {currentStep < 4 ? (
                            <Button onClick={handleNext}
                                className="ml-auto px-6 py-2 text-base bg-gradient-to-r from-primary to-blue-600"
                                disabled={inactiveNext}>
                                Next
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={!formData.termsAccepted || isSubmitting}
                                className="ml-auto px-6 py-2 text-base bg-gradient-to-r from-primary to-blue-600"
                            >
                                {isSubmitting ? "Processing..." : "Proceed to Payment"}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}