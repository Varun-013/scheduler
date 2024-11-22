// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { CalendarCheck, Clock, LoaderIcon, MapPin, Timer, CheckCircle } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import TimeDateSelection from "./TimeDateSelection";
// import UserFormInfo from "./UserFormInfo";
// import {
//   collection,
//   doc,
//   getDocs,
//   getFirestore,
//   query,
//   setDoc,
//   where,
// } from "firebase/firestore";
// import { app } from "@/config/FirebaseConfig";
// import { toast } from "sonner";
// import "./MeetingTimeDateSelection.css"; // Import CSS for the rotation animation

// function MeetingTimeDateSelection({ eventInfo, businessInfo }) {
//   const [date, setDate] = useState(new Date());
//   const [timeSolts, setTimeSlots] = useState();
//   const [enableTimeSlot, setEnableTimesSolt] = useState();
//   const [selectedTime, setSelectedTime] = useState();
//   const [step, setStep] = useState(1);
//   const [userName, setUserName] = useState();
//   const [userEmail, setUserEmail] = useState();
//   const [userNote, setUserNote] = useState();
//   const [prevBooking, setPrevBooking] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false); // Track scheduling success

//   const db = getFirestore(app);

//   useEffect(() => {
//     eventInfo?.duration && createTimeSlot(eventInfo?.duration);
//   }, [eventInfo]);

//   const createTimeSlot = (interval) => {
//     const startTime = 8 * 60; // 8 AM in minutes
//     const endTime = 22 * 60; // 10 PM in minutes
//     const totalSlots = (endTime - startTime) / interval;
//     const slots = Array.from({ length: totalSlots }, (_, i) => {
//       const totalMinutes = startTime + i * interval;
//       const hours = Math.floor(totalMinutes / 60);
//       const minutes = totalMinutes % 60;
//       const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
//       const period = hours >= 12 ? "PM" : "AM";
//       return `${String(formattedHours).padStart(2, "0")}:${String(
//         minutes
//       ).padStart(2, "0")} ${period}`;
//     });
//     setTimeSlots(slots);
//   };
//   const handleDateChange = (date) => {
//     if (date && !isNaN(date)) {
//         console.log("Date Selected:", date);
//       // Other logic for handling the date...
//         setDate(date);
//         const day = format(date, "EEEE");
//         if (businessInfo?.daysAvailable?.[day]) {
//           getPrevEventBooking(date);
//           setEnableTimesSolt(true);
//         } else {
//           setEnableTimesSolt(false);
//         }
//     }else{
//       console.warn("Invalid Date Selected:", date);
//     }
//   };

//   const handleScheduleEvent = async () => {
//     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     if (!regex.test(userEmail)) {
//       toast("Enter valid email address");
//       return;
//     }
//     const docId = Date.now().toString();
//     setLoading(true);
//     await setDoc(doc(db, "ScheduleMeetings", docId), {
//       businessName: businessInfo.businessName,
//       businessEmail: businessInfo.email,
//       selectedTime: selectedTime,
//       selectedDate: date,
//       formatedDate: format(date, "PPP"),
//       formatedTimeStamp: format(date, "t"),
//       duration: eventInfo.duration,
//       locationUrl: eventInfo.locationUrl,
//       eventId: eventInfo.id,
//       id: docId,
//       userName: userName,
//       userEmail: userEmail,
//       userNote: userNote,
//     }).then(() => {
//       setLoading(false);
//       setSuccess(true); // Set success to true after successful scheduling
//       toast("Meeting scheduled successfully!");
//     });
//   };

//   const getPrevEventBooking = async (date_) => {
//     const q = query(
//       collection(db, "ScheduleMeetings"),
//       where("selectedDate", "==", date_),
//       where("eventId", "==", eventInfo.id)
//     );

//     const querySnapshot = await getDocs(q);
//     setPrevBooking([]);
//     querySnapshot.forEach((doc) => {
//       console.log("--", doc.data());
//       setPrevBooking((prev) => [...prev, doc.data()]);
//     });
//   };

