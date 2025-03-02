'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User, Mail, Phone, MapPin, Lock, Pencil, Key, PenOffIcon } from 'lucide-react'
import useAuthStore from '@/zustandStore/authStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import '../../../globals.css'

export default function UserProfile() {
    const [isEditing, setIsEditing] = useState(false)
    const [Updateduser, setUpdatedUser] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: ''
    })
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })
    const { user, changePassword, isLoading, updateUser } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isEditing && user) {
            setUpdatedUser({
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address
            })
        }
    }, [user])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUpdatedUser(prevUser => ({ ...prevUser, [name]: value }))
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!Updateduser.fullName || !Updateduser.email || !Updateduser.phoneNumber || !Updateduser.address) {
            toast.error('Please fill all the fields')
            return
        }
        await updateUser(Updateduser, user.role);
        router.refresh();
        setIsEditing(false)
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!password.currentPassword || !password.newPassword || !password.confirmNewPassword) {
            toast.error('Please fill all the fields')
            return
        }
        if (password.newPassword !== password.confirmNewPassword) {
            toast.error('New Password and confirm New password do not match')
            return
        }

        await changePassword(password.currentPassword, password.newPassword, user.role);
        router.push('/profile');

    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center w-full">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-primary p-8">
                        <div className="flex items-center justify-between space-x-6">
                            <div className='flex items-center gap-4'>
                                <Avatar className="w-20 h-20 border-4 border-white">
                                    <AvatarFallback className="bg-white text-primary">
                                        <User className="w-12 h-12" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-white">
                                    <h1 className="text-3xl font-bold">{user?.fullName}</h1>
                                    <p className="text-blue-100">{user?.email}</p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="ml-auto text-white hover:bg-white/20 p-2 rounded-lg border bg-white"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? <PenOffIcon className='w-5 h-5 text-primary' /> : <Pencil className="w-5 h-5 text-primary" />}
                            </Button>
                        </div>
                    </div>

                    <div className="p-8">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-lg font-medium">Full Name</Label>
                                    <div className="relative flex items-center gap-2">
                                        <User className="text-gray-400 w-5 h-5" />
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            value={Updateduser?.fullName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className=""
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-lg font-medium">Email</Label>
                                    <div className="relative flex items-center gap-2">
                                        <Mail className="text-gray-400 w-5 h-5" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={Updateduser?.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber" className="text-lg font-medium">Phone Number</Label>
                                    <div className="relative flex items-center gap-2">
                                        <Phone className=" text-gray-400 w-5 h-5" />
                                        <Input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={Updateduser?.phoneNumber}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}

                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-lg font-medium">Address</Label>
                                    <div className="relative flex items-center gap-2">
                                        <MapPin className=" text-gray-400 w-5 h-5" />
                                        <Input
                                            id="address"
                                            name="address"
                                            value={Updateduser?.address}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}

                                        />
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        onClick={handleUpdateUser}
                                        disabled={isLoading}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                                    >
                                        {isLoading ? "Processing..." : "Save Changes"}
                                    </Button>
                                </div>
                            )}
                        </form>

                        <div className="mt-8 border-t pt-6">
                            <Dialog>
                                <DialogTrigger >
                                    <div className="w-full p-2 md:w-auto flex items-center justify-center space-x-2 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50">
                                        <Lock className="w-5 h-5" />
                                        <span>Change Password</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold text-center">Change Password</DialogTitle>
                                    </DialogHeader>
                                    <form className="mt-6 space-y-6" onSubmit={handleChangePassword}>
                                        <div className="space-y-2">
                                            <Label htmlFor="currentPassword" className="text-sm font-medium">Current Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="currentPassword"
                                                    type="password"
                                                    value={password.currentPassword}
                                                    onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
                                                    className="pl-10"
                                                />
                                                <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="newPassword"
                                                    type="password"
                                                    value={password.newPassword}
                                                    onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                                                    className="pl-10"
                                                />
                                                <Key className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    type="password"
                                                    value={password.confirmNewPassword}
                                                    onChange={(e) => setPassword({ ...password, confirmNewPassword: e.target.value })}
                                                    className="pl-10"
                                                />
                                                <Key className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                                            </div>
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                            {isLoading ? "Processing..." : "Update Password"}
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}