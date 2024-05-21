"use client"
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div>
        {/* logo name and button for login */}
        <div className='flex items-center justify-between p-5 shadow-sm'>
            <Image src='/logo.svg' width={100} height={100} alt='logo'
                className=' w - {150px} md: w-{200px}'
            />
            <ul className='hidden md:flex gap-14 font-medium text-lg'>
                <li className='hover:text-primary transition-all duration-300 cursor-pointer'>Performance</li>
                <li className='hover:text-primary transition-all duration-300 cursor-pointer'>Attendace</li>
                <li className='hover:text-primary transition-all duration-300 cursor-pointer'>student info</li>
            </ul>
            <div>
                <LoginLink><Button variant = "ghost"> Login </Button></LoginLink>
                <RegisterLink><Button> Get Started </Button></RegisterLink>
            </div>
        </div>
    </div>
  )
}

export default Header