'use client';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import useAuthStore from '@/zustandStore/authStore';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ViewDoctor({ isDrawerOpen, setIsDrawerOpen, doctor }) {
	const { user } = useAuthStore();

	return (
		<Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
			<SheetContent className='sm:min-w-[600px] overflow-scroll'>
				<SheetHeader className='mb-6'>
					<SheetTitle className='text-2xl font-bold text-primary'>Doctor Details</SheetTitle>
				</SheetHeader>
				<ScrollArea className='h-[calc(100vh-100px)] pr-4'>
					<Card>
						<CardContent className='space-y-4 pt-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='registrationNumber'>Registration Number</Label>
									<div className='bg-muted rounded-lg p-2.5 text-sm'>
										{doctor?.registrationNumber}
									</div>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='fullName'>Full Name</Label>
									<div className='bg-muted rounded-lg p-2.5 text-sm'>
										{doctor?.fullName}
									</div>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='phone'>Phone Number</Label>
									<div className='bg-muted rounded-lg p-2.5 text-sm'>
										{doctor?.phoneNumber}
									</div>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='email'>Email</Label>
									<div className='bg-muted rounded-lg p-2.5 text-sm'>
										{doctor?.email}
									</div>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='specialization'>Specialization</Label>
									<div className='bg-muted rounded-lg p-2.5 text-sm'>
										{doctor?.specialization}
									</div>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='qualification'>Qualification</Label>
									<div className='bg-muted rounded-lg p-2.5 text-sm'>
										{doctor?.medicalDegree}
									</div>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='experience'>Experience (Years)</Label>
									<div className='bg-muted rounded-lg p-2.5 text-sm'>
										{doctor?.experience}
									</div>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='fee'>Consultation Fee (₹)</Label>
									<div className='bg-muted rounded-lg p-2.5 text-sm'>
										{doctor?.fees?.find((fee) => fee.clinicId === user?.clinicId)?.fee}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardContent className='pt-6 p-2 md:p-6 w-full'>
							<div className='flex items-center gap-2 mb-6'>
								<Clock className='w-5 h-5 text-primary' />
								<h3 className='text-lg font-semibold'>Weekly Schedule</h3>
							</div>

							<div className='space-y-4'>
								{doctor?.appointmentsSchedule
									.find((clinic) => clinic.clinicId === user.clinicId.id)
									?.schedule.length === 0 ? (
									<div className='text-center py-4 text-gray-500'>
										No schedule added
									</div>
								) : (
									doctor?.appointmentsSchedule
										.find((clinic) => clinic.clinicId === user.clinicId)
										?.schedule.map((day) => (
											<Card key={day?._id} className='p-1 md:p-4 border border-gray-200'>
												<div className='flex items-center justify-between gap-4'>
													<div className='bg-muted rounded-lg px-4 py-2 w-24 text-center'>
														{day?.day}
													</div>
													<div className='flex items-center gap-2 flex-1'>
														<div className='bg-muted rounded-lg px-4 py-2 text-center flex-1'>
															{day?.startTime}
														</div>
														<span>to</span>
														<div className='bg-muted rounded-lg px-4 py-2 text-center flex-1'>
															{day?.endTime}
														</div>
													</div>
													<div className='bg-muted rounded-lg px-4 py-2 w-24 text-center'>
														{day?.maxSlots} slots
													</div>
												</div>
											</Card>
										))
								)}
							</div>
						</CardContent>
					</Card>

					<div className='flex justify-end mt-6'>
						<Button onClick={() => setIsDrawerOpen(false)} className='px-8 bg-primary'>
							Close
						</Button>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
