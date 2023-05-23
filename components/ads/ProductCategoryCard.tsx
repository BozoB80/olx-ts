'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { ProductCardSmallProps } from '@/types';
import { getTimeAgo } from '@/utils/dateUtils';
import { slideAnimation } from '@/utils/motion';
import useProductSortingStore from '../../hooks/useProductSortingStore';
import { useEffect } from 'react';
import SortButton from '../inputs/SortButton';

type ProductCardSmallData = ProductCardSmallProps[]

const ProductCategoryCard = ({ data, bground }: { data: ProductCardSmallData, bground?: boolean }) => {
  const { data: storeData, sortedData, setData, sortDataByPrice, sortDataByDate } = useProductSortingStore();

  useEffect(() => {
    setData(data);
  }, [data, setData]);

  const itemsToDisplay = sortedData.length > 0 ? sortedData : storeData;
  return (
    <div className='p-2 sm:p-5 bg-white flex flex-col'>
      <div>

      
        <h1>Some text</h1>
        <div className='w-full flex justify-between items-center gap-8 bg-[#f1f4f5]'>
          <button onClick={() => sortDataByPrice('asc')}>Sort by Price (Asc)</button>
          <SortButton
            label='Sort by'
          />
          <button onClick={() => sortDataByPrice('desc')}>Sort by Price (Desc)</button>
          <button onClick={() => sortDataByDate('asc')}>Sort by Date (Asc)</button>
          <button onClick={() => sortDataByDate('desc')}>Sort by Date (Desc)</button>
        </div>
        <div className='grid gap-2 sm:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 bg-[#f1f4f5]'>
          {itemsToDisplay?.map((add: ProductCardSmallProps) => {
          
            const createdAt = add.createdAt.toDate();
            const timeAgo = getTimeAgo(createdAt);
            const furnished = add.furnished === true ? 'Furnished' : 'Not furnished'

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
                  <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm capitalize">{add.fuel || add.type || add.state}</p>
                  <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">{add.mileage || add.ram || furnished}</p>
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
    </div>
  </div>
  );
}

export default ProductCategoryCard;