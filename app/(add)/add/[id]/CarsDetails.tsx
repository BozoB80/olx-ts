'use client'

import Container from "@/components/adds/details/ContainerDetails"
import MainDetails from "@/components/adds/details/MainDetails"
import { DocumentData } from "firebase/firestore"
import { carsDetails } from "@/utils/tableDetails"

type CarsProps = {
  id: string
  details: DocumentData
}

const CarsDetails = ({ id, details }: CarsProps) => {

  return (
    <Container bground>
      <MainDetails 
        id={id}
        title={details?.title}
        price={details?.price}
        category={details?.category}
        userRef={details?.userRef}
        imageURL={details?.imageURL}
        top1={details?.region}
        top2={details?.state}
        top3={details?.createdAt}
        description={details?.description}
        details={details}
        table={carsDetails}
      />      
    </Container>
  );
}

export default CarsDetails;