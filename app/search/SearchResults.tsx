'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { ProductCardSmallProps } from '@/types';
import { getTimeAgo } from '@/utils/dateUtils';
import { slideAnimation } from '@/utils/motion';
import { useEffect } from 'react';
import useProductSortingStore from '@/hooks/useProductSortingStore';
import SortButton from '@/components/inputs/SortButton';
import { useSearchParams } from 'next/navigation';
import useFetchCollection from '@/firebase/useFetchCollection';

type ProductCardSmallData = ProductCardSmallProps[]

const SearchResults = () => {
  const { data } = useFetchCollection('products', 'desc')
  const { sortedData, filteredData, setData, sortDataByPrice, sortDataByDate, filterByFuelType, filterByStateType, resetFilters } = useProductSortingStore();
  const searchParams = useSearchParams()
  const category = searchParams?.get('category')
  const query = searchParams?.get('q')  

  useEffect(() => {
    setData(data);
    resetFilters();
  }, [data, setData, resetFilters]);

  const itemsToDisplay = sortedData.length > 0 ? sortedData : filteredData;
  
  const filteredItems = query
    ? itemsToDisplay.filter(
        (item) =>
          (item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())) &&
          (!category || item.category === category)
      )
    : itemsToDisplay;

  return (
    <div className='bg-white flex flex-col '>
      <motion.div {...slideAnimation({ direction: 'left' })} className='p-2 sm:p-5 space-x-2'>
        {category === 'Cars' && (
          <SortButton
            label='Fuel'
            buttons={[
              { label: 'Petrol', onClick: () => filterByFuelType('Petrol') },
              { label: 'Diesel', onClick: () => filterByFuelType('Diesel') },
              { label: 'Gas', onClick: () => filterByFuelType('Gas') },
              { label: 'Hybrid', onClick: () => filterByFuelType('Hybrid') },
              { label: 'Electric', onClick: () => filterByFuelType('Electric') },
            ]}
            resetSorting={resetFilters}
          />
        )}
        <SortButton 
          label='State'
          buttons={[
            { label: 'New', onClick: () => filterByStateType('New')},
            { label: 'Used', onClick: () => filterByStateType('Used')}
          ]}
          resetSorting={resetFilters}
          
        />
      </motion.div>

      <div className='bg-[#f1f4f5] p-2 sm:p-5'>
        <div className='w-full flex justify-between items-center gap-8'>
          <motion.p {...slideAnimation({ direction: 'left'})} className='font-semibold'>{filteredItems.length} RESULTS</motion.p>
          <motion.div {...slideAnimation({ direction: 'right'})}>
            <SortButton
              label='Sort by'
              buttons={[
                { label: 'Lowest price', onClick: () => sortDataByPrice('asc') },
                { label: 'Highest price', onClick: () => sortDataByPrice('desc') },
                { label: 'Oldest', onClick: () => sortDataByDate('asc') },
                { label: 'Newest', onClick: () => sortDataByDate('desc') }
              ]}
              resetSorting={resetFilters}
              multiple={false}
            />
          </motion.div>
        </div>

        <div className='grid gap-2 sm:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 py-2 sm:py-5'>
          {filteredItems?.map((add: ProductCardSmallProps) => {
          
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
    </div>
  </div>
  );
}

export default SearchResults;
