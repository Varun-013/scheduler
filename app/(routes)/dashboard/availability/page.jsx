"use client";
import DaysList from "@/app/_utils/DaysList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Availability() {
  const [daysAvailable, setDaysAvailable] = useState(
    { Sunday: false },
    { Monday: false },
    { Tuesday: false },
    { Wednesday: false },
    { Thursday: false },
    { Friday: false },
    { Saturday: false }
  );
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    user && getBusinessInfo();
  }, [user]);

  const getBusinessInfo = async () => {
    const docRef = doc(db, "Business", user.email);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    setDaysAvailable(result.daysAvailable);
    setStartTime(result.startTime);
    setEndTime(result.endTime);
  };

  const onHandleChange = (day, value) => {
    setDaysAvailable((prevDaysAvailable) => ({
        ...prevDaysAvailable,
        [day]: value,
      }));
      console.log({ ...daysAvailable, [day]: value });
  };

  const handleSave = async () => {
    const docRef = doc(db, "Business", user?.email);
    await updateDoc(docRef, {
      daysAvailable: daysAvailable,
      startTime: startTime,
      endTime: endTime,
    }).then((resp) => {
        console.log(daysAvailable);
        toast("change updated !");
    });
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7" />
      <div>
        <h2 className="font-bold">Availabilty Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 my-4">
          {DaysList&&DaysList.map((item, index) => (
            <div key={index}>
              <h2>
                <Checkbox
                  className="mr-2"
                  checked={
                    daysAvailable&&daysAvailable[item.day] ? daysAvailable[item.day] : false
                  }
                  onCheckedChange={(e) => onHandleChange(item.day, e)}
                />
                {item.day}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold mt-10">Availabilty Time</h2>
        <div className="flex gap-10">
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input
              type="time"
              defaultValue={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h2>End Time</h2>
            <Input
              type="time"
              defaultValue={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button className="mt-10" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}

export default Availability;
