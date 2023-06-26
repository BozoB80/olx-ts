'use client'

import useFetchDocument from "@/firebase/useFetchDocument"
import CarsDetails from "./CarsDetails"
import MobileDetails from "./MobileDetails"
import RealEstateDetails from "./RealEstateDetails"
import GeneralDetails from './GeneralDetails';

type AddProps = {
  params: {
    id: string
  }
}

const AddPage = ({ params: { id }}: AddProps) => {
  const { document } = useFetchDocument('products', id) 
  
  return (
    <>
      {document?.category === "Cars" ? <CarsDetails id={id} details={document} />
      : document?.category === "Mobile Phones" ? <MobileDetails id={id} details={document} />
      : document?.category === "Real Estate" ? <RealEstateDetails id={id} details={document} />
      : document?.category === "Services" ? <GeneralDetails id={id} details={document} />
      : document?.category === "Jobs" ? <GeneralDetails id={id} details={document} />
      : document?.category === "Art" ? <GeneralDetails id={id} details={document} />
      : document?.category === "Pets" ? <GeneralDetails id={id} details={document} />
      : document?.category === "Business & Industry" ? <GeneralDetails id={id} details={document} />
      : document?.category === "Clothes & Footwear" ? <GeneralDetails id={id} details={document} />
      : document?.category === "Literature" ? <GeneralDetails id={id} details={document} />
      : "Not constructed yet" }      
    </>
  );
}

export default AddPage;