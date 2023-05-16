'use client'

import avatar from '@/assets/noavatar.png'
import { auth } from '@/firebase/firebase'
import { EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Tooltip } from '@chakra-ui/react'

interface MessageHeaderProps {
  senderName?: string
  receiverName?: string
  imageURL: string
  title: string
  price: string
}

const MessageHeader: React.FC<MessageHeaderProps> = ({senderName, receiverName, imageURL, title, price}) => {
  const [ user ] = useAuthState(auth)

  return (
    <div className="w-full h-16 p-2 flex justify-between items-center shadow-lg">
      <div className="flex justify-center items-center gap-2">
        <Image
          src={avatar}
          alt='avatar'
          className='w-10'
        />
        <p className='font-semibold'>{user?.displayName === senderName ? receiverName : senderName}</p>
        <Image 
          src={imageURL}
          alt={title}
          width={60}
          height={60}
        />
        <div className='flex flex-col text-sm'>
          <p>{title}</p>
          <p className='font-bold'>{price} EUR</p>
        </div>
      </div>

      <div className='flex gap-4'>
      <Tooltip label="Mark as unread" placement='top'>
        <EyeSlashIcon className='w-6 h-6' />
      </Tooltip>
      <Tooltip label="Delete conversation" placement='top'>
        <TrashIcon className='w-6 h-6' />
      </Tooltip>
      </div>
    </div>
  );
}

export default MessageHeader;