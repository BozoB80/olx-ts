"use client";

import { DocumentData } from "firebase/firestore";
import useFetchCollection from "../firebase/useFetchCollection";
import CategoryBox from "./CategoryBox";
import { useSearchParams } from "next/navigation";

const Categories = () => {
  const { data } = useFetchCollection("categories", "asc");
  const params = useSearchParams()
  const selectedCategory = params?.get('category');
  
  return (
    <>
      <div className="hidden px-3 sm:flex justify-between items-center w-full min-w-full sm:px-3 py-4">
        {data.map((category: DocumentData) => (
            <CategoryBox 
              key={category.name}
              name={category.name}
              bgColor={category.bgColor}
              imageURL={category.imageURL}
              selected={selectedCategory === category.name}
            />      
          ))}
      </div>

      <div className="sm:hidden grid grid-rows-2 grid-flow-col px-3 w-full min-w-full sm:px-3 py-4 overflow-x-scroll mask2">
        {data.slice(1, 13).map((category: DocumentData) => (
          <CategoryBox 
            key={category.name}
            name={category.name}
            bgColor={category.bgColor}
            imageURL={category.imageURL}
            selected={selectedCategory === category.name}
          />
        ))}
      </div>
    </>
  );
};

export default Categories;
