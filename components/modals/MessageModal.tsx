'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useMessageModal from '../../hooks/useMessageModal';
import { auth, db } from '@/firebase/firebase';
import { DocumentData, Timestamp, doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import useLoginModal from '../../hooks/useLoginModal';
import { useToast } from '@chakra-ui/react';
import Heading from '../Heading';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import Textarea from '../inputs/Textarea';

const MessageModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [contact, setContact] = useState<DocumentData | null>(null)
  const messageModal = useMessageModal()
  const loginModal = useLoginModal()
  const toast = useToast()
  const uid = auth?.currentUser?.uid

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      text: '',
      createdAt: Timestamp,
      uid
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!uid) {
      loginModal.onOpen()
      return;
    }
    setIsLoading(true)

    await setDoc(doc(db, 'users', uid, 'privateMessage', uid), data)
    setIsLoading(false)
    toast({ position: 'top', status: 'success', title: 'Message sent'})
  }

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Heading title={`Message for `} />
      <div className="bg-[#eef6ff] p-2 flex items-center gap-3 rounded-md">
        <InformationCircleIcon className="w-6 h-6" />
        <p className="text-sm">Add: </p>   
      </div>
      <Textarea
        id='text'
        placeholder='Type your message'
        register={register}
        required
      />
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={messageModal.isOpen}
      title='Message this user'
      actionLabel='Send Message'
      onClose={messageModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}    
    />
  );
}

export default MessageModal;