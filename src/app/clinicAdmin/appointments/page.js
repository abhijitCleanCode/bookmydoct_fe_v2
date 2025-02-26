"use client"

import { useEffect, useState } from "react";
import AppointmentCard from "@/components/ui/AppointmentCard";
import useClinicStore from "@/zustandStore/clinicStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, isToday, isTomorrow, isPast, isFuture } from "date-fns";
import LoadingComp from "@/app/loading";
import { CalendarDays, Clock, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Calendar } from "@/components/ui/calendar";

export default function ClinicAppointments() {
    const { getAppointments, appointments } = useClinicStore();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    // Get unique doctors from appointments
    const doctors = [...new Set(appointments.map(app => app.doctorName))];

    const fetchAppointments = async () => {
        try {
            setIsLoading(true);
            await getAppointments();
        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Filter and sort appointments
    const filterAppointments = (apps) => {
        return apps
            .filter(app => {
                const matchesSearch = app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    app.phoneNumber.includes(searchQuery);
                const matchesDoctor = selectedDoctor === "all" || app.doctorName === selectedDoctor;
                const matchesDate = !selectedDate || app.appointmentDate === format(selectedDate, 'dd-MM-yyyy');
                return matchesSearch && matchesDoctor && matchesDate;
            })
            .sort((a, b) => {
                if (sortBy === "newest") {
                    return new Date(b.appointmentDate) - new Date(a.appointmentDate);
                }
                return new Date(a.appointmentDate) - new Date(b.appointmentDate);
            });
    };

    // Filter appointments by status
    const upcomingAppointments = filterAppointments(appointments.filter(app => {
        const [day, month, year] = app.appointmentDate.split("-").map(Number);
        const appointmentDate = new Date(year, month - 1, day);
        return isFuture(appointmentDate) || isToday(appointmentDate);
    }));

    const pastAppointments = filterAppointments(appointments.filter(app => {
        const [day, month, year] = app.appointmentDate.split("-").map(Number);
        const appointmentDate = new Date(year, month - 1, day);
        return isPast(appointmentDate) && !isToday(appointmentDate);
    }));

    const AppointmentItem = ({ appointment }) => {
        const [day, month, year] = appointment.appointmentDate.split("-").map(Number);
        const appointmentDate = new Date(year, month - 1, day);
        const isUpcoming = isFuture(appointmentDate) || isToday(appointmentDate);

        return (
            <div className={`p-4 rounded-lg border transition-all duration-200
                ${isUpcoming ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}
            >
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h3 className="font-semibold text-lg text-gray-900">{appointment.fullName}</h3>
                        <p className="text-gray-600">Dr. {appointment.doctorName}</p>
                        <p className="text-sm text-gray-500">{appointment.phoneNumber}</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center text-primary gap-1">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">
                                {appointment.appointmentTimeFrom} - {appointment.appointmentTimeTo}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                        <CalendarDays className="h-4 w-4" />
                        <span className="text-sm">
                            {isToday(appointmentDate) ? 'Today' :
                                isTomorrow(appointmentDate) ? 'Tomorrow' :
                                    format(appointmentDate, 'dd MMM yyyy')}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium
                            ${isUpcoming ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                            {isUpcoming ? 'Upcoming' : 'Past'}
                        </div>
                        <Button
                            onClick={() => setSelectedAppointment(appointment)}
                            variant="outline"
                            className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                        >
                            View Details
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return <LoadingComp />;
    }

    return (
        <div className="container max-w-6xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center text-primary">
                Appointments Management
            </h1>

            {/* Search and Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search by name or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by Doctor" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Doctors</SelectItem>
                        {doctors.map(doctor => (
                            <SelectItem key={doctor} value={doctor}>
                                {doctor}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Popover>
                    <PopoverTrigger>
                        <div className="flex items-center border py-2 px-2  rounded-lg justify-start text-left font-normal">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, 'PPP') : "Pick a date"}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {appointments.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-xl font-semibold text-gray-900">No Appointments Found</h2>
                    <p className="text-gray-600 mt-2">There are no appointments in the system yet.</p>
                </div>
            ) : (
                <Tabs defaultValue="upcoming" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="upcoming">
                            Upcoming ({upcomingAppointments.length})
                        </TabsTrigger>
                        <TabsTrigger value="past">
                            Past ({pastAppointments.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="space-y-4">
                        {upcomingAppointments.length === 0 ? (
                            <div className="text-center py-8 text-gray-600">
                                No upcoming appointments found
                            </div>
                        ) : (
                            upcomingAppointments.map((appointment) => (
                                <AppointmentItem
                                    key={appointment._id}
                                    appointment={appointment}
                                />
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="past" className="space-y-4">
                        {pastAppointments.length === 0 ? (
                            <div className="text-center py-8 text-gray-600">
                                No past appointments found
                            </div>
                        ) : (
                            pastAppointments.map((appointment) => (
                                <AppointmentItem
                                    key={appointment._id}
                                    appointment={appointment}
                                />
                            ))
                        )}
                    </TabsContent>
                </Tabs>
            )}

            {selectedAppointment && (
                <AppointmentCard
                    appointment={selectedAppointment}
                    onClose={() => setSelectedAppointment(null)}
                />
            )}
        </div>
    );
}
