'use client';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { X, Plus, Clock } from 'lucide-react';

import toast from 'react-hot-toast';


import useAuthStore from '@/zustandStore/authStore';
import useAdminStore from '@/zustandStore/adminStore';
import useClinicStore from '@/zustandStore/clinicStore';
import { Card, CardContent } from '@/components/ui/card';

export default function EditDoctor({
	isDrawerOpen,
	setIsDrawerOpen,
	oldDoctor,
}) {
	const { updateDoctor, isLoading } = useClinicStore();
	const { user } = useAuthStore();
	const { specializations, getSpecializations } = useAdminStore();
	const [loadingSpecializations, setLoadingSpecializations] = useState(true);
	const [schedule, setSchedule] = useState(oldDoctor?.schedule);
	const [doctor, setDoctor] = useState({});
	const handleAddSchedule = () => {
		setSchedule([
			...schedule,
			{
				id: schedule.length + 1,
				day: 'MON',
				startTime: '09:00',
				endTime: '17:00',
				maxSlots: '00',
			},
		]);
	};

	useEffect(() => {
		const fetchSpecializations = async () => {
			try {
				await getSpecializations();
			} catch (error) {
				console.error('Error fetching specializations:', error);
			} finally {
				setLoadingSpecializations(false);
			}
		};
		fetchSpecializations();
	}, []);


	useEffect(() => {
		if (oldDoctor) {	
			setDoctor({
				fullName: oldDoctor?.fullName,
				email: oldDoctor?.email,
				phoneNumber: oldDoctor?.phoneNumber,
				specialization: oldDoctor?.specialization,
				registrationNumber: oldDoctor?.registrationNumber,
				fee: oldDoctor?.fees?.find((fee) => fee.clinicId === user?.clinicId)?.fee,
				qualification: oldDoctor?.medicalDegree,
				experience: oldDoctor?.experience,
			});

			setSchedule(
				oldDoctor?.appointmentsSchedule
					.find((clinic) => clinic.clinicId === user.clinicId)
					.schedule.map((schedule) => {
						return {
							id: schedule._id,
							day: schedule.day,
							startTime: schedule.startTime,
							endTime: schedule.endTime,
							maxSlots: schedule.maxSlots,
						};
					})
			);
		}
	}, [oldDoctor]);

	const handleInputChange = (e) => {
		setDoctor({
			...doctor,
			[e?.target.name]: e?.target.value,
		});
	};
	const handleSlotChange = (name, value, id) => {
		setSchedule(
			schedule.map((schedule) => {
				if (schedule.id == id) {
					if (name === 'startTime') {
						if (Number(value.slice(0, 2)) > Number(schedule.endTime.slice(0, 2))) {
							toast.error('Start time cannot be greater than end time');
							return schedule;
						}
					}
					if (name === 'endTime') {
						if (Number(schedule.startTime.slice(0, 2)) > Number(value.slice(0, 2))) {
							toast.error('Start time cannot be greater than end time');
							return schedule;
						}
					}
					return {
						...schedule,
						[name]: value,
					};
				}
				return schedule;
			})
		);
	};
	const handleRemoveSchedule = (id) => {
		setSchedule(schedule.filter((schedule) => schedule.id !== id));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateDoctor(
				{ ...doctor, appointmentsSchedule: schedule },
				oldDoctor._id
			);
			setIsDrawerOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
			<SheetContent className='sm:min-w-[600px] overflow-scroll'>
				<SheetHeader className='mb-6'>
					<SheetTitle className='text-2xl font-bold text-primary'>Edit Doctor</SheetTitle>
				</SheetHeader>
				<ScrollArea className='h-[calc(100vh-100px)] pr-4'>
					<Card>
						<CardContent className='space-y-4 pt-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='registrationNumber'>Registration Number</Label>
									<Input
										id='registrationNumber'
										placeholder='Enter registration number'
										name='registrationNumber'
										onChange={handleInputChange}
										value={doctor?.registrationNumber}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='fullName'>Full Name</Label>
									<Input
										id='fullName'
										placeholder='Enter full name'
										name='fullName'
										onChange={handleInputChange}
										value={doctor?.fullName}
									/>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='phone'>Phone Number</Label>
									<Input
										id='phone'
										placeholder='+912456789048'
										type='tel'
										name='phoneNumber'
										onChange={handleInputChange}
										value={doctor?.phoneNumber}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										id='email'
										placeholder='Enter email'
										type='email'
										name='email'
										onChange={handleInputChange}
										value={doctor?.email}
									/>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='specialization'>Specialization</Label>
									<Select
										name='specialization'
										onValueChange={(value) =>
											handleInputChange({
												target: {
													name: 'specialization',
													value,
												},
											})
										}
										value={doctor?.specialization}
									>
										<SelectTrigger>
											<SelectValue placeholder='Select specialization' />
										</SelectTrigger>
										<SelectContent>
											{loadingSpecializations ? (
												<SelectItem value="loading" disabled>Loading...</SelectItem>
											) : (
												specializations?.map((specialization) => (
													<SelectItem key={specialization} value={specialization}>
														{specialization}
													</SelectItem>
												))
											)}
										</SelectContent>
									</Select>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='qualification'>Qualification</Label>
									<Input
										id='qualification'
										placeholder='Enter qualification'
										type='text'
										name='qualification'
										onChange={handleInputChange}
										value={doctor?.qualification}
									/>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='experience'>Experience (Years)</Label>
									<Input
										id='experience'
										placeholder='Enter experience'
										type='number'
										name='experience'
										onChange={handleInputChange}
										value={doctor?.experience}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='fee'>Consultation Fee (₹)</Label>
									<Input
										id='fee'
										placeholder='Enter fee'
										type='number'
										name='fee'
										onChange={handleInputChange}
										value={doctor?.fee}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardContent className='pt-6 p-2 md:p-6 w-full'>
							<div className='flex justify-between items-center mb-6'>
								<div className='flex items-center gap-2'>
									<Clock className='w-5 h-5 text-primary' />
									<h3 className='text-lg font-semibold'>Weekly Schedule</h3>
								</div>
								<Button onClick={handleAddSchedule} variant="outline" className='gap-2'>
									<Plus className='w-4 h-4' />
									Add Time Slot
								</Button>
							</div>

							<div className='space-y-4'>
								{schedule?.map((day) => (
									<Card key={day?.id} className='p-1 md:p-4 border border-gray-200'>
										<div className='flex shrink gap-2 items-center'>
											<Select
												onValueChange={(value) => handleSlotChange('day', value, day?.id)}
												value={day?.day}
											>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
														<SelectItem key={d} value={d}>{d}</SelectItem>
													))}
												</SelectContent>
											</Select>

											<div className='col-span-2 flex items-center gap-2'>
												<Input
													type='time'
													value={day?.startTime}
													onChange={(e) => handleSlotChange('startTime', e.target.value, day?.id)}
												/>
												<span>to</span>
												<Input
													type='time'
													onChange={(e) => handleSlotChange('endTime', e.target.value, day?.id)}
													value={day?.endTime}
												/>
											</div>

											<Input
												type='number'
												placeholder='Max Slots'
												onChange={(e) => handleSlotChange('maxSlots', e.target.value, day?.id)}
												value={day?.maxSlots}
											/>

											<Button
												variant='ghost'
												size='icon'
												className='text-red-500'
												onClick={() => handleRemoveSchedule(day?.id)}
											>
												<X className='h-4 w-4' />
											</Button>
										</div>
									</Card>
								))}
							</div>
						</CardContent>
					</Card>

					<div className='flex justify-end gap-2 mt-6'>
						<Button variant='outline' onClick={() => setIsDrawerOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSubmit} disabled={isLoading} className='px-8 bg-primary'>
							{isLoading ? 'Processing...' : 'Update Doctor'}
						</Button>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