//   return (
//     <div
//       className={`p-5 py-10 shadow-lg m-5 border-t-8 
//     mx-10
//     md:mx-26
//     lg:mx-56
//     my-10 ${success ? "rotate-animation" : ""}`} // Apply rotation animation on success
//       style={{ borderTopColor: eventInfo?.themeColor }}
//     >
//       <Image src="/logo.svg" alt="logo" width={150} height={150} />
//       <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
//         {/* meeting info */}
//         <div className="p-4 border-r">
//           <h2>Name: {businessInfo?.businessName}</h2>
//           <h2 className="font-bold text-2xl">
//             {eventInfo?.eventName ? eventInfo?.eventName : "General Session"}
//           </h2>
//           <div className="mt-5 flex flex-col gap-4">
//             <h2 className="flex gap-2 font-medium">
//               <Clock />
//               {eventInfo?.duration} Min
//             </h2>
//             <h2 className="flex gap-2 font-medium">
//               <MapPin />
//               {eventInfo?.locationType} Meeting
//             </h2>
//             <h2 className="flex gap-2 font-medium">
//               <CalendarCheck /> {date instanceof Date && !isNaN(date) ? format(date, "PPP") : "Invalid Date"}
//             </h2>
//             {selectedTime && (
//               <h2 className="flex gap-2 font-medium">
//                 <Timer /> {selectedTime}
//               </h2>
//             )}
//             <Link
//               href={eventInfo?.locationUrl ? eventInfo.locationUrl : "#"}
//               className="text-primary"
//             >
//               {eventInfo?.locationUrl}
//             </Link>
//           </div>
//         </div>
//         {/* Time and date selection */}
//         {step == 1 ? (
//           <TimeDateSelection
//             date={date}
//             enableTimeSlot={enableTimeSlot}
//             handleDateChange={handleDateChange}
//             timeSolts={timeSolts}
//             setSelectedTime={setSelectedTime}
//             selectedTime={selectedTime}
//             prevBooking={prevBooking}
//           />
//         ) : (
//           <UserFormInfo
//             setUserName={setUserName}
//             setUserEmail={setUserEmail}
//             setUserNote={setUserNote}
//           />
//         )}
//       </div>

//       <div className="flex gap-3 justify-end">
//         {step == 2 && (
//           <Button variant="outline" onClick={() => setStep(1)}>
//             Back
//           </Button>
//         )}
//         {step == 1 ? (
//           <Button
//             className="mt-10 float-right"
//             disabled={!selectedTime || !date}
//             onClick={() => setStep(step + 1)}
//           >
//             Next
//           </Button>
//         ) : (
//           <Button
//             disabled={!userEmail || !userName}
//             onClick={handleScheduleEvent}
//           >
//             {loading ? (
//               <LoaderIcon className="animate-spin" />
//             ) : success ? (
//               <CheckCircle className="text-green-500" />
//             ) : (
//               "Schedule"
//             )}
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MeetingTimeDateSelection;
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { CalendarCheck, Clock, LoaderIcon, MapPin, Timer, CheckCircle } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import TimeDateSelection from "./TimeDateSelection";
// import UserFormInfo from "./UserFormInfo";
// import {
//   collection,
//   doc,
//   getDocs,
//   getFirestore,
//   query,
//   setDoc,
//   where,
// } from "firebase/firestore";
// import { app } from "@/config/FirebaseConfig";
// import { toast } from "sonner";
// import "./MeetingTimeDateSelection.css"; // Import CSS for the rotation animation
// import "./styles.css"; // Import additional styles for celebrations

// function MeetingTimeDateSelection({ eventInfo, businessInfo }) {
//   const [date, setDate] = useState(new Date());
//   const [timeSolts, setTimeSlots] = useState();
//   const [enableTimeSlot, setEnableTimesSolt] = useState();
//   const [selectedTime, setSelectedTime] = useState();
//   const [step, setStep] = useState(1);
//   const [userName, setUserName] = useState();
//   const [userEmail, setUserEmail] = useState();
//   const [userNote, setUserNote] = useState();
//   const [prevBooking, setPrevBooking] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false); // Track scheduling success

//   const db = getFirestore(app);

//   useEffect(() => {
//     eventInfo?.duration && createTimeSlot(eventInfo?.duration);
//   }, [eventInfo]);

//   const createTimeSlot = (interval) => {
//     const startTime = 8 * 60; // 8 AM in minutes
//     const endTime = 22 * 60; // 10 PM in minutes
//     const totalSlots = (endTime - startTime) / interval;
//     const slots = Array.from({ length: totalSlots }, (_, i) => {
//       const totalMinutes = startTime + i * interval;
//       const hours = Math.floor(totalMinutes / 60);
//       const minutes = totalMinutes % 60;
//       const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
//       const period = hours >= 12 ? "PM" : "AM";
//       return `${String(formattedHours).padStart(2, "0")}:${String(
//         minutes
//       ).padStart(2, "0")} ${period}`;
//     });
//     setTimeSlots(slots);
//   };

//   const handleDateChange = (date) => {
//     if (date && !isNaN(date)) {
//       console.log("Date Selected:", date);
//       setDate(date);
//       const day = format(date, "EEEE");
//       if (businessInfo?.daysAvailable?.[day]) {
//         getPrevEventBooking(date);
//         setEnableTimesSolt(true);
//       } else {
//         setEnableTimesSolt(false);
//       }
//     } else {
//       console.warn("Invalid Date Selected:", date);
//     }
//   };

