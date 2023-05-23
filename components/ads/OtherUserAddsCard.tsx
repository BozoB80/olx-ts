"use client";

import { getTimeAgo } from "@/utils/dateUtils";
import Image from "next/image";
import Link from "next/link";
import Container from "../Container";
import { ProductCardSmallProps } from "@/types";
import { auth } from "@/firebase/firebase";

type ProductCardSmallData = ProductCardSmallProps[];

const OtherUserAddsCard = ({ ads }: { ads: ProductCardSmallData }) => {
  
  return (
    <Container>
      <h1 className="w-full uppercase sm:normal-case text-sm sm:text-2xl pt-1 pb-2">Other ads of user</h1>
      <div className="w-full gap-2 sm:gap-5 grid grid-rows-1 grid-flow-col overflow-x-auto pb-2">
        {ads?.map((add) => {
          const createdAt = add.createdAt.toDate();
          const timeAgo = getTimeAgo(createdAt);
          const furnished =
            add.furnished === true ? "Furnished" : "Not furnished";

          return (
            <Link
              href={`/ad/${add.id}`}
              key={add.id}
              className="flex flex-col w-48 h-[270px] rounded-md bg-white cursor-pointer shadow-2xl"
            >
              <Image 
                src={add.imageURL[0]}
                alt={add.title}
                width={300}
                height={300}
                className="object-cover w-[274px] h-[160px] rounded-t-md transition hover:scale-110"
              />
              <div className="flex flex-col gap-2 p-2">
                <h1 className="pb-2 truncate">{add.title}</h1>
                <div className="flex gap-2">
                  <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm capitalize">
                    {add.fuel || add.type || add.state}
                  </p>
                  <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">
                    {add.mileage || add.ram || furnished}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-xs">{timeAgo}</h1>
                  <p className="font-semibold text-sm sm:text-base">
                    {add.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    EUR
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
};

export default OtherUserAddsCard;
