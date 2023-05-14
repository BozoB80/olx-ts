'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useMessageModal from '../../hooks/useMessageModal';
import { auth } from '@/firebase/firebase';
import { Timestamp } from 'firebase/firestore';
import {useState} from 'react';
import useLoginModal from '../../hooks/useLoginModal';

const MessageModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const messageModal = useMessageModal()
  const loginModal = useLoginModal()
  const uid = auth?.currentUser?.uid

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      text: '',
      createdAt: Timestamp,
      uid
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!uid) {
      loginModal.onOpen()
      return;
    }
    setIsLoading(true)

    



  }

  return (
    <div>
      Enter
    </div>
  );
}

export default MessageModal;