import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CalendarCheck, Clock, Timer } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


function ScheduledMeetingList({meetingList,type}) {
  return (
    <div>
      {meetingList.map((meeting , index)=>(
        <Accordion type="single" collapsible key = {index}>
          <AccordionItem value="item-1">
            <AccordionTrigger>{meeting?.formatedDate}</AccordionTrigger>
            <AccordionContent>
              <div className="mt-5 flex flex-col gap-4">
                <h2 className="flex gap-2 font-medium">
                  <Clock />
                  {meeting?.duration} Min
                </h2>
                <h2 className="flex gap-2 font-medium">
                  <CalendarCheck /> {meeting.formatedDate}
                </h2>
                <h2 className="flex gap-2 font-medium">
                  <Timer /> {meeting.selectedTime}
                </h2>
                {(type == 'upcoming')&&<div className='flex flex-col'>
                <Link href={meeting?.locationUrl?meeting.locationUrl:"#"} className="text-primary ">
                  {meeting?.locationUrl}
                </Link>
                <Link href={meeting.locationUrl} ><Button className='mt-2'>Join Now</Button></Link>
                </div>}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      
    </div>
  )
}

export default ScheduledMeetingList;