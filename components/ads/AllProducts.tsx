'use client'

import useFetchCollection from "@/firebase/useFetchCollection";
import ProductCardSmall from "./ProductCardSmall";
import { useSearchParams } from "next/navigation";
import { DocumentData } from 'firebase/firestore';
import ProductCategoryCard from "./ProductCategoryCard";

const AllProducts = () => {
  const { data } = useFetchCollection('products', 'desc')
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category')

  const filteredData = data.filter((item: DocumentData) => item.category === selectedCategory)

  return (
    <>
      {!selectedCategory ? (
        <ProductCardSmall 
          data={data}
          bground
        />
      ) : (
        <ProductCategoryCard 
          data={filteredData}
          bground
        />
      )}
    
    </>
  );
}

export default AllProducts;