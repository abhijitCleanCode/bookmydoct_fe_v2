"use client"

import { useEffect, useState } from "react";
import AppointmentCard from "@/components/ui/AppointmentCard";
import { userStore } from "@/zustandStore/userStore";
import useAuthStore from "@/zustandStore/authStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, isToday, isTomorrow, isPast, isFuture } from "date-fns";
import LoadingComp from "@/app/loading";
import { CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Appointments() {
    const { getAppointments } = userStore();
    const { isLoading: authLoading } = useAuthStore();
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            setIsLoading(true);
            const res = await getAppointments();
            setAppointments(res || []);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Filter appointments by status
    const upcomingAppointments = appointments.filter(app => {
        const [day, month, year] = app.appointmentDate.split("-").map(Number);
        const appointmentDate = new Date(year, month - 1, day);
        return isFuture(appointmentDate) || isToday(appointmentDate);
    });

    const pastAppointments = appointments.filter(app => {
        const [day, month, year] = app.appointmentDate.split("-").map(Number);
        const appointmentDate = new Date(year, month - 1, day);
        return isPast(appointmentDate) && !isToday(appointmentDate);
    });

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
                        <h3 className="font-semibold text-lg text-gray-900">Dr. {appointment.doctorName}</h3>
                        <p className="text-gray-600">{appointment.specialization}</p>
                        <p className="text-sm text-gray-500">{appointment.clinicName}</p>
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

    const EmptyState = () => (
        <div className="text-center py-12 space-y-4">
            <div className="max-w-md mx-auto">
                <img
                    src="/no-appointments.svg"
                    alt="No appointments"
                    className="w-64 h-64 mx-auto mb-6"
                />
                <h2 className="text-xl font-semibold text-gray-900">No Appointments Found</h2>
                <p className="text-gray-600 mt-2 mb-6">You haven't booked any appointments yet.</p>
                <Link href="/doctors">
                    <Button
                        className="bg-gradient-to-r from-primary to-blue-600 text-white hover:opacity-90"
                    >
                        Book an Appointment
                    </Button>
                </Link>
            </div>
        </div>
    );

    if (isLoading || authLoading) {
        return <LoadingComp />;
    }

    return (
        <div className="container max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center text-primary">
                My Appointments
            </h1>

            {appointments.length === 0 ? (
                <EmptyState />
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
                                No upcoming appointments
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
                                No past appointments
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