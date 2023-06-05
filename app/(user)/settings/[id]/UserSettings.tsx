'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { deleteUser, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast, Button as ButtonAlert } from "@chakra-ui/react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, useDisclosure } from "@chakra-ui/react";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { genders, regions } from "@/utils/selectData";
import FormInput from "@/components/ads/publishForms/inputs/FormInput";
import FormSelect from "@/components/ads/publishForms/inputs/FormSelect";
import { useEffect, useRef } from "react";
import FormButton from "@/components/ads/publishForms/inputs/FormButton";
import Button from "@/components/Button";
import { TrashIcon } from "@heroicons/react/24/outline";

type SettingsProps = {
  id: string
}

const UserSettings = ({ id }: SettingsProps) => {
  const currentUser = auth.currentUser 
  const [user]  = useDocumentData(currentUser && doc(db, 'users', id)) 
  const router = useRouter()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null);
  const leastDestructiveRef = useRef<HTMLButtonElement>(null);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FieldValues>({
    defaultValues: {
      displayName: currentUser?.displayName,
      email: currentUser?.email,      
    }
  })

  useEffect(() => {
    if (user) {
      setValue('name', user?.name);
      setValue('lastname', user?.lastname);
      setValue('displayName', user?.displayName);
      setValue('phone', user?.phone);
      setValue('email', user?.email);
      setValue('gender', user?.gender);
      setValue('region', user?.region);
    }
  }, [user, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (currentUser) {
      updateEmail(currentUser!, data.email)
      updatePassword(currentUser!, data.password)
      updateProfile(currentUser!, { displayName: data.displayName })

      await updateDoc(doc(db, 'users', id), {
        ...data,
        editedAt: Timestamp.now().toDate()
      })

      router.push(`/profile/${id}`)
      toast({ position: 'top', status: 'success', title: 'Profile saved'})
      }
    } catch (error: any) {
      const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);     
    }
  }


  const handleDelete = async () => {
    try {
      if (currentUser) {
      await deleteUser(currentUser)
        deleteDoc(doc(db, 'users', id))
        onClose()
        router.push('/')
        toast({ position: 'top', status: 'success', title: 'User deleted'})
      }
    } catch (error) {
      console.log(error); 
    }
  }


  return (
    <Container bground>
      <div className="flex sm:flex-col xl:flex-row w-full lg:w-[1180px] gap-6">
        <div className=" flex flex-col justify-center items-center w-full mx-auto space-y-4">
          <div className="w-full lg:w-[832px] bg-white px-4 py-4 rounded-[4px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
                <Heading 
                  title="User information"
                />
                <hr />
                <FormInput 
                  id="name"
                  label="Name"
                  register={register}
                  errors={errors}
                  required
                />
                <FormInput 
                  id="lastname"
                  label="Last Name"
                  register={register}
                  errors={errors}
                  required
                />
                <FormInput 
                  id="displayName"
                  label="Your OLX Name"
                  register={register}
                  errors={errors}
                  required
                />
                <FormInput 
                  id="phone"
                  label="Phone number"
                  register={register}
                  errors={errors}
                  required
                />
                <FormInput 
                  id="email"
                  label="Email"
                  register={register}
                  errors={errors}
                  required
                />
                <FormSelect
                  id="gender"
                  label="Gender"
                  options={genders}
                  placeholder="Choose gender"
                  register={register}
                  required
                />      
                <FormSelect
                  id="region"
                  label="Region"
                  options={regions}
                  placeholder="Choose region"
                  register={register}
                  required
                />
                <FormButton 
                  label="Save changes"
                  type="submit"
                  dark
                />      
            </form>
            <>
              <Button 
                label="Delete Profile"
                icon={<TrashIcon className='w-6 h-6' />}
                className="bg-red-500 text-white my-6"
                onClick={onOpen}
              />

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={leastDestructiveRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Delete your profile?
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You cannot undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <ButtonAlert ref={cancelRef} onClick={onClose}>
                        Cancel
                      </ButtonAlert>
                      <ButtonAlert colorScheme='red' variant='outline' onClick={handleDelete} ml={3}>
                        Delete
                      </ButtonAlert>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default UserSettings;