import { Button } from '@/components/ui/Button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { CalendarDays, Clock, MapPin, Phone, User } from 'lucide-react';
import useAuthStore from '@/zustandStore/authStore';


export default function AppointmentCard({ appointment, onClose }) {
	const { user } = useAuthStore();
	return (
		<div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
			<Card className='w-full max-w-md mx-auto shadow-xl transform transition-all'>
				<CardHeader className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-t-lg">
					<CardTitle className='flex justify-between items-center text-2xl'>
						Appointment Details
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6 p-6'>
					<div className='grid gap-6'>
						<div className='bg-blue-50 p-4 rounded-lg'>
							<div className='flex items-center space-x-3'>
								<User className='h-6 w-6 text-primary' />
								<div>
									<p className='font-semibold text-lg'>{appointment?.fullName}</p>
									<p className='text-gray-600'>
										{appointment?.age} years, {appointment?.gender}
									</p>
								</div>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div className='bg-gray-50 p-4 rounded-lg'>
								<div className='flex items-center space-x-3'>
									<CalendarDays className='h-5 w-5 text-primary' />
									<p className='font-medium'>{appointment?.appointmentDate}</p>
								</div>
							</div>
							<div className='bg-gray-50 p-4 rounded-lg'>
								<div className='flex items-center space-x-3'>
									<Clock className='h-5 w-5 text-primary' />
									<p className='font-medium'>
										{appointment?.appointmentTimeFrom} - {appointment?.appointmentTimeTo}
									</p>
								</div>
							</div>
						</div>

						<div className='bg-blue-50 p-4 rounded-lg'>
							<div className='flex items-center space-x-3'>
								<User className='h-6 w-6 text-primary' />
								<div>
									<p className='font-semibold text-lg'>{appointment?.doctorName}</p>
									<p className='text-gray-600'>{appointment?.specialization}</p>
								</div>
							</div>
						</div>

						<div className='bg-gray-50 p-4 rounded-lg'>
							<div className='flex items-center space-x-3'>
								<MapPin className='h-5 w-5 text-primary' />
								<div>
									<p className='font-semibold'>{appointment?.clinicName}</p>
									<p className='text-gray-600'>{appointment?.clinicAddress}</p>
								</div>
							</div>
						</div>

						<div className='bg-gray-50 p-4 rounded-lg'>
							<div className='flex items-center space-x-3'>
								<Phone className='h-5 w-5 text-primary' />
								<p className='font-medium'>{appointment?.phoneNumber}</p>
							</div>
						</div>

						{user?.role === 'user' && (
							<div className='bg-primary/10 p-4 rounded-lg space-y-2'>
								<p className='font-semibold text-lg text-primary'>
									Amount Paid: ₹{appointment?.totalAmount}
								</p>
								<p className='font-medium text-gray-700'>
									Doctor Fees: ₹{appointment?.doctorFee}
								</p>
							</div>
						)}

						{user?.role === 'clinic' && (
							<div className='bg-primary/10 p-4 rounded-lg'>
								<p className='font-semibold text-lg text-primary'>
									Commission Amount: ₹{appointment?.bookingCommission}
								</p>
							</div>
						)}
					</div>
				</CardContent>
				<CardFooter className='p-6 pt-0'>
					<Button 
						onClick={onClose} 
						className='w-full bg-gradient-to-r from-primary to-blue-600 text-white hover:opacity-90'
					>
						Close
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
