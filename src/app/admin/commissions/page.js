"use client"

import { useEffect, useLayoutEffect, useState } from "react"

import toast from "react-hot-toast"
import useAdminStore from "@/zustandStore/adminStore"

export default function CommissionsPage() {
    const { bookingCommissionStore, labTestCommissionPercentageStore, platFormFeeStore, setConstants, fetchLatesConstants } = useAdminStore();
    const [BookingCommission, setBookingCommission] = useState("")
    const [labCommision, setLabCommision] = useState("")
    const [errors, setErrors] = useState({ clinic: "", admin: "", platform: "" })
    const [platFormFee, setPlatFormFee] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    useLayoutEffect(() => {
        fetchLatesConstants();
    }, [])

    useEffect(() => {
        if (bookingCommissionStore) {
            setBookingCommission(bookingCommissionStore);
        }
        if (labTestCommissionPercentageStore) {
            setLabCommision(labTestCommissionPercentageStore);
        }
        if (platFormFeeStore) {
            setPlatFormFee(platFormFeeStore);
        }
    }, [bookingCommissionStore, labTestCommissionPercentageStore, platFormFeeStore])

    const validateCommission = (value) => {
        const num = parseFloat(value)
        return !isNaN(num) && num >= 0 && num <= 100
    }

    const validatePlatformFees = (value) => {
        const num = parseInt(value)
        return !isNaN(num) && num > 0
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = {
            clinic: validateCommission(BookingCommission) ? "" : "Invalid percentage (0-100)",
            admin: validateCommission(labCommision) ? "" : "Invalid percentage (0-100)",
            platform: validatePlatformFees(platFormFee) ? "" : "Platform Fees must be greater than 1",
        }

        setErrors(newErrors);

        if (newErrors.clinic === "" && newErrors.admin === "" && newErrors.platform === "") {

            const formdata = {
                platFormFee,
                bookingCommission: BookingCommission,
                labTestCommissionPercentage: labCommision
            }
            setIsloading(true);
            try {
                await setConstants(formdata);
                toast.success("Updated Sucessfully");
                setIsloading(false);
                setIsUpdated(false);
            } catch (err) {
                console.log(err);
                setIsloading(false);
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Commission Settings</h2>
                    <p className="text-gray-600 mb-8">Manage your platform's commission rates and fees</p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <label className="block text-lg font-semibold text-gray-700 mb-3">
                                    Booking Commission
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={BookingCommission}
                                        onChange={(e) => { setIsUpdated(true); setBookingCommission(e.target.value) }}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter percentage"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                </div>
                                {errors.clinic && <p className="mt-2 text-red-600">{errors.clinic}</p>}
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <label className="block text-lg font-semibold text-gray-700 mb-3">
                                    Lab Test Commission
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={labCommision}
                                        onChange={(e) => { setIsUpdated(true); setLabCommision(e.target.value) }}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter percentage"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                </div>
                                {errors.admin && <p className="mt-2 text-red-600">{errors.admin}</p>}
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 md:col-span-2">
                                <label className="block text-lg font-semibold text-gray-700 mb-3">
                                    Platform Fees
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        type="text"
                                        value={platFormFee}
                                        onChange={(e) => { setIsUpdated(true); setPlatFormFee(e.target.value) }}
                                        className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter amount"
                                    />
                                </div>
                                {errors.platform && <p className="mt-2 text-red-600">{errors.platform}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <button
                                type="submit"
                                disabled={isLoading || !isUpdated}
                                className={`px-6 py-3 rounded-lg text-white font-medium ${isLoading || !isUpdated ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

