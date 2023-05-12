'use client'

import { ArrowLeftIcon, BuildingOfficeIcon, ChatBubbleLeftRightIcon, ClockIcon, EllipsisVerticalIcon, ExclamationCircleIcon, EyeIcon, InformationCircleIcon, MapPinIcon, RectangleStackIcon, ShareIcon, TagIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import HeartButton from '@/components/HeartButton';
import { getTimeAgo } from '@/utils/dateUtils';
import { DocumentData, Timestamp } from 'firebase/firestore';
import MainTable from './MainTable';
import OtherUserAdds from '@/components/user/OtherUserAdds';
import UserDetails from '@/components/user/UserDetails';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

type TableDetailsProps = {
  label: string
  value: string
}

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
  table: TableDetailsProps[]
}

const MainDetails: React.FC<MainDetailsProps> = ({ title, price, category, id, userRef, imageURL, top1, top2, top3, description, details, table }) => {

  const router = useRouter()
  const createdAt = top3.toDate();
  const timeAgo = getTimeAgo(createdAt);

  return (
    <>
      {/* Large screen */}
      <div className='hidden sm:flex sm:flex-col xl:flex-row sm:w-full lg:w-[1180px] gap-6'>
        <div className=' flex flex-col w-full mx-auto space-y-4'>
          <div className='sm:w-full lg:w-[832px] bg-white p-4 rounded-[4px]'>
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
                className='w-full h-[550px] object-cover'
              />
            </div>       
          </div>

          <div className='sm:w-full lg:w-[832px] bg-white p-4 rounded-[4px]'>
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
              
              <MainTable details={details} table={table} />
              
              <div>
                <h1 className='text-2xl'>Detailed description:</h1>
                <h1 className='py-2'>{description}</h1>
              </div>
            </div>
          </div>
          <div className=' flex flex-col sm:w-full lg:w-[832px] space-y-3 bg-white p-4 rounded-[4px]'>
            <h1 className='text-2xl'>Ask a question:</h1>
            <textarea 
              cols={30}
              rows={5}
              placeholder='Ask a question to the user'
              className="p-3 w-full mt-2 bg-[#f1f4f5] border-2 rounded-md"
            />
            <Button label='Ask a question' small />
          </div>
          <OtherUserAdds id={id} details={details} />
        </div>
        <UserDetails id={id} details={details} />
      </div>

      {/* Small screen */}
      <div className='absolute top-0 w-full z-50 bg-white sm:hidden'>
        <div className='relative'>
          <Image 
            src={imageURL}
            alt={title}
            width={500}
            height={500}
            className='w-full h-[300px] object-cover'
          />
          <div className='absolute w-full px-3 flex justify-between top-5'>
            <ArrowLeftIcon onClick={() => router.back()} className='w-6 h-6 text-white' />
            <div className='flex justify-center items-center gap-3'>
              <HeartButton id={id} small userRef={userRef} />
              <ShareIcon className='w-6 h-6 text-white' />
              <EllipsisVerticalIcon className='w-6 h-6 text-white' />
            </div>
          </div>
          <div className='flex flex-col p-2'>
            <div className='mb-3'>
              <h1 className='text-2xl capitalize'>{title}</h1>
              <h1 className='text-2xl font-semibold mt-3'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} EUR</h1>
            </div>
            <div className='flex flex-wrap gap-3'>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <MapPinIcon className='w-5 h-5' />
                  {top1}
                </h1>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <TagIcon className='w-5 h-5' />
                  {top2}
                </h1>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <ClockIcon className='w-5 h-5' />
                  {timeAgo}
                </h1>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <InformationCircleIcon className='w-5 h-5' />
                  ID: {id.slice(0, 8)}
                </h1>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <BuildingOfficeIcon className='w-5 h-5' />
                  {details?.manufacturer}
                </h1>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <RectangleStackIcon className='w-5 h-5' />
                  {details?.model}
                </h1>
            </div> 
          </div>


          <div className='bg-[#f1f4f5] p-2 w-full'>

            <UserDetails id={id} details={details}  />    
                    
            <div className='p-2 my-2 bg-white shadow-md rounded-[4px] w-full'>
              <h4 className='uppercase text-sm'>Category</h4>
              <hr />
              <p className='text-sm mb-1'>{category}</p>
              <h4 className='uppercase text-sm'>View count</h4>
              <hr />
              <p className='text-sm mb-1'>467</p>
              <h4 className='uppercase text-sm'>Created</h4>
              <hr />
              <p className='text-sm mb-1'>{timeAgo}</p>
            </div>

            <MainTable details={details} table={table} />

            <div className='p-2 my-2 bg-white shadow-md rounded-[4px] w-full'>
              <h4 className='uppercase text-sm'>Detailed description</h4>
              <h1 className='text-xs'>{description}</h1>
            </div>

            <button className='flex w-full py-1 gap-3 justify-center items-center border border-black rounded-[4px]'>
              <ChatBubbleLeftRightIcon className='w-5 h-5' />
              <h1 className='uppercase text-sm'>Questions & Answers (0)</h1>
            </button>

            <div className='my-2 bg-white shadow-md rounded-[4px] w-full'>
              <OtherUserAdds id={id} details={details} />
            </div>

            <button className='flex w-full py-1 gap-3 justify-center items-center border border-black rounded-[4px]'>
              <ExclamationCircleIcon className='w-5 h-5' />
              <h1 className='uppercase text-xs'>Report add</h1>
            </button>
          </div>
        </div>
      </div>    

    </>
  )
}

export default MainDetails;