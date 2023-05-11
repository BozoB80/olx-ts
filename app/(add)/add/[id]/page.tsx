'use client'

import useFetchDocument from "@/firebase/useFetchDocument"
import CarsDetails from "./CarsDetails"
import MobileDetails from "./MobileDetails"
import RealEstateDetails from "./RealEstateDetails"

type AddProps = {
  params: {
    id: string
  }
}

const AddPage = ({ params: { id }}: AddProps) => {
  const { document } = useFetchDocument('products', id) 
  
  return (
    <div>
      {document?.category === "Cars" ? <CarsDetails id={id} details={document} />
      : document?.category === "Mobile Phones" ? <MobileDetails id={id} details={document} />
      : document?.category === "Real Estate" ? <RealEstateDetails id={id} details={document} />
      : "Not constructed yet" }      
    </div>
  );
}

export default AddPage;