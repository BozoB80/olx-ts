'use client'

import { ProductCardSmallProps } from '@/types';
import { getTimeAgo } from '@/utils/dateUtils';
import { slideAnimation } from '@/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type ProductCardSmallData = ProductCardSmallProps[];

const ProductCardSmall = ({ data, bground }: { data: ProductCardSmallData, bground?: boolean }) => {
  return (
    <div className={`${bground ? 'bg-[#f1f4f5]' : 'bg-white'} w-full p-2 sm:p-5 grid gap-2 sm:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7`}>
      {data?.map((add: ProductCardSmallProps) => {
      
        const createdAt = add.createdAt.toDate();
        const timeAgo = getTimeAgo(createdAt);
        const furnished = add.furnished && add.furnished === true ? 'Furnished' : 'Not furnished'

      return (
      <motion.div key={add.id} {...slideAnimation({ direction: 'up'})}>
        <Link href={`/ad/${add.id}`} className="flex flex-col h-[270px] rounded-md bg-white cursor-pointer shadow-2xl">
          <div className='overflow-hidden rounded-t-md'>      
            <Image 
              src={add.imageURL[0]}
              alt={add.title}
              width={300}
              height={300}
              className="object-cover w-[274px] h-[160px] rounded-t-md transition hover:scale-110"
            />    
          </div>
          <div className="flex flex-col gap-2 p-2 overflow-hidden">
            <h1 className="pb-2 truncate">{add.title}</h1>
            <div className="flex gap-2">
              <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm capitalize">{add.fuel || add.type || add.state || add.availability}</p>
              {add?.category === "Real Estate" ? (
                <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">{furnished}</p>
              ) : (
                <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">{add.mileage || add.ram || add.availability }</p>
              )}
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-xs">
                {timeAgo}
              </h1>
              <p className="font-semibold text-sm sm:text-base">{typeof add.price === 'number' ? `${add.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} EUR` : add.price}</p>
            </div>
          </div>
        </Link>
      </motion.div>
    )})}
  </div>
  );
}

export default ProductCardSmall;