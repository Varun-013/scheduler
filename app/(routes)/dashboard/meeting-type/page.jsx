import { Input } from '@/components/ui/input'
import React from 'react'
import MeetingEvent from './_components/MeetingEvent'

function MeetingType() {
  
  return (
    <div className='p-5'>
      <div className='flex flex-col gap-5'>
        <h2 className='font-bold text-3xl'>Meeting Events</h2>
        <Input placeholder="search" className="max-w-xs"/>
        <hr />
      </div>
      <MeetingEvent/>
    </div>
  )
}

export default MeetingType