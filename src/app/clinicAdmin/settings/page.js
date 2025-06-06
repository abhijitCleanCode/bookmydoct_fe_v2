'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Save, Settings2, User, KeyRound } from "lucide-react"
import { useEffect, useLayoutEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import useAuthStore from "@/zustandStore/authStore"
import { useRouter } from "next/navigation"
import useClinicStore from "@/zustandStore/clinicStore"
import toast from "react-hot-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Settings() {
    const { user, changePassword, isLoading, updateUser } = useAuthStore();
    const { setActiveTab } = useClinicStore();
    const router = useRouter();
    const [isClinicChanged, setIsClinicChanged] = useState(false);
    const [isAdminChanged, setIsAdminChanged] = useState(false);

    useLayoutEffect(() => {
        setActiveTab('settings')
    }, [])

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const [updatedClinic, setUpdatedClinic] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        addressOne: '',
        addressTwo: '',
        city: '',
        state: '',
        pincode: '',
    })

    const [updatedAdmin, setUpdatedAdmin] = useState({
        fullName: '',
        email: '',
    })

    const { updateClinicDetails, getClinicDetails, clinicDetails } = useClinicStore();

    useEffect(() => {
        if (user) {
            setUpdatedAdmin({ email: user.email, fullName: user.fullName })
            getClinicDetails()
        }
    }, [user])

    useEffect(() => {
        if (clinicDetails) {
            setUpdatedClinic({
                name: clinicDetails?.name,
                addressOne: clinicDetails?.addressOne,
                phoneNumber: clinicDetails?.phoneNumber || "",
                email: clinicDetails?.email || "",
                addressTwo: clinicDetails?.addressTwo || "",
                city: clinicDetails?.city || "",
                state: clinicDetails?.state || "",
                pincode: clinicDetails?.pincode || "",
            })
        }
    }, [clinicDetails])

    const handleAdminInputChange = (e) => {
        setIsAdminChanged(true);
        const { name, value } = e.target
        setUpdatedAdmin(prevAdmin => ({ ...prevAdmin, [name]: value }))
    }

    const handleClinicInputChange = (e) => {
        setIsClinicChanged(true);
        const { name, value } = e.target
        setUpdatedClinic(prevClinic => ({ ...prevClinic, [name]: value }))
    }

    const handleUpdateAdmin = async (e) => {
        e.preventDefault();
        if (!updatedAdmin.fullName || !updatedAdmin.email) {
            toast.error('Please fill all the fields')
            return
        }
        await updateUser(updatedAdmin, 'clinic');
        setIsAdminChanged(false);
        router.push('/admin/settings');
    }

    const handleUpdateClinic = async (e) => {
        e.preventDefault();
        if (!updatedClinic.name || !updatedClinic.phoneNumber || !updatedClinic.email || !updatedClinic.addressOne || !updatedClinic.city || !updatedClinic.state || !updatedClinic.pincode) {
            toast.error('Please fill all the fields')
            return
        }
        await updateClinicDetails(updatedClinic);
        setIsClinicChanged(false);
        router.push('/admin/settings');
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
        router.push('/clinicAdmin/settings');
    }

    return (
        <div className="p-8 w-full mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <Settings2 className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">Settings</h1>
            </div>

            <Tabs defaultValue="clinic" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 ">
                    <TabsTrigger value="clinic">Clinic Profile</TabsTrigger>
                    <TabsTrigger value="admin">Admin Profile</TabsTrigger>
                </TabsList>

                <TabsContent value="clinic">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                <CardTitle>Clinic/Hospital Profile</CardTitle>
                            </div>
                            <CardDescription>Update your clinic or hospital information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdateClinic} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Clinic Name</Label>
                                        <Input name="name" value={updatedClinic.name} onChange={handleClinicInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email Address</Label>
                                        <Input name="email" type="email" value={updatedClinic.email} onChange={handleClinicInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone Number</Label>
                                        <Input name="phoneNumber" value={updatedClinic.phoneNumber} onChange={handleClinicInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Address Line 1</Label>
                                        <Input name="addressOne" value={updatedClinic.addressOne} onChange={handleClinicInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Address Line 2</Label>
                                        <Input name="addressTwo" value={updatedClinic.addressTwo} onChange={handleClinicInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>City</Label>
                                        <Input name="city" value={updatedClinic.city} onChange={handleClinicInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>State</Label>
                                        <Input name="state" value={updatedClinic.state} onChange={handleClinicInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Pincode</Label>
                                        <Input name="pincode" value={updatedClinic.pincode} onChange={handleClinicInputChange} />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="gap-2">
                                                <KeyRound className="h-4 w-4" />
                                                Change Password
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Change Password</DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={handleChangePassword} className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Current Password</Label>
                                                    <Input type="password" value={password.currentPassword} onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>New Password</Label>
                                                    <Input type="password" value={password.newPassword} onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Confirm New Password</Label>
                                                    <Input type="password" value={password.confirmNewPassword} onChange={(e) => setPassword({ ...password, confirmNewPassword: e.target.value })} />
                                                </div>
                                                <Button type="submit" className="w-full" disabled={isLoading}>
                                                    {isLoading ? "Processing..." : "Update Password"}
                                                </Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                    <Button type="submit" disabled={!isClinicChanged} className="gap-2">
                                        <Save className="h-4 w-4" />
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="admin">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                <CardTitle>Admin Profile</CardTitle>
                            </div>
                            <CardDescription>Update your admin account information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdateAdmin} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input name="fullName" value={updatedAdmin.fullName} onChange={handleAdminInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email Address</Label>
                                        <Input name="email" type="email" value={updatedAdmin.email} onChange={handleAdminInputChange} />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={!isAdminChanged} className="gap-2">
                                        <Save className="h-4 w-4" />
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}