//   const handleScheduleEvent = async () => {
//     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     if (!regex.test(userEmail)) {
//       toast("Enter valid email address");
//       return;
//     }
//     const docId = Date.now().toString();
//     setLoading(true);
//     await setDoc(doc(db, "ScheduleMeetings", docId), {
//       businessName: businessInfo.businessName,
//       businessEmail: businessInfo.email,
//       selectedTime: selectedTime,
//       selectedDate: date,
//       formatedDate: format(date, "PPP"),
//       formatedTimeStamp: format(date, "t"),
//       duration: eventInfo.duration,
//       locationUrl: eventInfo.locationUrl,
//       eventId: eventInfo.id,
//       id: docId,
//       userName: userName,
//       userEmail: userEmail,
//       userNote: userNote,
//     }).then(() => {
//       setLoading(false);
//       setSuccess(true); // Set success to true after successful scheduling
//       toast("Meeting scheduled successfully!");
//     });
//   };

//   const getPrevEventBooking = async (date_) => {
//     const q = query(
//       collection(db, "ScheduleMeetings"),
//       where("selectedDate", "==", date_),
//       where("eventId", "==", eventInfo.id)
//     );

//     const querySnapshot = await getDocs(q);
//     setPrevBooking([]);
//     querySnapshot.forEach((doc) => {
//       console.log("--", doc.data());
//       setPrevBooking((prev) => [...prev, doc.data()]);
//     });
//   };

//   return (
//     <div
//       className={`p-5 py-10 shadow-lg m-5 border-t-8 
//       mx-10 md:mx-26 lg:mx-56 my-10 ${success ? "rotate-animation" : ""}`} // Apply rotation animation on success
//       style={{ borderTopColor: eventInfo?.themeColor }}
//     >
//       <Image src="/logo.svg" alt="logo" width={150} height={150} />
//       <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
//         {/* meeting info */}
//         <div className="p-4 border-r">
//           <h2>Name: {businessInfo?.businessName}</h2>
//           <h2 className="font-bold text-2xl">
//             {eventInfo?.eventName ? eventInfo?.eventName : "General Session"}
//           </h2>
//           <div className="mt-5 flex flex-col gap-4">
//             <h2 className="flex gap-2 font-medium">
//               <Clock />
//               {eventInfo?.duration} Min
//             </h2>
//             <h2 className="flex gap-2 font-medium">
//               <MapPin />
//               {eventInfo?.locationType} Meeting
//             </h2>
//             <h2 className="flex gap-2 font-medium">
//               <CalendarCheck />
//               {date instanceof Date && !isNaN(date) ? format(date, "PPP") : "Invalid Date"}
//             </h2>
//             {selectedTime && (
//               <h2 className="flex gap-2 font-medium">
//                 <Timer /> {selectedTime}
//               </h2>
//             )}
//             <Link
//               href={eventInfo?.locationUrl ? eventInfo.locationUrl : "#"}
//               className="text-primary"
//             >
//               {eventInfo?.locationUrl}
//             </Link>
//           </div>
//         </div>
//         {/* Time and date selection */}
//         {step === 1 ? (
//           <TimeDateSelection
//             date={date}
//             enableTimeSlot={enableTimeSlot}
//             handleDateChange={handleDateChange}
//             timeSolts={timeSolts}
//             setSelectedTime={setSelectedTime}
//             selectedTime={selectedTime}
//             prevBooking={prevBooking}
//           />
//         ) : (
//           <UserFormInfo
//             setUserName={setUserName}
//             setUserEmail={setUserEmail}
//             setUserNote={setUserNote}
//           />
//         )}
//       </div>

//       <div className="flex gap-3 justify-end">
//         {step === 2 && (
//           <Button variant="outline" onClick={() => setStep(1)}>
//             Back
//           </Button>
//         )}
//         {step === 1 ? (
//           <Button
//             className="mt-10 float-right"
//             disabled={!selectedTime || !date}
//             onClick={() => setStep(step + 1)}
//           >
//             Next
//           </Button>
//         ) : (
//           <Button
//             disabled={!userEmail || !userName}
//             onClick={handleScheduleEvent}
//           >
//             {loading ? (
//               <LoaderIcon className="animate-spin" />
//             ) : success ? (
//               <CheckCircle className="text-green-500" />
//             ) : (
//               "Schedule"
//             )}
//           </Button>
//         )}
//       </div>

