"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Edit, Eye, Plus, Search, Trash, View } from "lucide-react";
import AddDoctor from "@/components/clinic/doctor/AddDoctor";
import useClinicStore from "@/zustandStore/clinicStore";
import toast from "react-hot-toast";
import useAdminStore from "@/zustandStore/adminStore";
import { Input } from "@/components/ui/input";
import EditDoctor from "@/components/clinic/doctor/EditDoctor";
import ViewDoctor from "@/components/clinic/doctor/ViewDoctor";

export default function ClinicAdmin() {
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [activeDoctorId, setActiveDoctorId] = useState(null);
    const [currentTab, setCurrentTab] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const { doctors, isLoading, fetchDoctors, deleteDoctor, setActiveTab } = useClinicStore();
    const { specializations, getSpecializations } = useAdminStore();

    useLayoutEffect(() => {
        setActiveTab('doctors');
        getSpecializations();
        fetchDoctors();
    }, []);

    // Filter doctors based on search query and specialization
    const filteredDoctors = doctors?.filter(doctor => {
        const matchesSearch =
            doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.phoneNumber.includes(searchQuery);
        const matchesSpecialization = currentTab === "All" || doctor.specialization === currentTab;
        return matchesSearch && matchesSpecialization;
    });

    // Pagination
    const itemsPerPage = 9; // Changed to 9 for 3x3 grid
    const totalPages = Math.ceil(filteredDoctors?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDoctors = filteredDoctors?.slice(startIndex, endIndex);

    const handleDeleteDoctorAlert = (id) => {
        toast((t) => (
            <div className="w-full">
                <div className="flex justify-between gap-2 items-center">
                    <div className="">
                        <p>Deleting this doctor? </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Button variant="outline" onClick={() => toast.dismiss(t.id)}>Cancel</Button>
                        <Button className={"bg-red-500 text-white"} onClick={() => { deleteDoctor(id); toast.dismiss(t.id) }}>Ok?</Button>
                    </div>
                </div>
            </div>
        ));
    };

    const handleViewDrawerOpen = (id) => {
        setIsViewDrawerOpen(false);
        setActiveDoctorId(null);
    };
    const handleEditDrawerOpen = (id) => {
        setIsEditDrawerOpen(false);
        setActiveDoctorId(null);
    };

    const handleDeleteDoctor = async (id) => {
        await deleteDoctor(id);
    }

    const handleViewDoctor = (id) => {
        setActiveDoctorId(id);
        setIsViewDrawerOpen(true);
    }

    const handleEditDoctor = (id) => {
        setActiveDoctorId(id);
        setIsEditDrawerOpen(true);
    }

    return (
        <div className="p-6 w-3/4 space-y-8 ">
            <div className="flex-1">
                {/* Header with Search */}
                <div className="flex flex-col gap-4 sm:flex-row justify-between items-center w-full mb-6">
                    <h1 className="text-2xl font-semibold">Doctors</h1>
                    <div className="flex gap-4 items-center w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-initial">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search doctors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-full sm:w-[300px]"
                            />
                        </div>
                        <Button
                            onClick={() => setIsAddDrawerOpen(true)}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Doctor
                        </Button>
                    </div>
                </div>

                {/* Specialization Tabs */}
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="">
                    <div className="border-b mb-6">
                        <div className="overflow-x-auto">
                            <TabsList className="bg-transparent h-12">
                                <TabsTrigger
                                    value="All"
                                    className={`${currentTab === "All" ? "border-b-2 border-primary text-primary" : ""}`}
                                >
                                    All
                                </TabsTrigger>
                                {specializations.map((spec) => (
                                    <TabsTrigger
                                        key={spec}
                                        value={spec}
                                        className={`${currentTab === spec ? "border-b-2 border-primary text-primary" : ""}`}
                                    >
                                        {spec}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                    </div>

                    <div className="mb-4 text-sm text-gray-600">
                        Showing <span className="font-medium">{filteredDoctors?.length}</span> doctors
                    </div>

                    {/* Doctors Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentDoctors?.map((doctor) => (
                            <div key={doctor._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{doctor.fullName}</h3>
                                            <span className="inline-block mt-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                                                {doctor.specialization}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleViewDoctor(doctor._id)}>
                                                <Eye className="h-4 w-4 text-primary" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleEditDoctor(doctor._id)}>
                                                <Edit className="h-4 w-4 text-green-500" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteDoctorAlert(doctor._id)}>
                                                <Trash className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-gray-600">
                                            <span className="font-medium">Email:</span> {doctor.email}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Phone:</span> {doctor.phoneNumber}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Experience:</span> {doctor.experience} years
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Reg No:</span> {doctor.registrationNumber}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing {startIndex + 1} to {Math.min(endIndex, filteredDoctors?.length)} of {filteredDoctors?.length} results
                        </p>
                        <div className="flex gap-2 items-center">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="font-bold rounded-full bg-primary/10 text-primary h-8 w-8 flex justify-center items-center">
                                {currentPage}
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Tabs>
            </div>

            <AddDoctor isAddDrawerOpen={isAddDrawerOpen} setIsAddDrawerOpen={setIsAddDrawerOpen} />
            <EditDoctor isDrawerOpen={isEditDrawerOpen} setIsDrawerOpen={setIsEditDrawerOpen} oldDoctor={doctors?.find(doctor => doctor._id === activeDoctorId)} />
            <ViewDoctor isDrawerOpen={isViewDrawerOpen} setIsDrawerOpen={setIsViewDrawerOpen} doctor={doctors?.find(doctor => doctor._id === activeDoctorId)} />
        </div>
    );
}