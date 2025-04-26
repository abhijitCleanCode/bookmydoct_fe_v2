"use client";

import { useEffect, useState } from "react";
import { userStore } from "@/zustandStore/userStore";
import { format } from "date-fns";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    FileText,
    AlertCircle,
    Clock,
    DollarSign
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function LabTestBookings() {
    const [currentPage, setCurrentPage] = useState(1);
    const { getAllAppointments } = userStore();
    const [labTests, setLabTests] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 8;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
        getAllAppointments(currentPage).then((res) => {
            setLabTests(res?.appointments);
            setTotalPages(res?.totalPages);
        });
    }, [currentPage]);

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            completed: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800"
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="p-8 space-y-6 w-full min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Lab Test Bookings</h1>
                        <p className="text-gray-500 mt-1">Manage and track your lab test appointments</p>
                    </div>
                </div>

                {labTests?.length === 0 ? (
                    <Card className="p-12 text-center">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Lab Tests Booked</h3>
                        <p className="text-gray-500">You haven't booked any lab tests yet.</p>
                    </Card>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {labTests?.map((test) => (
                                <Card key={test._id} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <FileText className="h-5 w-5 text-primary" />
                                            <h3 className="font-semibold text-lg">{test.clinicName}</h3>
                                        </div>
                                        <Badge variant="outline" className={getStatusColor(test.status)}>
                                            {test.status || "Pending"}
                                        </Badge>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            <span>{format(new Date(test.appointmentDate), "PPP")}</span>
                                        </div>

                                        <div className="flex items-center text-gray-600">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>{test.testNames}</span>
                                        </div>

                                        <div className="flex items-center text-gray-600">
                                            <DollarSign className="h-4 w-4 mr-2" />
                                            <span>₹{test.amountPaid}</span>
                                        </div>

                                        <div className="flex items-start space-x-2 bg-blue-50 p-3 rounded-lg">
                                            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                                            <p className="text-sm text-blue-600">
                                                Our clinic staff will contact you shortly regarding sample collection instructions.
                                            </p>
                                        </div>
                                    </div>

                                    <Button variant="outline" className="w-full mt-4">
                                        View Details
                                    </Button>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Showing {labTests?.length === 0 ? "0" : startIndex + 1} to {Math.min(endIndex, labTests?.length)} of {labTests?.length} results
                            </p>

                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}