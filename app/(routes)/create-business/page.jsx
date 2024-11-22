"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Router } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function CreateBusiness() {
  const [businessName, setBusinessName] = useState();
  const db = getFirestore(app);
  const {user} = useKindeBrowserClient();
  const router = useRouter();
  const onCreateBusiness = async () => {
    console.log("btn Click" ,businessName);
    await setDoc(doc(db,'Business',user.email),{
        businessName:businessName,
        email:user.email,
        userName:user.given_name + " " +user.family_name
    }).then(resp =>{
        console.log("Document Saved");
        toast('sucessfully created');
        router.replace('./dashboard');
    })
  };
  return (
    <div className="p-14 items-center flex flex-col gap-20 my-10">
      <Image src="/logo.svg" width={200} height={200} alt="logo" />
      <div className="flex flex-col items-center gap-4 max-w-3xl">
        <h2 className="text-4xl font-bold">
          What is the name of the institution ?
        </h2>
        <p className="text-slate-400">
          you can always change this later from the settings
        </p>
        <div className="w-full">
          <label className="text-slate-400">Name</label>
          <Input
            placeholder="Ex. vnr vnjiet "
            className="mt-2"
            onChange={(event) => setBusinessName(event.target.value)}
          />
        </div>
        <Button
          className="w-full"
          disabled={!businessName}
          onClick={onCreateBusiness}
        >
          Create Institution
        </Button>
      </div>
    </div>
  );
}

export default CreateBusiness;
