'use client';
import { useEffect, useState } from 'react';
import useAdminStore from '@/zustandStore/adminStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Building2, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function VerifyClinicsPage() {
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getUnverifiedClinics, verifyClinic } = useAdminStore();

    const fetchClinics = async () => {
        try {
            const response = await getUnverifiedClinics();
            setClinics(response.clinics || []);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (clinicId) => {
        try {
            await verifyClinic(clinicId);
            fetchClinics();
        } catch (error) {
            console.error('Error verifying clinic:', error);
        }
    };

    useEffect(() => {
        fetchClinics();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoaderCircle className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Verify Clinics</h1>
                        <p className="mt-2 text-gray-600">Review and verify new clinic registrations</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <span className="text-sm text-gray-500">Pending Verifications:</span>
                        <span className="ml-2 text-lg font-semibold text-blue-600">{clinics.length}</span>
                    </div>
                </div>

                {clinics.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900">All Caught Up!</h3>
                        <p className="mt-2 text-gray-600">There are no clinics waiting for verification</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {clinics.map((clinic) => (
                            <Card key={clinic._id} className="hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Building2 className="w-6 h-6 text-blue-600" />
                                            <h2 className="text-xl font-semibold text-gray-900">{clinic.clinicName}</h2>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        <div className="flex items-center space-x-3 text-gray-600">
                                            <Mail className="w-5 h-5" />
                                            <span>{clinic.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-600">
                                            <Phone className="w-5 h-5" />
                                            <span>{clinic.phoneNumber}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-600">
                                            <MapPin className="w-5 h-5" />
                                            <span>{clinic.city}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => handleVerify(clinic._id)}
                                        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        <span>Verify Clinic</span>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}