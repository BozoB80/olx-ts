'use client'

import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";


const LoginModal = () => {
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

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        
        router.push('/')
        loginModal.onClose()
        router.refresh()
        toast.success(`Welcome ${user.displayName}`)      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Welcome back"
        subtitle="Login to your account"
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
    </div>
  )

  const footerContent = (
    <div className="flex justify-center items-center">
      <div 
        className="text-neutral-500 text-center mt-4 font-light"
      >
        <p>No user account?
          <span 
            onClick={onToggle} 
            className="text-neutral-800 font-medium cursor-pointer hover:underline"
            > Register
          </span>
        </p>
      </div>

    </div>
  )

  return (
    <Modal 
      disabled={isLoading}    
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}


export default LoginModal;