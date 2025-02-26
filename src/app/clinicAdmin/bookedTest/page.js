"use client"

import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Search } from "lucide-react";

import useClinicStore from "@/zustandStore/clinicStore";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

export default function ClinicAdmin() {
    const { getAllAppointments, setActiveTab } = useClinicStore();
    const [labTests, setLabTests] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [sortBy, setSortBy] = useState("newest");
    const [statusFilter, setStatusFilter] = useState("all");

    useLayoutEffect(() => {
        setActiveTab('viewRequests')
    }, []);

    useEffect(() => {
        getAllAppointments().then((res) => {
            setLabTests(res?.appointments || []);
        });
    }, []);

    // Filter and sort lab tests
    const filteredAndSortedTests = labTests
        ?.filter(test => {
            const matchesSearch =
                test.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                test.phoneNumber.includes(searchQuery) ||
                test.testNames.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesDate = !selectedDate || test.appointmentDate === format(selectedDate, 'yyyy-MM-dd');
            const matchesStatus = statusFilter === 'all' || test.status === statusFilter;

            return matchesSearch && matchesDate && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.appointmentDate) - new Date(a.appointmentDate);
            } else {
                return new Date(a.appointmentDate) - new Date(b.appointmentDate);
            }
        });

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 space-y-8 w-3/4">
            <div className="flex-1">
                {/* Header with Search and Filters */}
                <div className="flex flex-col gap-4 sm:flex-row justify-between items-center w-full mb-6">
                    <h1 className="text-2xl font-semibold">Lab Test Appointments</h1>
                    <div className="flex gap-4 items-center w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-initial">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search by name, phone, or test..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-full sm:w-[300px]"
                            />
                        </div>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                        </SelectContent>
                    </Select>



                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-[180px] rounded-lg pl-3 text-left font-normal">
                                {selectedDate ? (
                                    format(selectedDate, 'PPP')
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    {selectedDate && (
                        <Button
                            variant="ghost"
                            onClick={() => setSelectedDate(null)}
                            className="h-10 px-3"
                        >
                            Clear Date
                        </Button>
                    )}
                </div>

                <div className="mb-4 text-sm text-gray-600">
                    Showing <span className="font-medium">{filteredAndSortedTests?.length}</span> appointments
                </div>

                {/* Lab Test Appointments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedTests?.map((test) => (
                        <Card key={test._id} className="hover:shadow-lg transition-shadow duration-200">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{test.fullName}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">{format(new Date(test.appointmentDate), 'PP')}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Tests:</span> {test.testNames}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Age:</span> {test.age} years
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Gender:</span> {test.gender}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Phone:</span> {test.phoneNumber}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Address:</span> {test.address}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredAndSortedTests?.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">No appointments found matching your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}