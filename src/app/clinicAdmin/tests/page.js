"use client"

import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, Edit, Plus, Search, Trash } from "lucide-react";
import useClinicStore from "@/zustandStore/clinicStore";
import toast from "react-hot-toast";
import AddLabTest from "@/components/clinic/labTest/AddLabTest";
import EditLabTest from "@/components/clinic/labTest/EditLabTest";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ClinicAdmin() {
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [activeTestId, setActiveTestId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const { getLabTests, deleteLabTest, setActiveTab, addLabTest, editTest } = useClinicStore();
    const [labTests, setLabTests] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 9; // Changed to 9 for 3x3 grid
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useLayoutEffect(() => {
        setActiveTab('manageTests')
    }, []);

    // Filter lab tests based on search
    const filteredTests = labTests?.filter(test =>
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentTests = filteredTests?.slice(startIndex, endIndex);

    const handleAddDoctor = async (labTest) => {
        try {
            const res = await addLabTest(labTest);
            setIsAddDrawerOpen(false);
            setLabTests([...labTests, res]);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditDrawerOpen = (id) => {
        setIsEditDrawerOpen(false);
        setActiveTestId(null);
    };

    const handleDeleteLabTest = async (id) => {
        try {
            await deleteLabTest(id);
            setLabTests(labTests.filter((labTest) => labTest._id !== id));
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditTest = (id) => {
        setActiveTestId(id);
        setIsEditDrawerOpen(true);
    }

    const updateTest = async (test) => {
        try {
            const res = await editTest(activeTestId, test);
            setLabTests(labTests.map((labTest) => labTest._id === activeTestId ? res : labTest));
            setIsEditDrawerOpen(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteLabTestAlert = (id) => {
        toast((t) => (
            <div className="w-full">
                <div className="flex justify-between gap-2 items-center">
                    <div className="">
                        <p>Delete this lab test?</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Button variant="outline" onClick={() => toast.dismiss(t.id)}>Cancel</Button>
                        <Button className="bg-red-500 text-white" onClick={() => { handleDeleteLabTest(id); toast.dismiss(t.id) }}>
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        ));
    }

    useEffect(() => {
        getLabTests(currentPage).then((res) => {
            setLabTests(res?.labTests);
            setTotalPages(res?.totalPages);
        })
    }, [currentPage]);

    return (
        <div className="p-6 space-y-8 w-3/4">
            <div className="flex-1">
                {/* Header with Search */}
                <div className="flex flex-col gap-4 sm:flex-row justify-between items-center w-full mb-6">
                    <h1 className="text-2xl font-semibold">Lab Tests</h1>
                    <div className="flex gap-4 items-center w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-initial">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search tests..."
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
                            Add Test
                        </Button>
                    </div>
                </div>

                <div className="mb-4 text-sm text-gray-600">
                    Showing <span className="font-medium">{filteredTests?.length}</span> tests
                </div>

                {/* Lab Tests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentTests?.map((test) => (
                        <Card key={test._id} className="hover:shadow-lg transition-shadow duration-200">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                                        <span className="inline-block mt-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                                            ₹{test.price}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditTest(test._id)}>
                                            <Edit className="h-4 w-4 text-green-500" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteLabTestAlert(test._id)}>
                                            <Trash className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    {test.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Showing {filteredTests?.length === 0 ? "0" : startIndex + 1} to {Math.min(endIndex, filteredTests?.length)} of {filteredTests?.length} results
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
            </div>

            <AddLabTest
                isAddDrawerOpen={isAddDrawerOpen}
                setIsAddDrawerOpen={setIsAddDrawerOpen}
                handleAddDoctor={handleAddDoctor}
            />
            <EditLabTest
                isDrawerOpen={isEditDrawerOpen}
                setIsDrawerOpen={handleEditDrawerOpen}
                oldLabTest={labTests?.find(test => test._id === activeTestId)}
                handleEditTest={updateTest}
            />
        </div>
    );
}