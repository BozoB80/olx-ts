'use client'

import avatar from '@/assets/noavatar.png'
import { auth } from '@/firebase/firebase'
import { ArrowLeftIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Divider, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

interface MessageHeaderProps {
  setSelectedConversationId: (selectedConversationId: string) => void
  senderName?: string
  receiverName?: string
  imageURL: string
  title: string
  price: string
}

const MessageHeader: React.FC<MessageHeaderProps> = ({setSelectedConversationId, senderName, receiverName, imageURL, title, price}) => {
  const [ user ] = useAuthState(auth)
  const router = useRouter()

  return (
    <div className="w-full h-16 p-2 flex justify-between items-center shadow-lg">
      <div className="flex justify-center items-center gap-2 h-full">
        <ArrowLeftIcon className='w-6 h-6 sm:hidden' onClick={() => setSelectedConversationId('')} />
        <Image
          src={avatar}
          alt='avatar'
          className='w-10'
        />
        <div>
          <p className='font-semibold text-sm sm:text-base'>{user?.displayName === senderName ? receiverName : senderName}</p>
          <p className='text-sm sm:text-base sm:hidden'>{title}</p>
        </div>
        <Divider orientation='vertical' className='mx-2 h-full hidden sm:block' />
        <Image 
          src={imageURL?.[0]}
          alt={title}
          width={60}
          height={60}
          className='hidden sm:block'
        />
        <div className='flex-col text-sm hidden sm:flex'>
          <p>{title}</p>
          <p className='font-bold'>{typeof price === 'number' ? `${price} EUR` : price}</p>
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