'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

import Container from "@/components/Container";

type SettingsProps = {
  id: string
}

const UserSettings = ({ id }: SettingsProps) => {
  const [user]  = useDocumentData(doc(db, 'users', id)) 
  const currentUser = auth.currentUser 
  const router = useRouter()
  const toast = useToast()
  
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      displayName: user?.displayName,
      email: user?.email,
      password: user?.password,
      gender: user?.gender,
      region: user?.region
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      updateEmail(currentUser!, data.email)
      updatePassword(currentUser!, data.password)
      updateProfile(currentUser!, { displayName: data.displayName })

      setDoc(doc(db, 'users', id), {
        editedAt: Timestamp.now().toDate()
      })

      router.push(`/profile/${id}`)
      toast({ position: 'top', status: 'success', title: 'Profile saved'})
      
    } catch (error: any) {
      const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);     
    }
  }


  return (
    <Container bground>
      <div className="hidden sm:flex sm:flex-col xl:flex-row sm:w-full lg:w-[1180px] gap-6">
        <div className=" flex flex-col w-full mx-auto space-y-4">
          <div className="sm:w-full lg:w-[832px] bg-white px-4 pt-4 rounded-[4px]">

          </div>
        </div>
      </div>
    </Container>
  );
}

export default UserSettings;