'use client';
import { useEffect, useState } from 'react';
import useAdminStore from '@/zustandStore/adminStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function SpecializationsPage() {
    const [loading, setLoading] = useState(true);
    const [newSpecialization, setNewSpecialization] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { specializations, getSpecializations, addSpecialization, deleteSpecialization } = useAdminStore();

    const fetchSpecializations = async () => {
        try {
            await getSpecializations();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpecializations();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newSpecialization.trim()) return;

        try {
            await addSpecialization({ specialization: newSpecialization.trim() });
            setNewSpecialization('');
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error adding specialization:', error);
        }
    };

    const handleDelete = async (specialization) => {
        try {
            await deleteSpecialization({ specialization });
        } catch (error) {
            console.error('Error deleting specialization:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-primary">
                            Medical Specializations
                        </h1>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger >
                                <Button className="bg-primary text-white px-6 py-2 rounded-full shadow-md transition-all duration-200 transform hover:scale-105">
                                    <Plus className="h-5 w-5 mr-2" />
                                    New Specialization
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white rounded-2xl p-6">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-gray-800">Add Specialization</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleAdd} className="mt-4">
                                    <Input
                                        placeholder="Enter specialization name"
                                        value={newSpecialization}
                                        onChange={(e) => setNewSpecialization(e.target.value)}
                                        className="w-full border-2 border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                    />
                                    <Button type="submit" className="w-full mt-4 bg-primary text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                                        Add Specialization
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {specializations?.map((specialization, idx) => (
                            <div key={idx} className="group bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-all duration-200 hover:shadow-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-medium text-gray-800">{specialization}</span>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(specialization)}
                                        className="opacity-0 group-hover:opacity-100 bg-red-50 hover:bg-red-100 rounded-full p-2 transition-all duration-200"
                                    >
                                        <Trash2 className="h-5 w-5 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {specializations?.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-500">No specializations available</p>
                            <p className="text-sm text-gray-400 mt-2">Add your first specialization to get started</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 