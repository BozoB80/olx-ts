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

const MessageFooter = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [receiver, setReceiver] = useState<DocumentData | null>(null)
  const [conversationNumber, setConversationNumber] = useState(1)
  const messageModal = useMessageModal()
  const loginModal = useLoginModal()
  const toast = useToast()
  const senderRef = auth?.currentUser?.uid 
  const receiverRef = messageModal?.details?.userRef
  const senderName = auth?.currentUser?.displayName  
  const receiverName = receiver?.displayName  
  const title = messageModal?.details?.title
  const price = messageModal?.details?.price
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
    if (!senderRef) {
      loginModal.onOpen()
      return;
    }
    setIsLoading(true)

    setConversationNumber(conversationNumber + 1);

    const senderListingData = doc(db, 'users', senderRef, 'conversations', `conversation${conversationNumber}`)
    const receiverListingData = doc(db, 'users', receiverRef, 'conversations', `conversation${conversationNumber}`)

    const senderConversationRef = collection(senderListingData, 'sentMessages');
    const receiverConversationRef = collection(receiverListingData, 'receivedMessages');

    const listingData = {
      createdAt: Timestamp.now(),
      senderName,
      receiverName,
      title,
    }

    const messageData = {
      ...data,
      senderRef,
      receiverRef,
      createdAt: Timestamp.now(),
      senderName,
      receiverName,
      title,
      price,
      imageURL
    };

    try {
      // Store the message in the sender's conversation
      await setDoc(senderListingData, listingData);
      await addDoc(senderConversationRef, messageData);
  
      // Store the message in the receiver's conversation
      await setDoc(receiverListingData, listingData);
      await addDoc(receiverConversationRef, messageData);
  
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
      <form>
        
      </form>
      <Textarea
        id='text'
        placeholder='Write a message...'
        register={register}
        required
      />
      <div className='w-full flex justify-between items-center bg-white py-4'>
        <div className='flex gap-4'>
          <FaceSmileIcon className='w-6 h-6 cursor-pointer' />
          <Image src={logo} alt='logo' width={40} height={40} className='cursor-pointer' />
          <CameraIcon className='w-6 h-6 cursor-pointer' />
          <InformationCircleIcon className='w-6 h-6 cursor-pointer' />
        </div>
        <Button className='w-36' dark label='Send message' />
      </div>
    </div>
  );
}

export default MessageFooter;