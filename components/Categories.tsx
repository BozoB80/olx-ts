'use client'

import { db } from '@/firebase/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Image from "next/image"
import Link from 'next/link'
import useFetchCollection from '../firebase/useFetchCollection';

type CategoryProps = {
  id: string
  name: string
  bgColor: string
  imageURL: string
}

const Categories = () => {
  const { data } = useFetchCollection('categories', 'asc')
    
  return (
    <>
      <div className="hidden px-3 sm:flex justify-between items-center w-full min-w-full sm:px-3 py-4">
        {data.map((category: CategoryProps) => {        
          return (
        <Link href={`/${category.name}`} key={category.id} className="flex flex-col w-20 sm:w-36 px-1 py-2 justify-between items-center">
          <div style={{ backgroundColor: category.bgColor }} className="flex justify-center items-center border w-14 sm:w-16 h-14 sm:h-16 rounded-full">
            <Image 
              src={category.imageURL}
              alt={category.id}
              width={50}
              height={50}   
              className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"       
            />
          </div>
          <h3 className="text-xs sm:text-sm mt-1 w-full text-center truncate">{category.name}</h3>
        </Link>  
        )})}     
      </div>

      <div className="sm:hidden grid grid-rows-2 grid-flow-col px-3 w-full min-w-full sm:px-3 py-4 overflow-x-scroll mask2">
        {data.slice(1, 13).map((category: CategoryProps) => {          
          return (
        <Link href={`/${category.name}`} key={category.id} className="flex flex-col w-20 sm:w-36 px-1 py-2 justify-between items-center">
          <div style={{ backgroundColor: category.bgColor }} className="flex justify-center items-center border w-14 sm:w-16 h-14 sm:h-16 rounded-full">
            <Image 
              src={category.imageURL}
              alt={category.id}
              width={50}
              height={50}   
              className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"       
            />
          </div>
          <h3 className="text-xs sm:text-sm mt-1 w-full text-center truncate">{category.name}</h3>
        </Link>  
        )})}     
      </div>    
    </>
  )
}

export default Categories
