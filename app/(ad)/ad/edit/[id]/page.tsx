'use client'

import useFetchDocument from "@/firebase/useFetchDocument"
import CarsEdit from "./CarsEdit"

type EditProps = {
  params: {
    id: string
  }
}

const EditPage = ({ params: { id }}: EditProps) => {
  const { document } = useFetchDocument('products', id) 
  console.log(document);
  

  return (
    <div>
      {document?.category === "Cars" ? <CarsEdit id={id} details={document} /> 
      : 'No editing' }
    </div>
  );
}

export default EditPage;