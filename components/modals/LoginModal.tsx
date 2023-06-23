'use client'

import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useResetModal from "@/hooks/useResetModal";
import { Timestamp, doc, setDoc } from "firebase/firestore";


const LoginModal = () => {
  const router = useRouter()
  const toast = useToast()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const resetModal = useResetModal()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
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

        setDoc(doc(db, "users", user.uid), { 
          lastSignInTime: Timestamp.now().toDate()
        }, { merge: true })
        
        .then (() => {
          toast({ position: 'top', status: 'success', title: `Welcome ${user.displayName}`})
          setIsLoading(false)
          router.push('/')
          loginModal.onClose()
          reset()
        })
        .catch((error) => {
          // Error updating Firestore document
          console.error("Error updating Firestore document:", error);
        });
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast({ position: 'top', status: 'error', title: 'Wrong username or password' });
        setIsLoading(false)
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
      <div>
        <p 
          onClick={() => {loginModal.onClose(), resetModal.onOpen()}}
          className="text-neutral-800 text-right font-medium cursor-pointer hover:underline">
            Forgot password?
        </p>
      </div>
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
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}


export default LoginModal;