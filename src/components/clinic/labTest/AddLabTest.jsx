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
import {  useState } from 'react';
import { Button } from '@/components/ui/Button';
import useClinicStore from '@/zustandStore/clinicStore';



export default function AddLabTest({ isAddDrawerOpen, setIsAddDrawerOpen, handleAddDoctor}) {
	const {  isLoading } = useClinicStore();
    const [labTest, setLabTest] = useState({
        name: '',
        description: '',
        price: '',
    });


	const handleInputChange = (e) => {
		setLabTest({
			...labTest,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
        try{
            await handleAddDoctor(labTest);
            setLabTest({
                name: '',
                description: '',
                price: '',
            })
        }catch(error){
            console.log(error)
        }  
	};

	return (
		<Sheet open={isAddDrawerOpen} onOpenChange={setIsAddDrawerOpen}>
			<SheetContent className="w-[600px] sm:min-w-[550px]">
				<SheetHeader className="border-b pb-4 mb-6">
					<SheetTitle className="text-2xl font-bold text-primary text-center">
						Add New Lab Test
					</SheetTitle>
				</SheetHeader>
				<ScrollArea className="h-[calc(100vh-100px)]">
					<div className="px-6">
						<form className="space-y-6">
							<div className="bg-gray-50 p-6 rounded-lg border border-gray-100 space-y-4">
								<div>
									<Label htmlFor="name" className="text-sm font-medium text-gray-700">
										Test Name *
									</Label>
									<Input
										id="name"
										name="name"
										placeholder="Enter lab test name"
										className="mt-1 bg-white"
										onChange={handleInputChange}
										value={labTest?.name}
									/>
								</div>

								<div>
									<Label htmlFor="description" className="text-sm font-medium text-gray-700">
										Description *
									</Label>
									<Input
										id="description"
										name="description" 
										placeholder="Enter test description"
										className="mt-1 bg-white h-24"
										onChange={handleInputChange}
										value={labTest?.description}
									/>
								</div>

								<div>
									<Label htmlFor="price" className="text-sm font-medium text-gray-700">
										Price (₹) *
									</Label>
									<div className="relative mt-1">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
										<Input
											id="price"
											name="price"
											type="number"
											placeholder="0.00"
											className="pl-8 bg-white"
											onChange={handleInputChange}
											value={labTest?.price}
										/>
									</div>
								</div>
							</div>

							<div className="flex justify-end gap-3 pt-4 border-t">
								<Button
									variant="outline"
									onClick={() => setIsAddDrawerOpen(false)}
									className="px-6"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									onClick={handleSubmit}
									disabled={isLoading}
									className="px-6 bg-primary hover:bg-primary/90"
								>
									{isLoading ? (
										<>
											<span className="animate-spin mr-2">⏳</span>
											Processing...
										</>
									) : (
										'Add Test'
									)}
								</Button>
							</div>
						</form>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
