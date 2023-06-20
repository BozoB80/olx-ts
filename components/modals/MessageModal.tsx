'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useMessageModal from '../../hooks/useMessageModal';
import { auth, db } from '@/firebase/firebase';
import { DocumentData, Timestamp, addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import useLoginModal from '../../hooks/useLoginModal';
import { useToast } from '@chakra-ui/react';
import Heading from '../Heading';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import Textarea from '../inputs/Textarea';

const MessageModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [receiver, setReceiver] = useState<DocumentData | null>(null)
  const messageModal = useMessageModal()
  const loginModal = useLoginModal()
  const toast = useToast()
  const senderRef = auth?.currentUser?.uid 
  const receiverRef = messageModal?.details?.userRef
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
    if (!senderRef) {
      loginModal.onOpen()
      return;
    }
    setIsLoading(true)

    const senderListingData = doc(db, 'users', senderRef, 'conversations', productId)
    const receiverListingData = doc(db, 'users', receiverRef, 'conversations', productId)

    const senderConversationRef = collection(senderListingData, 'messages');
    const receiverConversationRef = collection(receiverListingData, 'messages');

    const listingData = {
      createdAt: Timestamp.now(),
      senderName,
      senderRef,
      receiverName,
      receiverRef,
      title,
      price,
      imageURL,
      productId
    }

    try {
      // Store the message in the sender's conversation
      await setDoc(senderListingData, listingData);
      await addDoc(senderConversationRef, {
        ["sentMessage"]: data.text,
        createdAt: Timestamp.now()
      });
  
      // Store the message in the receiver's conversation
      await setDoc(receiverListingData, listingData);
      await addDoc(receiverConversationRef, {
        ["receivedMessage"]: data.text,
        createdAt: Timestamp.now()
      });
  
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

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Heading title={`Message for ${receiver?.displayName}`} />
      <div className="bg-[#eef6ff] p-2 flex items-center gap-3 rounded-md">
        <InformationCircleIcon className="w-6 h-6" />
        <p className="text-sm">Add: {messageModal.details?.title} </p>   
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