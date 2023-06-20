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
}

const MessageFooter: React.FC<FooterProps> = ({ senderRef, receiverRef }) => {
  const [user] = useAuthState(auth)
  const userId = user?.uid

  const [isLoading, setIsLoading] = useState(false)
  const [receiver, setReceiver] = useState<DocumentData | null>(null)
  const messageModal = useMessageModal()
  const loginModal = useLoginModal()
  const toast = useToast()
  
  const senderName = auth?.currentUser?.displayName  
  const receiverName = receiver?.displayName  
  const title = messageModal?.details?.title
  const price = messageModal?.details?.price
  const productId = messageModal?.details?.id
  const imageURL = messageModal?.details?.imageURL

   

  useEffect(() => {
    async function getContact() {
      if (receiverRef) {
        const docRef = doc(db, "users", receiverRef);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setReceiver(docSnap.data());
        } else {
          console.error("Could not get receiver data");
        }
      }
    }
    getContact();
  }, [receiverRef])

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      text: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!receiverRef) {
      loginModal.onOpen()
      return;
    }
    setIsLoading(true)

    const replyInitialReceiverRef = receiverRef === userId ? collection(db, 'users', receiverRef, 'conversations', productId, 'messages') : null;
    const replyInitialSenderRef = senderRef === userId ? collection(db, 'users', senderRef, 'conversations', productId, 'messages') : null;

    try {
      // await addDoc(replyInitialReceiverRef, {
      //   ["sentMessage"]: data.text,
      //   createdAt: Timestamp.now()
      // });
  
      // await addDoc(replyInitialSenderRef, {
      //   ["receivedMessage"]: data.text,
      //   createdAt: Timestamp.now()
      // });
  
      setIsLoading(false);
      toast({ position: 'top', status: 'success', title: 'Message sent' });
      messageModal.onClose()
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