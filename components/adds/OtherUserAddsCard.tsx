"use client";

import { getTimeAgo } from "@/utils/dateUtils";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

type ProductCardSmallProps = {
  id: string
  title: string
  fuel?: string
  type?: string
  state?: string
  mileage?: string
  ram?: string
  price: number
  imageURL: string
  furnished?: boolean
  createdAt: Timestamp
}

type ProductCardSmallData = ProductCardSmallProps[];

const OtherUserAddsCard = ({ adds }: { adds: ProductCardSmallData }) => {

  return (
    <div className="w-full gap-2 sm:gap-5 grid grid-rows-1 grid-flow-col overflow-scroll">
      {adds?.map((add) => {
        
        const createdAt = add.createdAt.toDate();
        const timeAgo = getTimeAgo(createdAt);
        const furnished = add.furnished === true ? 'Furnished' : 'Not furnished'

        return (
        <Link href={`/add/${add.id}`} key={add.id} className="flex flex-col w-48 h-[270px] rounded-md bg-white cursor-pointer shadow-2xl">
          <Image 
            src={add.imageURL}
            alt={add.title}
            width={300}
            height={300}
            className="object-cover w-[274px] h-[160px] rounded-t-md"
          />
          <div className="flex flex-col gap-2 p-2">
            <h1 className="pb-2 truncate">{add.title}</h1>
            <div className="flex gap-2">
              <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm capitalize">{add.fuel || add.type || add.state}</p>
              <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">{add.mileage || add.ram || furnished}</p>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-xs">
                {timeAgo}
              </h1>
              <p className="font-semibold text-sm sm:text-base">{add.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} EUR</p>
            </div>
          </div>
        </Link>
      )})}
    </div>
  );
};

export default OtherUserAddsCard;
