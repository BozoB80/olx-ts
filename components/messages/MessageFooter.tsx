'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useMessageModal from '../../hooks/useMessageModal';
import { auth, db } from '@/firebase/firebase';
import { DocumentData, Timestamp, addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import useLoginModal from '../../hooks/useLoginModal';
import { useToast } from '@chakra-ui/react';
import { CameraIcon, FaceSmileIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Textarea from '../inputs/Textarea';
import logo from '@/assets/logo.svg'
import Image from 'next/image';
import Button from '../Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';

interface FooterProps {
  senderRef: string
  receiverRef: string
  conversationId: string
}

const MessageFooter: React.FC<FooterProps> = ({ senderRef, receiverRef, conversationId }) => {
  const [user] = useAuthState(auth)
  const userId = user?.uid  

  console.log(conversationId);
  

  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      text: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!userId) {
      return;
    }
    setIsLoading(true)

    const newSender = senderRef === userId ? senderRef : receiverRef
    const newReceiver = senderRef === userId ? receiverRef : senderRef


    const senderReplyRef = collection(db, 'users', newSender, 'conversations', conversationId, 'messages')
    const receiverReplyRef = collection(db, 'users', newReceiver, 'conversations', conversationId, 'messages')

    try {
      await addDoc(senderReplyRef, {
        ["sentMessage"]: data.text,
        createdAt: Timestamp.now()
      });
  
      await addDoc(receiverReplyRef, {
        ["receivedMessage"]: data.text,
        createdAt: Timestamp.now()
      });
  
      setIsLoading(false);
      toast({ position: 'top', status: 'success', title: 'Message sent' });
      setValue('text', '')
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      toast({ position: 'top', status: 'error', title: 'Failed to send message' });
    }
  }

  return (
    <div className='flex flex-col w-full p-4'>
      <form onSubmit={handleSubmit(onSubmit)}>        
        <Textarea
          id='text'
          placeholder='Write a message...'
          register={register}
          required
          />
        <div className='w-full flex justify-between items-center bg-white pt-4'>
          <div className='flex gap-4'>
            <FaceSmileIcon className='w-6 h-6 cursor-pointer' />
            <Image src={logo} alt='logo' width={40} height={40} className='cursor-pointer' />
            <CameraIcon className='w-6 h-6 cursor-pointer' />
            <InformationCircleIcon className='w-6 h-6 cursor-pointer' />
          </div>
          <Button type='submit' className='w-36' dark label='Send message' />
        </div>
      </form>
    </div>
  );
}

export default MessageFooter;