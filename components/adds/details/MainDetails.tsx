'use client'

import { CheckIcon, ClockIcon, EyeIcon, InformationCircleIcon, MapPinIcon, ShareIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import HeartButton from '@/components/HeartButton';
import { getTimeAgo } from '@/utils/dateUtils';
import { DocumentData, Timestamp } from 'firebase/firestore';
import MainTable from './MainTable';

interface MainDetailsProps {
  id: string
  title: string
  price: number
  category: string
  userRef: string
  imageURL: string
  top1: string
  top2: string
  top3: Timestamp
  description: string
  details: DocumentData
}

const MainDetails: React.FC<MainDetailsProps> = ({ title, price, category, id, userRef, imageURL, top1, top2, top3, description, details }) => {

  const createdAt = top3.toDate();
  const timeAgo = getTimeAgo(createdAt);

  return (
    <div className='hidden sm:flex w-[1180px] gap-6'>
      <div className=' flex flex-col space-y-4'>
        <div className='w-[832px] bg-white p-4 rounded-[4px]'>
          <div className='flex flex-col w-full space-y-3'>
            <h1 className='text-2xl uppercase'>{title}</h1>
            <h1 className='text-3xl font-bold'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} EUR</h1>
            <div className='flex justify-between items-center'>
              <p>{category}</p>
              <div className='flex items-center justify-center gap-3'>
                <ShareIcon className='w-6 h-6' />
                <HeartButton id={id} userRef={userRef} />
              </div>
            </div>
            <Image 
              src={imageURL}
              alt={title}
              width={500}
              height={500}
              className='w-full h-[550px] object-contain'
            />
          </div>       
        </div>

        <div className='w-[832px] bg-white p-4 rounded-[4px]'>
          <div className='flex flex-col w-full space-y-3'>
            <div className='flex gap-3'>
              <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                <MapPinIcon className='w-5 h-5' />
                {top1}
              </h1>
              <h1 className='flex capitalize items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                <TagIcon className='w-5 h-5' />
                {top2}
              </h1>
              <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                <ClockIcon className='w-5 h-5' />
                {timeAgo}
              </h1>
              <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                <InformationCircleIcon className='w-5 h-5' />
                {id.slice(0, 8)}
              </h1>
              <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                <EyeIcon className='w-5 h-5' />
                Views: 264
              </h1>            
            </div>
            <h1 className='text-2xl'>Characteristics:</h1>
            <MainTable 
              details={details}
            />
            {/* <table className='flex w-full'>
              <tbody className='grid grid-cols-2 w-full text-sm capitalize gap-x-16'>
                <tr className='flex justify-between py-2'>
                  <td>Address:</td>
                  <td className='text-black/80'>{details?.address}</td>
                </tr>                
                <tr className='flex justify-between py-2'>
                  <td>Furnished:</td>
                  <td className='text-black/80'>
                    {details?.furnished === true ? <CheckIcon className='w-5 h-5' /> : <XMarkIcon className='w-5 h-5' /> }
                  </td>
                </tr>                
                <tr className='flex justify-between py-2'>
                  <td>Region:</td>
                  <td className='text-black/80'>{details?.region}</td>
                </tr>                
                <tr className='flex justify-between py-2'>
                  <td>Type:</td>
                  <td className='text-black/80'>{details?.type}</td>
                </tr>
              </tbody>
            </table> */}

            <div>
              <h1 className='text-2xl'>Detailed description:</h1>
              <h1 className='py-2'>{description}</h1>
            </div>
          </div>
        </div>
        <div className=' flex flex-col w-[832px] space-y-3 bg-white p-4 rounded-[4px]'>
          <h1 className='text-2xl'>Ask a question:</h1>
          <textarea 
            cols={30}
            rows={5}
            placeholder='Ask a question to the user'
            className="p-3 w-full mt-2 bg-[#f1f4f5] border-2 rounded-md"
          />
          <button className='px-3 py-2 border-2 w-40 border-black rounded-[4px]'>
            Ask a question
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainDetails;