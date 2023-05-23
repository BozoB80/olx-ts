"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";

interface CategoryBoxProps {
  name: string;
  bgColor: string;
  imageURL: string;
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  name,
  bgColor,
  imageURL,
  selected
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: name,
    };

    if (params?.get("category") === name) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [name, params, router]);

  return (
    <div
      onClick={handleClick}
      className="flex flex-col w-20 sm:w-36 px-1 py-2 justify-between items-center"
    >
      <div
        style={{ backgroundColor: bgColor }}
        className="flex justify-center items-center border w-14 sm:w-16 h-14 sm:h-16 rounded-full"
      >
        <Image
          src={imageURL}
          alt={name}
          width={50}
          height={50}
          className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"
        />
      </div>
      <h3 className={`text-xs sm:text-sm mt-1 w-full text-center truncate ${selected ? 'transition font-bold scale-105 ' : ''}`}>
        {name}
      </h3>
    </div>
  );
};

export default CategoryBox;
