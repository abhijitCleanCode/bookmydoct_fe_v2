'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'
import useAuthStore from '@/zustandStore/authStore'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/Container'
import { NavLink } from '@/components/ui/NavLink'
import Image from 'next/image'
import {   Calendar, Calendar1, LogOut, Menu, Plus, TestTube, TestTube2, User, User2 } from 'lucide-react'
import { Avatar, AvatarFallback } from './avatar'

import { useRouter } from 'next/navigation'

function MobileNavLink({ href, children }) {
  return (
    <PopoverButton as={Link} href={href} className="w-full p-2 flex items-center gap-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }) {
  return open ? <Plus className=' rotate-45'/>  : <Menu size={24} />
}

function MobileNavigation() {
  const {user}= useAuthStore();
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 ring-1 shadow-xl ring-slate-900/5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
      >
        <MobileNavLink href="/aboutUs">About us</MobileNavLink>
        <MobileNavLink href="/bookLabTest">Book Lab Test</MobileNavLink>
        {!user && <>
                <hr className="m-2 border-slate-300/40" />

        <MobileNavLink href="/login/user">Sign in</MobileNavLink>
        </>}
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
    const router = useRouter();
    const { user, logout } = useAuthStore();
  return (
    <header className="py-4">
      <Container className={'lg:px-0'}>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-5">
            <Link className='flex items-center max-md:justify-center' href='/'>
					<Image 
						src={'/logo.svg'} 
						width={100}
						height={40}
						alt='logo' 
						priority
						className='w-auto h-[65px]'
					/>
				</Link>
            <div className="hidden md:flex md:gap-x-4">
              <NavLink href="/aboutUs">About Us</NavLink>
              <NavLink href="/labTest">Book Lab Test</NavLink>
            </div>
          </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
            {user ? 
              <>
              <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden"
        aria-label="Toggle Navigation"
      >
        <Avatar
									className='cursor-pointer'
								>
									<AvatarFallback>
										<User className='text-primary'/>
									</AvatarFallback>
								</Avatar>
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 ring-1 shadow-xl ring-slate-900/5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
      >    
        <MobileNavLink href={`${user && user?.role == "user" ? '/profile' : user?.role == "clinic" ? '/clinicAdmin/doctors' : "/admin" }`}><User2/>{user?.role == 'user' ? "Profile" : "Admin Panel"}</MobileNavLink>
        {
          user?.role == 'user' && <>
          <hr className="m-2 border-slate-300/40" />
          <MobileNavLink href="/myAppointments"> <Calendar1/> My Appointments</MobileNavLink>
          <hr className="m-2 border-slate-300/40" />
          <MobileNavLink href="/bookedLabTest"> <TestTube2/> My lab test bookings</MobileNavLink>
          </>
        }
        <hr className="m-2 border-slate-300/40" />
        <PopoverButton onClick={async()=>{
          await logout();
          router.replace('/');
        }} className={"flex w-full p-2 items-center gap-3 text-red-600"}>
          <LogOut/> Log Out
        </PopoverButton>
      </PopoverPanel>
    </Popover>
					</>
            : <><div className="hidden md:block">
              <NavLink href="/login/user" className={"hover:text-slate-900"} >Sign in</NavLink>
            </div>
            <Button href="/register/user" color="primary">
              <span >
                Get started
              </span>
            </Button></>}
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
