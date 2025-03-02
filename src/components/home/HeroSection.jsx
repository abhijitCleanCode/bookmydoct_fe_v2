"use client"

import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from '../ui/3d-card'
import { Select,SelectTrigger, SelectContent, SelectGroup,SelectItem, SelectValue } from '../ui/select'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Input } from '../ui/input'
import useAdminStore from '@/zustandStore/adminStore'
import {FaSearch, FaMapPin, FaMapMarkerAlt} from 'react-icons/fa'
import { userStore } from '@/zustandStore/userStore'
import {  useSearchParams } from 'next/navigation'



export function Hero({  setIsSearching, setSearchLoading, setSearchResults }) {
  const [searchOn, setSearchOn] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [city, setCity] = useState('');
  const { getCities, cities } = useAdminStore();
  const {search} = userStore();
  const params = useSearchParams();

  useEffect(() => {
        const specialization = params.get('specialization');
        if (specialization) {
            setSearchOn('specialization');
            setSearchQuery(specialization);
        }
    }, [])

  useEffect(() => {
        if (searchQuery || city || searchOn) {
            if (searchOn === 'none') {
                setIsSearching(false);
            } else {
                setIsSearching(true);
                setSearchLoading(true);
                search(city === "all" ? "" : city, searchOn, searchQuery).then((data) => {
                    if (searchOn === 'clinic') {
                        const clinics = data.map((clinic) => {
                            return {
                                id: clinic._id,
                                name: clinic?.name,
                                address: clinic?.address,
                                image: "/hospital.png",
                                role: 'clinic'
                            }
                        })
                        setSearchResults(clinics)
                        setSearchLoading(false);
                    } else {
                        const doctors = data.map((doctor) => {
                            return {
                                id: doctor._id,
                                name: doctor?.fullName,
                                specialization: doctor?.specialization,
                                image: "/doctor.png",
                               experience: doctor?.experience || 0,
                                qualification: doctor?.medicalDegree,
                                role: 'doctor'
                            }
                        })
                        setSearchResults(doctors)
                        setSearchLoading(false);

                    }
                }).catch((err) => {
                    console.log(err);
                    setIsSearching(false);
                    setSearchLoading(false);
                })
            }
        } else {
            setSearchResults([]);
            setIsSearching(false)
        }
    }, [searchQuery, city, searchOn])


  useLayoutEffect(() => {
    getCities();
  }, []);

  return (
    <>
    <div className="mt-20 md:mt-0 max-sm:w-screen text-center flex flex-col lg:flex-row gap-0 lg:gap-16 items-center">
    
      <div className='justify-self-start flex flex-col'>
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Find and Book the{' '}  
        <span className="relative whitespace-nowrap text-primary">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">Best Doctors</span>
        </span>{' '}
        Near You.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Get the care you need, when you need it.
      </p>
      <div className='mt-7'>
      <div className="w-full max-w-2xl mx-auto p-5 md:p-0">
            <div className="mx-auto flex flex-col gap-y-4 sm:gap-y-0 sm:flex-row gap-2 ">
                <div className="flex gap-2 w-full ">
                    <Select onValueChange={(value) => setCity(value)}>
                        <SelectTrigger className="p-2 w-[50%] bg-white text-black  ">
                            <FaMapMarkerAlt /><SelectValue className="w-fit text-black" placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                            <SelectGroup className="w-full">
                                <SelectItem value="all">All</SelectItem>
                                {cities?.map((city, idx) => <SelectItem key={idx} value={city}>{city}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setSearchOn(value)} value={searchOn}>
                        <SelectTrigger className="p-2 w-[50%] bg-white text-black  ">
                            <FaSearch /><SelectValue className="w-fit text-black" placeholder="Search" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black ">
                            <SelectGroup className="w-full">
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="doctor">Doctors</SelectItem>
                                <SelectItem value="clinic">Clinics</SelectItem>
                                <SelectItem value="specialization">Specialization</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Input id='search'
                    type='search'
                    placeholder='Doctor or Speciality or Clinic/Hospital name'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className=' p-2 pl-3 text-black' />
            </div>

        </div>
      </div>

      </div>
         <CardContainer className="py-0 p-5">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="/herosection.avif"
            height="1000"
            width="1000"
            className="h-96 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        
      </CardBody>
      </CardContainer>
    </div>
    <div className="absolute md:top-0 top-10 -z-10 w-full h-[130vh] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br  h-[700px] from-blue-100 to-primary rotate-45 translate-x-[55%] md:translate-x-[35%] translate-y-[40%] md:-translate-y-[12%]" />
    
                        </div>
    </>
  )
}
