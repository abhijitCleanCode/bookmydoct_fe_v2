'use client'

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { userStore } from "@/zustandStore/userStore"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import useAuthStore from "@/zustandStore/authStore"
import { razorpayModal } from "@/lib/razorpay"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Hospital, X } from "lucide-react";
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


export default function Component() {
    const router = useRouter();
    const [isloading, setIsloading] = useState(false);

    const [labTestAppointment, setLabTestAppointment] = useState({
        fullName: "",
        phoneNumber: "",
        age: "",
        gender: "male",
        address: "",
        termsAccepted: false,
    });
    const [clinics, setClinics] = useState([]);
    const [labTests, setLabTests] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedTests, setSelectedTests] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentStep, setCurrentStep] = useState(1);
    const [inactiveNext, setInactiveNext] = useState(false);


    const { getLabClinics, getLabtestsByClinic, bookLabAppointment } = userStore();
    const { user } = useAuthStore();


    const handleNext = () => setCurrentStep(prev => prev + 1);
    const handleBack = () => setCurrentStep(prev => prev - 1);



    const toggleTest = (test) => {
        setSelectedTests(prev => {
            const exist = prev.find((t) => t._id == test._id);
            if (exist) {
                setTotalPrice(totalPrice - test.price);
                return prev.filter((t) => t._id != test._id);
            } else {
                setTotalPrice(totalPrice + test.price);
                return [...prev, test];

            }
        }
        );
    };

    const handleInputChange = (e) => {
        setLabTestAppointment({
            ...labTestAppointment,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        getLabClinics().then((res) => {
            setClinics(res)
        })
    }, [])

    const handleClinicChange = async (id) => {
        setSelectedClinic(id);
        const res = await getLabtestsByClinic(id);
        setLabTests(res)
        setSelectedTests([]);
        setTotalPrice(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedLabTestsIds = selectedTests.map((test) => test._id);
        const appointment = { ...labTestAppointment, labTestIds: selectedLabTestsIds, clinicId: selectedClinic, appointmentDate: format(new Date(), 'dd-MM-yyyy') };

        if (!user) {
            router.replace('/signin/patient')
            toast.error('Please login to book an appointment')
        }
        setIsloading(true);
        try {
            const res = await bookLabAppointment(appointment);
            const options = {
                "key": `${res.key_id}`, // Enter the Key ID generated from the Dashboard
                "currency": "INR",
                "name": "BookMyDoct",
                "description": "Book Lab Test",
                "order_id": `${res.order_id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": `${process.env.NEXT_PUBLIC_API_URL}/user/payment-success/labtest/redirect`,
                "theme": {
                    "color": "#3399cc"
                }
            };
            razorpayModal(options);
            setIsloading(false);
        } catch (err) {
            console.log(err)
            setIsloading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen">
            <h1 className="text-center text-4xl mb-8 font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Book Lab Test</h1>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full transition-all duration-300"
                                style={{ width: `${(currentStep / 4) * 100}%` }}
                            ></div>
                        </div>

                        <div className="flex justify-between mt-2 text-sm">
                            <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                                <span className="font-medium">Lab</span>
                            </div>
                            <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                                <span className="font-medium">Tests</span>
                            </div>
                            <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                                <span className="font-medium">Details</span>
                            </div>
                            <div className={`flex flex-col items-center ${currentStep >= 4 ? 'text-primary' : 'text-gray-400'}`}>
                                <span className="font-medium">Review</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6">
                        {/* Step 1: Select Lab */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Diagnostic Lab</h2>
                                <Select onValueChange={(value) => handleClinicChange(value)}>
                                    <SelectTrigger className="w-full p-4 text-lg">
                                        <SelectValue placeholder="Choose a diagnostic lab" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[300px]">
                                        {clinics?.map((clinic) => (
                                            <SelectItem key={clinic._id} value={clinic._id}
                                                className="p-3 hover:bg-blue-50">
                                                {clinic.name}
                                            </SelectItem>
                                        ))}
                                        {clinics?.length === 0 &&
                                            <p className="p-4 text-gray-500 text-center">No clinics available</p>
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Step 2: Select Tests */}
                        {currentStep === 2 && (
                            <div className="space-y-6 ">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Lab Tests</h2>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger className="w-full" >
                                        <div
                                            className="p-4 text-left justify-between flex items-center border text-lg hover:border-primary">
                                            {selectedTests?.length !== 0
                                                ? selectedTests.reduce((acc, test) => acc + test.name + ", ", "")
                                                : "Select tests to proceed..."}
                                            <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandGroup className="max-h-[400px] overflow-auto">
                                                {labTests?.map((test) => (
                                                    <CommandList
                                                        key={test._id}
                                                        onClick={() => toggleTest(test)}
                                                        className="flex items-center justify-between p-3 hover:bg-blue-50 cursor-pointer"
                                                    >
                                                        <div className="flex items-center">
                                                            <Check className={`mr-3 h-5 w-5 text-primary
                                                                ${selectedTests?.includes(test) ? "opacity-100" : "opacity-0"}`} />
                                                            <span className="font-medium">{test.name}</span>
                                                            <span className="ml-4 text-primary">₹{test.price}</span>
                                                        </div>
                                                    </CommandList>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <div className="text-xl font-semibold text-primary p-4 bg-blue-50 rounded-lg">
                                    Total Amount: ₹{totalPrice}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Fill Details */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Personal Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName" className="text-base">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            value={labTestAppointment.fullName}
                                            name="fullName"
                                            onChange={handleInputChange}
                                            className="p-3"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-base">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            name="phoneNumber"
                                            value={labTestAppointment.phoneNumber}
                                            onChange={handleInputChange}
                                            className="p-3"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="age" className="text-base">Age</Label>
                                        <Input
                                            id="age"
                                            type="number"
                                            name="age"
                                            value={labTestAppointment.age}
                                            onChange={handleInputChange}
                                            className="p-3"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="gender" className="text-base">Gender</Label>
                                        <Select
                                            onValueChange={(Value) => {
                                                handleInputChange({
                                                    target: {
                                                        name: "gender",
                                                        value: Value
                                                    }
                                                })
                                            }}
                                            defaultValue={labTestAppointment.gender}
                                        >
                                            <SelectTrigger className="p-3">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="address" className="text-base">Address</Label>
                                        <Input
                                            name="address"
                                            id="address"
                                            value={labTestAppointment.address}
                                            onChange={handleInputChange}
                                            className="p-3"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Summary */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Booking Summary</h2>
                                <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b">
                                        <span className="font-semibold">Selected Lab</span>
                                        <span className="text-primary">{clinics?.find(c => c._id === selectedClinic)?.name}</span>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="font-semibold">Selected Tests:</p>
                                        <div className="bg-white rounded-lg p-4">
                                            {selectedTests.map(test => (
                                                <div key={test._id} className="flex justify-between py-2">
                                                    <span>{test.name}</span>
                                                    <span className="text-primary">₹{test.price}</span>
                                                </div>
                                            ))}
                                            <div className="border-t mt-2 pt-2 font-semibold flex justify-between">
                                                <span>Total Amount</span>
                                                <span className="text-primary">₹{totalPrice}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg p-4 mt-4 space-y-2">
                                        <h3 className="font-semibold mb-3">Patient Details</h3>
                                        <p><span className="text-gray-600">Name:</span> {labTestAppointment.fullName}</p>
                                        <p><span className="text-gray-600">Phone:</span> {labTestAppointment.phoneNumber}</p>
                                        <p><span className="text-gray-600">Age:</span> {labTestAppointment.age}</p>
                                        <p><span className="text-gray-600">Gender:</span> {labTestAppointment.gender}</p>
                                        <p><span className="text-gray-600">Address:</span> {labTestAppointment.address}</p>
                                    </div>

                                    <div className="flex items-center space-x-2 mt-6">
                                        <Checkbox
                                            id="terms"
                                            checked={labTestAppointment.termsAccepted}
                                            onCheckedChange={(checked) =>
                                                handleInputChange({
                                                    target: {
                                                        name: "termsAccepted",
                                                        value: checked
                                                    }
                                                })}
                                        />
                                        <label htmlFor="terms" className="text-sm">
                                            I agree to the <Link href="/terms" className="text-primary hover:underline">Terms and Conditions</Link> and
                                            <Link href="/refund" className="text-primary hover:underline"> Refund Policy</Link>
                                        </label>
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
                                    className="ml-auto px-6 py-2 text-base bg-gradient-to-r from-primary to-blue-600">
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!labTestAppointment.termsAccepted || isloading}
                                    className="ml-auto px-6 py-2 text-base bg-gradient-to-r from-primary to-blue-600"
                                >
                                    {isloading ? "Processing..." : "Proceed to Payment"}
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}