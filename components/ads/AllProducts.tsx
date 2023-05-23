'use client'

import useFetchCollection from "@/firebase/useFetchCollection";
import ProductCardSmall from "./ProductCardSmall";
import { useSearchParams } from "next/navigation";
import { DocumentData } from 'firebase/firestore';

const AllProducts = () => {
  const { data } = useFetchCollection('products', 'desc')
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category')

  const filteredData = selectedCategory ? data.filter((item: DocumentData) => item.category === selectedCategory) : data

  return (
    <ProductCardSmall 
      data={filteredData}
      bground
    />
  );
}

export default AllProducts;