'use client'

import useFetchCollection from "@/firebase/useFetchCollection";
import ProductCardSmall from "./ProductCardSmall";

const AllProducts = () => {
  const { data } = useFetchCollection('products', 'asc')

  return (
    <ProductCardSmall 
      data={data}
    />
  );
}

export default AllProducts;