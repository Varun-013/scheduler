"use client";

import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import MeetingEvent from './_components/MeetingEvent';

function MeetingType() {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='p-5'>
      <div className='flex flex-col gap-5'>
        <h2 className='font-bold text-3xl'>Meeting Events</h2>
        <Input
          placeholder="Search"
          className="max-w-xs"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <hr />
      </div>
      <MeetingEvent searchTerm={searchTerm} />
    </div>
  );
}

export default MeetingType;
