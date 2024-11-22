import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Hero() {
  return (
    <div className='flex flex-col  justify-center items-center my-20'>
        <div className='hidden lg:block'>
            <Image src='/profile4.png' width={100} height={100}
            className='h-[100px] object-cover rounded-full absolute right-16 bottom-32'/>
        </div>
        <div className='text-center max-w-3xl'>
            <h2 className='font-bold text-[60px] text-slate-700 '>Lorem epsum </h2>
            <h2 className='text-xl mt-5 text-slate-500'>Lorem ipsum dolor, sit amet consectetur 
            adipisicing elit. Cumque labore veniam quia assumenda minus neque eum numquam ab odio 
            voluptatibus ipsam officia rem, vitae eaque, aut impedit, quis sunt reiciendis.
            </h2>
            <div className='flex gap-4 flex-col mt-5'>
                <h3> Sign up with the college domain</h3>
                <div className=' flex justify-center gap-8'>
                    <Button className ="p-7 flex gap-4"><Image src='/email.png' alt='mail ' width={30} height = {30}/> Sign in with E-mail </Button>
                    <Button className ="p-7 flex gap-4"><Image src='/email.png' alt='mail ' width={30} height = {30}/>  Sign in as Institution </Button>
                </div>
                <hr />
                <h2><Link href = '' className = "text-primary">Register college For free .</Link></h2>
            </div>
        </div>
    </div>
  )
}

export default Hero