//       {/* Celebration Component */}
//       {success && (
//         <div className="celebration">
//           <div className="confetti"></div>
//           <div className="rotate-animation">
//             <Image src="/path/to/your/image.png" alt="Celebration" width={100} height={100} />
//           </div>
//           <div className="confetti"></div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MeetingTimeDateSelection;
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarCheck, Clock, LoaderIcon, MapPin, Timer, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeDateSelection from "./TimeDateSelection";
import UserFormInfo from "./UserFormInfo";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { toast } from "sonner";
import "./MeetingTimeDateSelection.css"; // Import CSS for the rotation animation

function MeetingTimeDateSelection({ eventInfo, businessInfo }) {
  const [date, setDate] = useState(new Date());
  const [timeSolts, setTimeSlots] = useState();
  const [enableTimeSlot, setEnableTimesSolt] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userNote, setUserNote] = useState();
  const [prevBooking, setPrevBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Track scheduling success

  const db = getFirestore(app);

  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo]);

  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; // 8 AM in minutes
    const endTime = 22 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });
    setTimeSlots(slots);
  };

  const handleDateChange = (date) => {
    if (date && !isNaN(date)) {
      console.log("Date Selected:", date);
      // Other logic for handling the date...
      setDate(date);
      const day = format(date, "EEEE");
      if (businessInfo?.daysAvailable?.[day]) {
        getPrevEventBooking(date);
        setEnableTimesSolt(true);
      } else {
        setEnableTimesSolt(false);
      }
    } else {
      console.warn("Invalid Date Selected:", date);
    }
  };

  const handleScheduleEvent = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(userEmail)) {
      toast("Enter valid email address");
      return;
    }
    const docId = Date.now().toString();
    setLoading(true);
    await setDoc(doc(db, "ScheduleMeetings", docId), {
      businessName: businessInfo.businessName,
      businessEmail: businessInfo.email,
      selectedTime: selectedTime,
      selectedDate: date,
      formatedDate: format(date, "PPP"),
      formatedTimeStamp: format(date, "t"),
      duration: eventInfo.duration,
      locationUrl: eventInfo.locationUrl,
      eventId: eventInfo.id,
      id: docId,
      userName: userName,
      userEmail: userEmail,
      userNote: userNote,
    }).then(() => {
      setLoading(false);
      setSuccess(true); // Set success to true after successful scheduling
      toast("Meeting scheduled successfully!");
    });
  };

  const getPrevEventBooking = async (date_) => {
    const q = query(
      collection(db, "ScheduleMeetings"),
      where("selectedDate", "==", date_),
      where("eventId", "==", eventInfo.id)
    );

    const querySnapshot = await getDocs(q);
    setPrevBooking([]);
    querySnapshot.forEach((doc) => {
      console.log("--", doc.data());
      setPrevBooking((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <div
      className={`p-5 py-10 shadow-lg m-5 border-t-8 mx-10 md:mx-26 lg:mx-56 my-10 ${success ? "rotate-animation" : ""}`} // Apply rotation animation on success
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      {success && (
        <div className="celebration">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="confetti"></div> // Create confetti elements
          ))}
        </div>
      )}
      <Image src="/logo.svg" alt="logo" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* meeting info */}
        <div className="p-4 border-r">
          <h2>Name: {businessInfo?.businessName}</h2>
          <h2 className="font-bold text-2xl">
            {eventInfo?.eventName ? eventInfo?.eventName : "General Session"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2 font-medium">
              <Clock />
              {eventInfo?.duration} Min
            </h2>
            <h2 className="flex gap-2 font-medium">
              <MapPin />
              {eventInfo?.locationType} Meeting
            </h2>
            <h2 className="flex gap-2 font-medium">
              <CalendarCheck /> {date instanceof Date && !isNaN(date) ? format(date, "PPP") : "Invalid Date"}
            </h2>
            {selectedTime && (
              <h2 className="flex gap-2 font-medium">
                <Timer /> {selectedTime}
              </h2>
            )}
            <Link
              href={eventInfo?.locationUrl ? eventInfo.locationUrl : "#"}
              className="text-primary"
            >
              {eventInfo?.locationUrl}
            </Link>
          </div>
        </div>
        {/* Time and date selection */}
        {step === 1 ? (
          <TimeDateSelection
            date={date}
            enableTimeSlot={enableTimeSlot}
            handleDateChange={handleDateChange}
            timeSolts={timeSolts}
            setSelectedTime={setSelectedTime}
            selectedTime={selectedTime}
            prevBooking={prevBooking}
          />
        ) : (
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>

      <div className="flex gap-3 justify-end">
        {step === 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step === 1 ? (
          <Button
            className="mt-10 float-right"
            disabled={!selectedTime || !date}
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={!userEmail || !userName}
            onClick={handleScheduleEvent}
          >
            {loading ? (
              <LoaderIcon className="animate-spin" />
            ) : success ? (
              <CheckCircle className="text-green-500" />
            ) : (
              "Schedule"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default MeetingTimeDateSelection;
