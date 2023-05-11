"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import padlock from "@/assets/padlock.svg";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { auth } from "@/firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-hot-toast";
import useResetModal from "@/hooks/useResetModal";
import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

const ResetPasswordModal = () => {
  const resetModal = useResetModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors} } = useForm<FieldValues>({
    defaultValues: {
      email: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        toast.success('Email has been sent')
        setIsLoading(false)
        resetModal.onClose()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  const toggle = useCallback(() => {
    resetModal.onClose();
    loginModal.onOpen();
  }, [loginModal, resetModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4 bg-white">
      <button onClick={toggle} className="w-full flex">
        <ChevronLeftIcon className="h-6 w-6" />
        <p>Back</p>
      </button>
      <div className="w-full flex justify-between">
        <Heading 
          title="You forgot your password?"
          subtitle="If you forgot your password, it is necessary to send a request for a new password. Please enter your email and we will send you a new reset code."
        />
        <Image
          src={padlock}
          alt="padlock"
          width={70}
          height={70}          
        />
      </div>
      <Input 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={resetModal.isOpen}
      title="Forgotten password"
      actionLabel="Reset password"
      onClose={resetModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default ResetPasswordModal;
