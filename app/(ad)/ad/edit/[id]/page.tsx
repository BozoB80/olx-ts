'use client'

import CarsEdit from "@/components/ads/editForms/CarsEdit"
import GeneralEdit from "@/components/ads/editForms/GeneralEdit"
import useFetchDocument from "@/firebase/useFetchDocument"


type EditProps = {
  params: {
    id: string
  }
}

const EditPage = ({ params: { id }}: EditProps) => {
  const { document } = useFetchDocument('products', id) 
  

  return (
    <div>
      {document?.category === "Cars" ? <CarsEdit id={id} details={document} /> 
      : document?.category === "Clothes & Footwear" ? <GeneralEdit id={id} details={document} /> 
      : 'Page for edit does not exist yet' }
    </div>
  );
}

export default EditPage;