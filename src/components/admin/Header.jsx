'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import { Container } from '@/components/ui/Container'

import { NavLink } from '@/components/ui/NavLink'
import Image from 'next/image'
import {   LogOutIcon, Menu, Plus } from 'lucide-react'
import useAuthStore from '@/zustandStore/authStore'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

function MobileNavLink({ href, children }) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }) {
  return open ? <Plus className=' rotate-45'/>  : <Menu size={24} />
}

function MobileNavigation() {
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
        <MobileNavLink href="/admin/commissions">Commisions</MobileNavLink>
        <MobileNavLink href="/admin/verifyClinics">Verify Clinics</MobileNavLink>
        <MobileNavLink href="/admin/settings">Settings</MobileNavLink>
        <MobileNavLink href="/admin/specializations">Specializations</MobileNavLink>
        <hr className="m-2 border-slate-300/40" />
        <MobileNavLink href="/login">Sign out</MobileNavLink>
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
  const {logout} = useAuthStore();
  const router = useRouter();
  return (
    <header className="py-4">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
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
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="/admin/commissions">Commissions</NavLink>
              <NavLink href="/admin/verifyClinics">Verify Clinics</NavLink>
              <NavLink href="/admin/settings">Settings</NavLink>
              <NavLink href="/admin/specializations">Specializations</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <Button onClick={async()=>{
                await logout();
                router.replace("/");
              }} className={"hover:text-slate-900 flex items-center gap-2 border p-2"} >Sign out <LogOutIcon/></Button>
            </div>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
