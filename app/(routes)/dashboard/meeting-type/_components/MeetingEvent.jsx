"use client";
import React, { useEffect, useState } from "react";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy } from "firebase/firestore";
import { collection, query, where} from "firebase/firestore";
import { Clock, Copy, MapPin, Pen, Settings, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function MeetingEvent() {

  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [eventList, setEventList] = useState([]);
  const [businessInfo , setBusinessInfo] = useState();

  useEffect(() => {
    if (user) {
      getEventList();
      BusinessInfo();
    }
  }, [user]);

  const getEventList = async () => {
    try {
      setEventList([]);
      console.log("Fetching events for user:", user.email);
      const q = query(
        collection(db, "MeetingEvent"),
        where("createdBy", "==", user?.email),
        orderBy("id", "desc")
      );
      const querySnapshot = await getDocs(q);
      const events = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        events.push(doc.data());
      });
      setEventList(events);
    } catch (error) {
      console.error("error fetching events ", error);
    }
  };

  const BusinessInfo = async()=>{
    const docRef = doc(db , 'Business' , user.email);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    setBusinessInfo(docSnap.data());
  }

  const onDeleteMeetingEvent = async (event) => {
    try{
      await deleteDoc(doc(db, "MeetingEvent", event?.id)).then((resp) => {
        toast("meeting event deleted!");
        getEventList();
      });
    }catch(error){
      console.error('unable to delete event :' ,error)
    }
  };

  const onCopyClickHandler = (event)=>{
      const meetingEventUrl = process.env.NEXT_PUBLIC_BASE_URL+'/'+businessInfo.businessName +'/'+event.id
      navigator.clipboard.writeText(meetingEventUrl);;
      toast("Copied to clipboard");
  }

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

      {eventList.length > 0 ? (
        eventList?.map((event, index) => (

          <div
            key={index}
            className="border shadow-md border-t-8 rounded-lg p-5"
            style={{ borderTopColor: event?.themeColor }}
          >
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Settings className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex gap-2">
                    <Pen width={15} height={15} />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex gap-2"
                    onClick={() => onDeleteMeetingEvent(event)}
                  >
                    <Trash width={15} height={15} />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <h2 className="font-medium text-lg">{event?.eventName}</h2>

            <div className="flex gap-2 justify-between mt-1 ">
              <h2 className="flex gap-2 text-gray-500 ">
                <Clock /> {event.duration}
              </h2>
              <h2 className="flex gap-2  text-gray-500 ">
                <MapPin /> {event.locationType}
              </h2>
            </div>
            <hr className="m-1" />
            <div className="flex justify-between mt-2">
              <h2
                className="flex gap-2 text-sm text-primary 
              items-center cursor-pointer"
                onClick={() => {
                  onCopyClickHandler(event);
                }}
              >
                <Copy className="h-4 w-4" />
                copy link
              </h2>
              <Button
                variant="outline"
                className="border-primary rounded-full w-20 h-7 text-primary"
              >
                Share
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h2>Loading..contents</h2>
      )}
    </div>
  );
}

export default MeetingEvent;
