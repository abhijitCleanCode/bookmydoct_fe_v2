'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Stethoscope, Heart, Bone, Ear, Baby, Brain, Syringe, Pill, Search, Loader, Smile, ScanFace } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useAdminStore from '@/zustandStore/adminStore'
import LoadingComp from '@/app/loading'
import { FaBaby, FaBone, FaBrain, FaHeart, FaPills, FaStethoscope, FaSyringe, FaTooth } from 'react-icons/fa'
import { FaEarListen, FaFaceFrown } from 'react-icons/fa6'



const LoadingAnimation = () => {
    return (
        <Loader />
    )
}
const SpecializationIcon = (type) => {
    const icons = {
        cardiologist: <FaHeart className="w-6 h-6 text-red-500" />,
        orthopedic: <FaBone className="w-6 h-6 text-gray-600" />,
        audiologist: <FaEarListen className="w-6 h-6 text-blue-500" />,
        pediatrician: <FaBaby className="w-6 h-6 text-pink-500" />,
        psychiatrist: <FaBrain className="w-6 h-6 text-purple-500" />,
        radiologist: <FaSyringe className="w-6 h-6 text-green-500" />,
        dentist: <FaTooth className="w-6 h-6 text-yellow-500" />,
        medicine: <FaPills className="w-6 h-6 text-blue-600" />,
        default: <FaStethoscope className="w-6 h-6 text-gray-500" />,
        dermatologist: <FaFaceFrown className="w-6 h-6 text-amber-500" />,
    }
    return icons[type?.toLowerCase()] || icons.default
}



export default function DoctorCategories() {
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { specializations, getSpecializations } = useAdminStore()

    useEffect(() => {
        const loadSpecializations = async () => {
            try {
                await getSpecializations()
            } catch (error) {
                console.error('Failed to fetch specializations:', error)
            } finally {
                setLoading(false)
            }
        }
        loadSpecializations()
    }, [])

    const filteredSpecializations = specializations?.filter(spec =>
        spec.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    if (loading) return <LoadingComp />

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4 text-primary">Medical Specializations</h1>
                <p className="text-gray-600 text-center mb-8">Find the right specialist for your needs</p>

                <div className="mb-8 relative max-w-xl mx-auto">
                    <Input
                        type="text"
                        placeholder="Search specializations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10  transition-colors"
                    />
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <Card
                        className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-primary/5 border-2 border-primary/10"
                        onClick={() => router.push('/doctors')}
                    >
                        <CardContent className="p-6 flex items-center justify-center flex-col h-full">
                            <div className="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Stethoscope className="w-6 h-6" />
                            </div>
                            <h2 className="text-center">All Doctors</h2>
                        </CardContent>
                    </Card>

                    {filteredSpecializations.map((specialization, index) => (
                        <Card
                            key={index}
                            className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-primary/5 border-2 border-primary/10"
                            onClick={() => router.push(`/?specialization=${specialization}`)}
                        >
                            <CardContent className="p-6 flex items-center justify-center flex-col h-full">
                                <div className="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    {SpecializationIcon(specialization)}
                                </div>
                                <h2 className="text-center">{specialization}</h2>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredSpecializations.length === 0 && (
                    <div className="text-center mt-12">
                        <p className="text-lg text-gray-600">No specializations found.</p>
                        <p className="text-primary">Try a different search term.</p>
                    </div>
                )}
            </div>
        </div>
    )
}