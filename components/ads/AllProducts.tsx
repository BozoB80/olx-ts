"use client";

import useFetchCollection from "@/firebase/useFetchCollection";
import ProductCardSmall from "./ProductCardSmall";

const AllProducts = () => {
  const { data } = useFetchCollection("products", "desc");

  return (
    <>
      <ProductCardSmall data={data} bground />
    </>
  );
};

export default AllProducts;
