'use client'

import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import { regions } from "@/utils/selectData";
import { genders } from "@/utils/selectData";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from '../../hooks/useLoginModal';


const RegisterModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const currentUser = auth.currentUser  

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      gender: '',
      region: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        if (currentUser) {
          updateProfile(currentUser, {
            displayName: data.displayName,
          })
        }
        const formDataCopy = { ...data }
        formDataCopy.createdAt = Timestamp.now().toDate()

        // Save to database
        setDoc(doc(db, "users", user.uid), formDataCopy)

        console.log(user)
        // router.push('/greetings')
        toast.success('Registration complete')
        registerModal.onClose()
        setIsLoading(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Welcome to OLX"
        subtitle="Create an account"
      />
      <Input 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="displayName"
        label="Your OLX Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Select
        id="gender"
        options={genders}
        placeholder="Choose gender"
        register={register}
        errors={errors}
        required
      />      
      <Select
        id="region"
        options={regions}
        placeholder="Choose region"
        register={register}
        errors={errors}
        required
      />      
    </div>
  )

  const footerContent = (
    <div className="flex justify-center items-center">
      <div 
        className="text-neutral-500 text-center mt-4 font-light"
      >
        <p>Already have an account?
          <span 
            onClick={onToggle} 
            className="text-neutral-800 font-medium cursor-pointer hover:underline"
            > Log in
          </span>
        </p>
      </div>

    </div>
  )

  return (
    <Modal 
      disabled={isLoading}    
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}


export default RegisterModal;